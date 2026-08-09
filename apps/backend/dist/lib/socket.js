"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = void 0;
exports.getSocketId = getSocketId;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: { origin: process.env.FRONTEND_URL },
});
exports.io = io;
const userSocket = {};
function getSocketId(userId) {
    return userSocket[userId];
}
io.on("connection", (socket) => {
    const userId = Array.isArray(socket.handshake.query.userId)
        ? socket.handshake.query.userId[0]
        : socket.handshake.query.userId;
    console.log(`user connected: socketId=${socket.id}, userId=${userId}`);
    if (userId)
        userSocket[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(userSocket));
    socket.on("joinRoom", (chatId) => {
        socket.join(chatId);
        console.log(`user joined room: chatId=${chatId}, userId=${userId}`);
    });
    socket.on("leaveRoom", (chatId) => {
        socket.leave(chatId);
        console.log(`user left room: chatId=${chatId}, userId=${userId}`);
    });
    socket.on("disconnect", () => {
        console.log(`user disconnected: socketId=${socket.id}, userId=${userId}`);
        delete userSocket[userId];
        io.emit("onlineUsers", Object.keys(userSocket));
    });
});
//# sourceMappingURL=socket.js.map