import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
// import corsOptions from './config/corsOptions.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import credentials from './middleware/credentials.js';

dotenv.config();

const app = express();

const corsOptions = {
	origin: ['*'],
	optionSuccessStatus: 200,
	credentials: true,
};

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(
	cors({
		origin: 'https://tizitachin.netlify.app',
		credentials: true,
	})
);
app.use(credentials);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cookieParser());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
	res.send('Hello to Memories API');
});

export default app;
