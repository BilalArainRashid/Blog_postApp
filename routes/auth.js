import express from "express";

// make route

const router = express.Router();

// import controllers
import { register, login, logout } from "../controllers/auth.js";
/// routes

router.post("/register", register);
router.post("/login", login);
router.post("/login", logout);


export default router;
