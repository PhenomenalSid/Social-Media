import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["direct", "group"],
    default: "direct",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ChatRoom", chatRoomSchema);
