import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

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
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });
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
    const {text , image} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image:imageUrl,
    })
    await newMessage.save();
    // socket.io code 


    res.status(200).json({success:true , message:"Message sent" , newMessage})
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in Get Messages Function: ${error.message}`,
    });
  }
};
