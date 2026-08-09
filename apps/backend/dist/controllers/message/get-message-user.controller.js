"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageUser = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const getMessageUser = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const userId = req.user.id;
        const messages = await prisma_client_1.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId },
                    { senderId: receiverId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: "asc" },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
            },
        });
        await prisma_client_1.prisma.message.updateMany({
            where: {
                isRead: false,
                receiverId: userId,
                senderId: receiverId,
            },
            data: {
                isRead: true,
            },
        });
        return res.status(200).json(messages);
    }
    catch (error) {
        console.log("Server Error get message user", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getMessageUser = getMessageUser;
//# sourceMappingURL=get-message-user.controller.js.map