import express from "express";
import { auth } from "../controllers";

const router = express.Router();

router.post("/register", auth.register);
router.get("/me", auth.me);
router.post("/login", auth.login);

export default router;
