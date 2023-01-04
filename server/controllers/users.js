import bcrypt from 'bcryptjs';
// import jwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken } from '../utils/utils.js';
import User from '../models/user.js';
import Token from '../models/token.js';
import Email from '../utils/email.js';

dotenv.config();

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

				const url = `${process.env.FRONT_END_URL}/user/${oldUser._id}/confirmation/${newToken.token}`;
				await new Email(oldUser, url).sendEmailVerification();

				return res.status(200).json({
					message:
						'An email has been sent to you. Please verify your account to login.',
				});
			}

			return res.status(400).json({ message: 'Please verify your email' });
		}

		const accessToken = generateAccessToken({
			email: oldUser.email,
			name: oldUser.name,
			imageUrl: oldUser.imageUrl,
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

		res.setHeader(
			`Set-Cookie`,
			`jwt=${refreshToken}; HttpOnly; Secure; SameSite=None; Domain=https://tizitachin.netlify.app; Max-Age=604800`
		);
		res.setHeader(
			`Set-Cookie`,
			`access-token=${accessToken}; HttpOnly; Secure; SameSite=None; Domain=https://tizitachin.netlify.app; Max-Age=900`
		);
		// res.cookie('jwt', refreshToken, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	domain: 'https://tizitachin.netlify.app',
		// 	sameSite: 'None',
		// 	maxAge: 7 * 24 * 60 * 60 * 1000,
		// });

		// res.cookie('access-token', accessToken, {
		// 	secure: true,
		// 	domain: 'https://tizitachin.netlify.app',
		// 	sameSite: 'None',
		// 	maxAge: 15 * 60 * 1000,
		// });

		res.status(200).json({
			user: {
				name: oldUser.name,
				email: oldUser.email,
				_id: oldUser._id,
				imageUrl: oldUser.imageUrl,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });

		// console.log(error);
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

		const url = `${process.env.FRONT_END_URL}/users/${result._id}/confirmation/${token.token}`;

		await new Email(result, url).sendEmailVerification();

		res.status(200).json({
			message: 'An email has been sent to you. Please verify your account',
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });

		// console.log(error);
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
				name: user.name,
				imageUrl: user.imageUrl,
				id: user._id,
			});
			const refreshToken = generateRefreshToken({
				email: user.email,
				id: user._id,
			});

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				domain: 'https://tizitachin.netlify.app',
				sameSite: 'None',
				secure: true,
			});

			res.cookie('access-token', accessToken, {
				maxAge: 15 * 60 * 1000,
				sameSite: 'None',
				secure: true,
				domain: 'https://tizitachin.netlify.app',
			});

			res.status(200).json({
				user: {
					name: user.name,
					email: user.email,
					_id: user._id,
					imageUrl: user.imageUrl,
				},
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
				domain: 'https://tizitachin.netlify.app',
				sameSite: 'None',
				secure: true,
			});

			res.cookie('access-token', accessToken, {
				maxAge: 15 * 60 * 1000,
				sameSite: 'None',
				secure: true,
				domain: 'https://tizitachin.netlify.app',
			});

			res.status(200).json({
				user: {
					name: user.name,
					email: user.email,
					_id: user._id,
					imageUrl: user.imageUrl,
				},
			});
		}
	}
};

export const signout = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.status(204);

	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,

		async (err, decodedUser) => {
			if (err) return res.status(403).json({ message: 'Forbiden' });

			const foundUser = await User.findOne({ refreshToken });

			if (!foundUser) return res.status(403).json({ message: 'Forbiden' });

			if (String(foundUser._id) !== decodedUser._id)
				return res.status(403).json({ message: 'Forbiden' });

			await User.findOneAndUpdate(
				{ refreshToken },
				{ refreshToken: '' },
				{ new: true }
			);
			res.clearCookie('jwt');
			res.clearCookie('access-token');
			// res.cookie('jwt', 'loggedout');
			// res.cookie('access-token', 'loggedout');

			res.status(204).json({ message: 'User signed out successfully' });
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

export const protect = async (req, res, next) => {
	const refreshToken = req.cookies['jwt'];
	const accessToken = req.cookies['access-token'];

	if (!refreshToken || !accessToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, decodedUser) => {
			if (err) {
				jwt.verify(
					refreshToken,
					process.env.REFRESH_TOKEN_SECRET,
					async (err, decodedUser) => {
						if (err) {
							return res.status(403).json({ message: 'Forbiden' });
						}

						const foundUser = await User.findOne({ refreshToken }).select(
							'-password'
						);

						if (!foundUser)
							return res.status(403).json({ message: 'Forbiden' });

						if (String(foundUser._id) !== decodedUser._id)
							return res.status(403).json({ message: 'Forbiden' });

						const newAccessToken = generateAccessToken({
							email: decodedUser.email,
							name: foundUser.name,
							imageUrl: foundUser.imageUrl,
							_id: decodedUser._id,
						});

						req.userId = decodedUser._id;

						res.cookie('access-token', newAccessToken, {
							sameSite: 'None',
							secure: true,
							maxAge: 15 * 60 * 1000,
							domain: 'https://tizitachin.netlify.app',
						});

						res.status(200).json({
							user: {
								name: foundUser.name,
								email: foundUser.email,
								_id: foundUser._id,
							},
						});
					}
				);
			} else {
				req.userId = decodedUser._id;
			}
		}
	);
	next();
};
