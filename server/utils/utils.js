import jsonwebtoken from 'jsonwebtoken';

export const generateAccessToken = (user) => {
	return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '5m',
	});
};

export const generateRefreshToken = (user) => {
	return jsonwebtoken.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
