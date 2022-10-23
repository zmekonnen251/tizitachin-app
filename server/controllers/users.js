import bcrypt from 'bcryptjs';
// import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../utils/utils.js';
import User from '../models/user.js';
import Token from '../models/token.js';
import sendEmail from '../utils/sendEmail.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const oldUser = await User.findOne({ email });

		if (!oldUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials' });

		if (!oldUser.verified) {
			const token = await Token.findOne({ userId: oldUser._id });

			if (!token) {
				const newToken = new Token({
					userId: oldUser._id,
					token: crypto.randomBytes(16).toString('hex'),
				}).save();

				const url = `${process.env.BASE_URL}/user/${oldUser._id}/confirmation/${newToken.token}`;
				await sendEmail({
					email: oldUser.email,
					subject: 'Account Verification Token',
					message: `Please click on the following link ${url} to verify your account.`,
				});

				return res.status(200).json({
					message:
						'An email has been sent to you. Please verify your account to login.',
				});
			}

			return res.status(400).json({ message: 'Please verify your email' });
		}

		// const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, 'test', {
		// 	expiresIn: '1h',
		// });

		const accessToken = generateAccessToken({
			email: oldUser.email,
			id: oldUser._id,
		});
		const refreshToken = generateRefreshToken({
			email: oldUser.email,
			id: oldUser._id,
		});

		const _oldUser = {
			name: oldUser.name,
			email: oldUser.email,
			_id: oldUser._id,
			imageUrl: oldUser.imageUrl,
		};

		// console.log(res);
		// res.status(200).json({ result: oldUser, token });
		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
		});

		res.status(200).json({ user: _oldUser, accessToken });
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
		const send = await sendEmail({
			email: result.email,
			subject: 'Account Verification',
			message: `Please click on the following link ${url} to verify your account.`,
		});

		const _result = {
			name: result.name,
			email: result.email,
			_id: result._id,
			imageUrl: result.imageUrl,
		};

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

			const _user = {
				name: user.name,
				email: user.email,
				_id: user._id,
				imageUrl: user.imageUrl,
			};
			res.cookie('refresh_token', refreshToken, {
				httpOnly: true,
			});
			res.status(200).json({ user, accessToken });
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
				id: result._id,
			});
			const refreshToken = generateRefreshToken({
				email: result.email,
				id: result._id,
			});

			const _result = {
				name: result.name,
				email: result.email,
				_id: result._id,
				imageUrl: result.imageUrl,
			};
			res.cookie('token', refreshToken, {
				httpOnly: true,
			});
			res.status(200).json({ user: result, accessToken });
		}
	}
};

export const refresh = async (req, res) => {
	const refreshToken = req.cookies.refresh_token;
	const accessToken = req.headers.authorization.split(' ')[1];

	if (!refreshToken || !accessToken)
		return res.status(401).json({ message: 'Unauthorized' });

	try {
		const decodedRefreshToken = jsonwebtoken.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);
		const decodedAccessToken = jsonwebtoken.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);

		const user = await User.findById(decodedRefreshToken.id);

		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		const newAccessToken = generateAccessToken({
			email: user.email,
			id: user._id,
		});

		res.status(200).json({ user, accessToken: newAccessToken });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

export const signout = async (req, res) => {
	res.clearCookie('refresh_token');
	res.status(200).json({ message: 'User signed out successfully' });
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
