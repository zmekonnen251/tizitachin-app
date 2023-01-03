import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || '8080';

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(port, () => console.log(`App listening on port ${port}!`));
	})
	.catch((err) => {
		console.log(err);
	});
