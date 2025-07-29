import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReciverSocketId(userId){
    return userSocketMap[userId]
}
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("A user just connected ", socket.id);
  const userId = socket.handshake.auth?.userId;
  console.log("Authenticated userId from socket:", userId); // ✅ Add this

  if (userId) userSocketMap[userId] = socket.id;
  // sent notification or event into to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, app, server };
