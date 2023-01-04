import { allowedOrigins } from '../config/corsOptions.js';

const credentials = (req, res, next) => {
	// const origin = req.headers.origin;
	// if (allowedOrigins.indexOf(origin) !== -1) {
	// 	res.setHeader('Access-Control-Allow-Credentials', true);
	// }
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', 'https://tizitachin.netlify.app');
	res.header(
		'Access-Control-Allow-Methods',
		'GET,PUT,DELETE,POST,UPDATE,OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept'
	);

	next();
};

export default credentials;
