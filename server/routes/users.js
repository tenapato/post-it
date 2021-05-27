import express from 'express';
import { signin, signup, users } from '../controllers/user.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/users", users);

export default router;