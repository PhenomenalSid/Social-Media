import express from "express";
import {
  acceptRequest,
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
router.post("/accept-friend-request", userAuth, acceptRequest);
router.post("/suggested-friends", userAuth, suggestedFriends);

export default router;
