import jsonwebtoken from 'jsonwebtoken';

const auth = async (req, res, next) => {
	console.log(req.cookies);
	try {
		const decodedRefreshToken = jsonwebtoken.verify(
			req.cookies.refresh_token,
			process.env.REFRESH_TOKEN_SECRET
		);

		const decodedAccessToken = jsonwebtoken.verify(
			req.headers.authorization.split(' ')[1],
			process.env.ACCESS_TOKEN_SECRET
		);

		if (decodedAccessToken.id !== decodedRefreshToken.id) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		req.userId = decodedAccessToken.id;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Unauthorized' });
	}
};

export default auth;
