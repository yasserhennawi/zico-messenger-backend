import express from "express";
import { user } from "../controllers";
import { auth } from "../controllers";

const router = express.Router();

router.get("/recent", auth.verifyToken, user.findRecent);
router.get("/", auth.verifyToken, user.findAll);
router.get("/:id", auth.verifyToken, user.findById);
// TODO: get id from token instead of route params
router.post("/", auth.verifyToken, user.save);
router.delete("/:id", auth.verifyToken, user.remove);
// router.get("/asd", (req, res)));

export default router;
