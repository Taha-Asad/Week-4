import express from "express";
import {
  checkAuth,
  loginUser,
  logOutUser,
  registerUser,
  updateUser,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logOutUser);
authRouter.put("/update-profile", protectRoute, updateUser);
authRouter.get("/check", protectRoute, checkAuth);
export default authRouter;
