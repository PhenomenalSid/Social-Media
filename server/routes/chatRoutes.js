import express from "express";
import {
  directMessaging,
  createGroup,
  sendGroupMsg,
  getGroupChat,
  getChat,
} from "../controllers/chatController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/direct-message/:receiverId", userAuth, directMessaging);
router.get("/direct-message/:receiverId", userAuth, getChat);
router.post("/group-chat", userAuth, createGroup);
router.post("/group-chat/send", userAuth, sendGroupMsg);
router.get("/group-chat/:roomId", userAuth, getGroupChat);

export default router;
