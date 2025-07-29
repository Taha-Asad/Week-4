import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { getReciverSocketId, io } from "../lib/socket.js";

export const getUserSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    return res
      .status(200)
      .json({ success: true, message: "All users: ", filteredUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in User Side bar Function: ${error.message}`,
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const senderId = new mongoose.Types.ObjectId(req.user._id);
    const userToChatId = new mongoose.Types.ObjectId(req.params.id);

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in Get Messages Function: ${error.message}`,
    });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage); // ✅ Return the message directly
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in Send Message Function: ${error.message}`,
    });
  }
};
