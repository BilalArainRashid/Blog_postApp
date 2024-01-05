import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.js';

const router = express.Router();

// routes

router.get("/list", getPosts);
router.get("/", getPost);
router.post("/create", createPost);
router.put("/:update", updatePost);
router.delete("/:id", deletePost);


export default router;

