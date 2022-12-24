import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '5m',
	});
};

export const generateRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
};
