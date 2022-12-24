import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

export const verifyJwt = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: 'Forbidden' }); // Invalid token
		}

		req.userId = decoded.id;
		next();
	});
};

export default verifyJwt;
