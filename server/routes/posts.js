import express from 'express';
import { getPosts, createPost, likePost, updatePost, deletePost, searchPosts } from '../controllers/posts.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', getPosts);
router.get('/search', searchPosts);
router.post('/', auth, createPost);
router.patch('/:id/like', auth, likePost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;