import express from "express";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "../config/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path"
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();
//middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' })); // adjust size as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname , "../../frontend/dist")));

  app.get("*" , (req ,res)=>{
    res.sendFile(path.join(__dirname , "../../frontend" , "dist" , "index.html"))
  })
}
connectDB();
server.listen(PORT, () => {
  console.log(`Server started successfully on Port: ${PORT} `.bgWhite.blue);
});
