"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageChat = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const getMessageChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        const userId = req.user.id;
        const isMember = await prisma_client_1.prisma.chatMember.findUnique({
            where: { chatId_userId: { chatId, userId } },
        });
        if (!isMember) {
            return res.status(403).json({ message: "user not found" });
        }
        const messages = await prisma_client_1.prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: "asc" },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
            },
        });
        await prisma_client_1.prisma.message.updateMany({
            where: {
                chatId,
                isRead: false,
                senderId: { not: userId },
            },
            data: {
                isRead: true,
            },
        });
        console.log(messages);
        return res.status(200).json(messages);
    }
    catch (error) {
        console.log("Server Error get message user", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getMessageChat = getMessageChat;
//# sourceMappingURL=get-message-chat.controller.js.map