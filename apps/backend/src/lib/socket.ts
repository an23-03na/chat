import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL },
});

const userSocket: Record<string, string> = {};
export function getSocketId(userId: string) {
  return userSocket[userId];
}
io.on("connection", (socket) => {
  const userId = Array.isArray(socket.handshake.query.userId)
    ? socket.handshake.query.userId[0]
    : socket.handshake.query.userId;
  console.log(`user connected: socketId=${socket.id}, userId=${userId}`);
  if (userId) userSocket[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(userSocket));
  socket.on("joinRoom", (chatId: string) => {
    socket.join(chatId);
    console.log(`user joined room: chatId=${chatId}, userId=${userId}`);
  });
  socket.on("leaveRoom", (chatId: string) => {
    socket.leave(chatId);
    console.log(`user left room: chatId=${chatId}, userId=${userId}`);
  });
  socket.on("disconnect", () => {
    console.log(`user disconnected: socketId=${socket.id}, userId=${userId}`);
    delete userSocket[userId!];
    io.emit("onlineUsers", Object.keys(userSocket));
  });
});
export { app, io, server };
