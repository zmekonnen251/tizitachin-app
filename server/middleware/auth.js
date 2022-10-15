import jsonwebtoken from 'jsonwebtoken';
import expressJwt from 'express-jwt';

// wants to like a post
// click the like button => auth middleware (next) => like controller...

const { expressjwt: jwt } = expressJwt;

const auth = async (req, res, next) => {
	try {
		console.log(req.headers.authorization);
		const decodedDataAccess = jsonwebtoken.verify(
			req.headers.authorization,
			process.env.ACCESS_TOKEN_SECRET
		);

		const decodedDataRefresh = jsonwebtoken.verify(
			req.cookies.refresh_token,
			process.env.REFRESH_TOKEN_SECRET
		);

		if (decodedDataAccess.id === decodedDataRefresh.id) {
			req.userId = decodedDataAccess.id;
		} else {
			res.status(401).json({ message: 'Unauthenticated' });
		}
	} catch (error) {
		res.status(401).json({ message: 'Unauthenticated' });
	}
	next();
};

export default auth;
