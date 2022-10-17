import express from 'express';
import {
	signin,
	signup,
	signout,
	googleSignin,
	refresh,
	verifyEmail,
} from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signout', signout);
router.post('/google', googleSignin);
router.get('/refresh', refresh);
router.get('/:id/confirmation/:token', verifyEmail);

export default router;
