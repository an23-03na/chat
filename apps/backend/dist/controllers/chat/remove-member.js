"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const socket_1 = require("../../lib/socket");
const removeMember = async (req, res) => {
    try {
        const chatId = req.params.id;
        const { userId: targetUserId } = req.body;
        const currentUserId = req.user.id;
        if (targetUserId !== currentUserId) {
            return res.status(403).json({
                message: "You can't remove other members",
            });
        }
        await prisma_client_1.prisma.chatMember.delete({
            where: {
                chatId_userId: {
                    chatId,
                    userId: targetUserId,
                },
            },
        });
        socket_1.io.to(chatId).emit("memberRemoved", {
            chatId,
            userId: targetUserId,
        });
        return res.status(200).json({
            message: "Member removed",
        });
    }
    catch (error) {
        console.log("Server Error remove member", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.removeMember = removeMember;
//# sourceMappingURL=remove-member.js.map