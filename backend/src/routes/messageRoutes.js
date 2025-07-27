import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getMessages,
  getUserSideBar,
  sendMessage,
} from "../controllers/messagesController.js";

const messageRouter = express.Router();

messageRouter.get("/user", protectRoute, getUserSideBar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);
export default messageRouter;
