import jsonwebtoken from 'jsonwebtoken';
import expressJwt from 'express-jwt';

export const generateAccessToken = (user) => {
	return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};

export const generateRefreshToken = (user) => {
	return jsonwebtoken.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
