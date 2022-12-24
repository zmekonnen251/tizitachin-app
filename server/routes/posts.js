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

import verifyJwt from '../middleware/verifyJwt.js';

const router = express.Router();
// localhost:5000/posts
router.get('/', getPosts);
router.post('/', verifyJwt, createPost);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.patch('/:id', verifyJwt, updatePost);
router.delete('/:id', verifyJwt, deletePost);
router.patch('/:id/likePost', verifyJwt, likePost);
router.post('/:id/commentPost', verifyJwt, commentPost);

export default router;
