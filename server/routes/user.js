import express from 'express';
import { addUser, getUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signUp', addUser);
router.post('/signIn', getUser);

export default router;