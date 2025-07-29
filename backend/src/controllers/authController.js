import { generateToken } from "../lib/utlis.js";
import {
  passwordEncryption,
  passwordMatching,
} from "../middleware/hashPassword.js";
import User from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existence = await User.findOne({ email });
    if (existence) {
      return res.status(400).json({
        success: false,
        message: `User by Email: ${email} already exists`,
      });
    }
    const hashPassword = await passwordEncryption(password);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      profilePic,
    });
    if (user) {
      generateToken(user._id, res);
      await user.save();

      return res
        .status(201)
        .json({ success: true, message: `User created successfully`, user });
    } else {
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await passwordMatching(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    return res
      .status(200)
      .json({ success: true, message: `User Logged In Successfully`, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const logOutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: `User logged Out successfully` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, password, profilePic } = req.body;
    const userId = req.user._id;

    const existence = await User.findOne({ email });
    if (existence) {
      return res.status(400).json({
        success: false,
        message: `User by Email: ${email} already exists`,
      });
    }
    if (!email && !password && !profilePic) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one field to update (email, password, or profilePic)",
      });
    }

    const updateData = {};

    if (email) {
      updateData.email = email;
    }

    if (password) {
      // Hash password before saving
      const hashedPassword = await passwordEncryption(password);
      updateData.password = hashedPassword;
    }

    if (profilePic) {
      const uploadedProfilePic = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadedProfilePic.secure_url;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //remove sensitive fields before returning
    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User is authorized", user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
