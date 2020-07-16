import express from "express";
import { message } from "../controllers";
import { auth } from "../controllers";

const router = express.Router();

// TODO, should take id from token 
router.get("/:id", auth.verifyToken, message.findById);
// router.post("/", auth.verifyToken, message.save);
router.post("/", auth.verifyToken, message.send);
router.delete("/:id", auth.verifyToken, message.remove);

export default router;
