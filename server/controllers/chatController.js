import ChatRoom from "../models/chatroom.js";
import Message from "../models/message.js";
import UserModel from "../models/userModel.js";

export const directMessaging = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { receiverId } = req.params;
    const { userId } = req.body.user;
    const senderId = userId;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Both senderId and receiverId are required." });
    }

    const roomUsers = [senderId, receiverId].sort();

    let chatRoom = await ChatRoom.findOne({ users: roomUsers, type: "direct" });
    if (!chatRoom) {
      chatRoom = new ChatRoom({ users: roomUsers, type: "direct" });
      await chatRoom.save();
    }

    const message = new Message({ roomId: chatRoom._id, senderId, content });
    await message.save();

    chatRoom.messages.push(message._id);
    await chatRoom.save();

    req.io.to(chatRoom._id.toString()).emit("message", message);

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getChat = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const { userId } = req.body.user;
    const senderId = userId;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Both senderId and receiverId are required." });
    }

    const roomUsers = [senderId, receiverId].sort();

    let chatRoom = await ChatRoom.findOne({
      users: roomUsers,
      type: "direct",
    }).populate({
      path: "messages",
      populate: { path: "senderId", select: "firstName lastName" },
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({ users: roomUsers, type: "direct" });
      await chatRoom.save();
    }

    res.status(200).json(chatRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { creatorId } = req.body.user;
    const { userIds } = req.body;

    const chatRoom = new ChatRoom({
      users: [creatorId, ...userIds],
      type: "group",
    });
    await chatRoom.save();

    res.status(201).json(chatRoom);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const sendGroupMsg = async (req, res) => {
  try {
    const { senderId } = req.body.user;
    const roomId = req.params;
    const { content } = req.body;

    const chatRoom = await ChatRoom.findById(roomId);
    if (!chatRoom || chatRoom.type !== "group") {
      return res.status(404).json({ error: "Group chat not found" });
    }

    const message = new Message({ roomId, senderId, content });
    await message.save();

    req.io.to(roomId.toString()).emit("message", message);

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getGroupChat = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
