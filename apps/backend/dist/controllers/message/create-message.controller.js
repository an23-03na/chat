"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const socket_1 = require("../../lib/socket");
const upload_image_1 = require("../../lib/upload-image");
const createMessage = async (req, res) => {
    try {
        const { text, receiverId, imageUrl } = req.body;
        const chatId = req.params.id;
        const userId = req.user.id;
        const image = imageUrl ? await (0, upload_image_1.uploadImage)(imageUrl) : null;
        if (!text?.trim() && !imageUrl)
            return res.status(400).json({ message: "Text is required" });
        if (receiverId) {
            const newMessage = await prisma_client_1.prisma.message.create({
                data: {
                    text,
                    imageUrl: image,
                    sender: { connect: { id: userId } },
                    receiver: { connect: { id: receiverId } },
                },
                include: {
                    sender: { select: { id: true, name: true, avatar: true } },
                    chat: { select: { id: true } },
                },
            });
            const receiverSocketId = (0, socket_1.getSocketId)(receiverId);
            if (receiverSocketId) {
                socket_1.io.to(receiverSocketId).emit("newPrivateMessage", newMessage);
            }
            return res.status(201).json(newMessage);
        }
        const isMember = await prisma_client_1.prisma.chatMember.findUnique({
            where: { chatId_userId: { chatId, userId } },
        });
        if (!isMember)
            return res
                .status(403)
                .json({ message: "You are not a member of this chat" });
        const newMessage = await prisma_client_1.prisma.message.create({
            data: {
                text,
                imageUrl: image,
                sender: { connect: { id: userId } },
                chat: { connect: { id: chatId } },
            },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
                chat: { select: { id: true } },
            },
        });
        socket_1.io.to(chatId).emit("newMessage", newMessage);
        return res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Server Error create message", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createMessage = createMessage;
//# sourceMappingURL=create-message.controller.js.map