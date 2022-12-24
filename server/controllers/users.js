import bcrypt from 'bcryptjs';
// import jwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken } from '../utils/utils.js';
import User from '../models/user.js';
import Token from '../models/token.js';
import sendEmail from '../utils/sendEmail.js';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const oldUser = await User.findOne({ email });

		if (!oldUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

		console.log(oldUser);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials' });

		// if (!oldUser.verified) {
		// 	const token = await Token.findOne({ userId: oldUser._id });

		// 	if (!token) {
		// 		const newToken = new Token({
		// 			userId: oldUser._id,
		// 			token: crypto.randomBytes(16).toString('hex'),
		// 		}).save();

		// 		const url = `${process.env.BASE_URL}/user/${oldUser._id}/confirmation/${newToken.token}`;
		// 		await sendEmail({
		// 			email: oldUser.email,
		// 			subject: 'Account Verification Token',
		// 			message: `Please click on the following link ${url} to verify your account.`,
		// 		});

		// 		return res.status(200).json({
		// 			message:
		// 				'An email has been sent to you. Please verify your account to login.',
		// 		});
		// 	}

		// 	return res.status(400).json({ message: 'Please verify your email' });
		// }

		const accessToken = generateAccessToken({
			email: oldUser.email,
			_id: oldUser._id,
		});
		const refreshToken = generateRefreshToken({
			email: oldUser.email,
			_id: oldUser._id,
		});

		await User.findByIdAndUpdate(
			oldUser._id,
			{
				refreshToken: refreshToken,
			},
			{
				new: true,
			}
		);

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		console.log(res.cookies);

		res.status(200).json({
			user: {
				name: oldUser.name,
				email: oldUser.email,
				_id: oldUser._id,
				imageUrl: oldUser.imageUrl,
			},
			accessToken,
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });

		console.log(error);
	}
};

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		const oldUser = await User.findOne({ email });

		if (oldUser)
			return res.status(400).json({ message: 'User already exists' });

		if (password !== confirmPassword)
			return res.status(400).json({ message: "Passwords don't match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = await Token.create({
			userId: result._id,
			token: crypto.randomBytes(16).toString('hex'),
		});

		const url = `${process.env.BASE_URL}/users/${result._id}/confirmation/${token.token}`;

		await sendEmail({
			email: result.email,
			subject: 'Account Verification',
			message: `Please click on the following link ${url} to verify your account.`,
		});

		res.status(200).json({
			message: 'An email has been sent to you. Please verify your account',
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });

		console.log(error);
	}
};

export const googleSignin = async (req, res) => {
	const { tokenId } = req.body;
	console.log(tokenId);
	const response = await client.verifyIdToken({
		idToken: tokenId,
		audience: process.env.GOOGLE_CLIENT_ID,
	});

	const { email_verified, name, email, picture: imageUrl } = response.payload;

	if (email_verified) {
		const user = await User.findOne({ email });

		if (user) {
			const accessToken = generateAccessToken({
				email: user.email,
				id: user._id,
			});
			const refreshToken = generateRefreshToken({
				email: user.email,
				id: user._id,
			});

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
			});

			res.status(200).json({
				user: {
					name: user.name,
					email: user.email,
					_id: user._id,
					imageUrl: user.imageUrl,
				},
				accessToken,
			});
		} else {
			const password = email + process.env.GOOGLE_CLIENT_ID;
			const hashedPassword = await bcrypt.hash(password, 12);

			const result = await User.create({
				email,
				password: hashedPassword,
				name,
				imageUrl,
			});

			const accessToken = generateAccessToken({
				email: result.email,
				_id: result._id,
			});
			const refreshToken = generateRefreshToken({
				email: result.email,
				_id: result._id,
			});

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
			});
			res.status(200).json({
				user: {
					name: result.name,
					email: result.email,
					_id: result._id,
					imageUrl: result.imageUrl,
				},
				accessToken,
			});
		}
	}
};

export const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken });

	if (!foundUser) return res.status(403).json({ message: 'Forbiden' });

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decodedUser) => {
			if (err || foundUser._id !== decodedUser.id) {
				return res.status(403).json({ message: 'Forbiden' });
			}

			const accessToken = generateAccessToken({
				email: decodedUser.email,
				id: decodedUser.id,
			});

			res.status(200).json({ accessToken });
		}
	);
};

export const signout = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.status(204);

	const refreshToken = cookies.jwt;
	console.log('sign out 1');

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,

		async (err, decodedUser) => {
			console.log(decodedUser);
			if (err) return res.status(403).json({ message: 'Forbiden' });

			const foundUser = await User.findOne({ refreshToken });
			console.log(foundUser);
			console.log('sign out 2');

			console.log('sign out 3');

			if (!foundUser) return res.status(403).json({ message: 'Forbiden' });

			if (String(foundUser._id) !== decodedUser._id)
				return res.status(403).json({ message: 'Forbiden' });

			await User.findOneAndUpdate(
				{ refreshToken },
				{ refreshToken: '' },
				{ new: true }
			);
			res.clearCookie('jwt');
			console.log(res.cookies);
			res.status(204).json({ message: 'User signed out successfully' });
			console.log('Cookie removed!');
		}
	);
};

export const verifyEmail = async (req, res) => {
	const { id, token } = req.params;

	try {
		const user = await User.findById(id);
		if (!user) return res.status(404).json({ message: 'User not found' });

		const _token = await Token.findOne({ token });

		if (user.verified) {
			await _token.delete();
			return res.status(400).json({ message: 'Email already verified' });
		}

		if (!_token) return res.status(404).json({ message: 'Token not found' });

		if (_token.userId.toString() !== user._id.toString())
			return res.status(401).json({ message: 'Unauthorized' });

		await User.updateOne({ _id: user._id }, { verified: true });

		await _token.delete();

		res.status(200).json({ message: 'Email verified successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};
