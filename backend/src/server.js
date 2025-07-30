import express from "express";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import { app, server } from "./lib/socket.js";

// Dotenv
dotenv.config();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
}
// Middlewares
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173 " , "http://localhost:5000"], // <-- Update this if deploying
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Routes
import authRouter from "./routes/authRoute.js";
import messageRouter from "./routes/messageRoutes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(staticPath));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "SkillifyZone API is running",
    version: "1.0.0",
    environment: NODE_ENV,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// 404 handler
app.use("/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

connectDB();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.blue);
});
