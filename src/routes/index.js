import express from "express";

import userRouter from "./user";
import messageRouter from "./message";
import authRouter from "./auth";

const router = express.Router();

router.use("/user", userRouter);
router.use("/message", messageRouter);
router.use("/auth", authRouter);

export default router;
