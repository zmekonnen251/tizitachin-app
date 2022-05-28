import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
const router = express.Router();

// localhost:5000/posts

router.get('/', getPosts);
router.post('/', createPost);

export default router;
