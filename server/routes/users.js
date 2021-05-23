import express from 'express';
import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin) //Sending sign in data to the database
router.post('/signup', signup)


export default router;