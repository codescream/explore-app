import express from 'express';
import { getPosts, createPost, likePost, updatePost, deletePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', createPost);
router.patch('/:id/like', auth, likePost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;