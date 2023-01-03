import express from 'express';
import {
	getPostsBySearch,
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPost,
	commentPost,
} from '../controllers/posts.js';

import { protect } from '../controllers/users.js';

import verifyJwt from '../middleware/verifyJwt.js';

const router = express.Router();
// localhost:5000/posts
router.get('/', getPosts);
router.post('/', protect, createPost);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.patch('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.patch('/:id/likePost', protect, likePost);
router.post('/:id/commentPost', protect, commentPost);

export default router;
