"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMember = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const socket_1 = require("../../lib/socket");
const addMember = async (req, res) => {
    try {
        const chatId = req.params.id;
        const { userId: newUserId } = req.body;
        const currentUserId = req.user.id;
        if (!newUserId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const isMember = await prisma_client_1.prisma.chatMember.findUnique({
            where: { chatId_userId: { chatId, userId: currentUserId } },
        });
        if (!isMember) {
            return res
                .status(403)
                .json({ message: "You are not a member of this chat" });
        }
        const alreadyMember = await prisma_client_1.prisma.chatMember.findUnique({
            where: { chatId_userId: { chatId, userId: newUserId } },
        });
        if (alreadyMember) {
            return res.status(400).json({ message: "User is already a member" });
        }
        const newMember = await prisma_client_1.prisma.chatMember.create({
            data: {
                chat: { connect: { id: chatId } },
                user: { connect: { id: newUserId } },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
        socket_1.io.to(chatId).emit("memberAdded", {
            chatId,
            member: newMember,
        });
        return res.status(201).json(newMember);
    }
    catch (error) {
        console.log("Server Error add member", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.addMember = addMember;
//# sourceMappingURL=add-member.js.map