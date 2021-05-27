import express from 'express';
import { signin, signup, users, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", users);
router.delete('/:id', deleteUser);

export default router;