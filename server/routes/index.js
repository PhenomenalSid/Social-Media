import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import postRoute from "./postRoutes.js";
import chatRoute from "./chatRoutes.js";

const router = express.Router();

router.use(`/auth`, authRoute);
router.use(`/users`, userRoute);
router.use(`/posts`, postRoute);
router.use(`/chat`, chatRoute);

export default router;
