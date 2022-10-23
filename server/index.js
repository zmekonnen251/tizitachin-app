import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
	res.send('Hello to Memories API');
});
// const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL)
	.then(() =>
		app.listen(5000, () =>
			console.log(`Server Running on Port: http://localhost:5000`)
		)
	)
	.catch((error) => console.log(`${error} did not connect`));
