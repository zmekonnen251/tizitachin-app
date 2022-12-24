import { allowedOrigins } from '../config/corsOptions.js';

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.indexOf(origin) !== -1) {
		res.setHeader('Access-Control-Allow-Credentials', true);
	}

	next();
};

export default credentials;
