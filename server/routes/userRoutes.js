import express from "express";
import path from "path";
import {
  acceptRequest,
  // changePassword,
  friendRequest,
  getFriendRequest,
  getUser,
  // requestPasswordReset,
  // resetPassword,
  suggestedFriends,
  updateUser,
  // verifyEmail,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

// router.get("/verify/:userId/:token", verifyEmail);
// router.post("/request-passwordreset", requestPasswordReset);
// router.get("/reset-password/:userId/:token", resetPassword);
// router.post("/reset-password", changePassword);
router.get("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);
router.post("/send-friend-request", userAuth, friendRequest);
router.get("/get-friend-request", userAuth, getFriendRequest);
router.post("/accept-friend-request", userAuth, acceptRequest);
router.post("/suggested-friends", userAuth, suggestedFriends);

// router.get("/verified", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/build", "index.html"));
// });

// router.get("/resetpassword", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/build", "index.html"));
// });

export default router;
