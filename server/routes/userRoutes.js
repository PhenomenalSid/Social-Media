import express from "express";
import {
  updateRequest,
  friendRequest,
  getFriendRequest,
  getUser,
  suggestedFriends,
  updateUser,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);
router.post("/send-friend-request", userAuth, friendRequest);
router.get("/get-friend-request", userAuth, getFriendRequest);
router.post("/update-friend-request", userAuth, updateRequest);
router.get("/suggested-friends", userAuth, suggestedFriends);

export default router;
