import express from "express";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "../config/db.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// routes import
import authRouter from "./routes/authRoute.js";
import messageRouter from "./routes/messageRoutes.js";
// All routes
// Auth routes
app.use("/api/v1/auth", authRouter);
// Messages Route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
connectDB();
app.listen(PORT, () => {
  console.log(`Server started successfully on Port: ${PORT} `.bgWhite.blue);
});
