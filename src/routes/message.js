import express from "express";
import { message } from "../controllers";

const router = express.Router();

// TODO, should take id from token 
router.get("/:id", message.findAll);
router.post("/", message.save);
router.delete("/:id", message.remove);

export default router;
