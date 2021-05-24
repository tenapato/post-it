// Sets a route for every post

import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js'; //Authentication middleware

const router = express.Router(); //Router instance

//localhost:5000/posts 
router.get('/', getPosts);
router.post('/', auth, createPost); 
router.patch('/:id', auth, updatePost);  //updating posts
router.delete('/:id', auth, deletePost); //deleting posts
router.patch('/:id/likePost', auth, likePost); //liking posts

export default router;