import express from "express";
import { user } from "../controllers";

const router = express.Router();

router.get("/", user.findAll);
router.get("/:id", user.findById);
router.post("/", user.save);
router.delete("/:id", user.remove);

export default router;
