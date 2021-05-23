// Sets a route for every post

import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';


const router = express.Router(); //Router instance

//localhost:5000/posts 
router.get('/', getPosts);
router.post('/', createPost); 
router.patch('/:id', updatePost);  //updating posts
router.delete('/:id', deletePost); //deleting posts
router.patch('/:id/likePost', likePost);

export default router;