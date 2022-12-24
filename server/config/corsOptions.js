export const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:5000',
	'http://localhost:3001',
	'http://localhost:3002',
	'http://127.0.0.1:3000',
	process.env.CONNECTION_URL,
];

export default {
	origin: function (origin, callback) {
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			console.log(origin);
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionSuccessStatus: 200,
	credentials: true,
};
