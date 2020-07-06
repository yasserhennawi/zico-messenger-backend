import express from "express";

import userRouter from "./user";
import messageRouter from "./message";

const router = express.Router();

router.use("/user", userRouter);
router.use("/message", messageRouter);

export default router;
