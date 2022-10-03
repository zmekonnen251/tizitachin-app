import express from 'express';
import {
	getPostsBySearch,
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPost,
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();
// localhost:5000/posts
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
