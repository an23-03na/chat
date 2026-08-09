import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { io } from "../../lib/socket";

export const removeMember = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id as string;
    const { userId: targetUserId } = req.body;
    const currentUserId = req.user.id;

    if (targetUserId !== currentUserId) {
      return res.status(403).json({
        message: "You can't remove other members",
      });
    }

    await prisma.chatMember.delete({
      where: {
        chatId_userId: {
          chatId,
          userId: targetUserId,
        },
      },
    });

    io.to(chatId).emit("memberRemoved", {
      chatId,
      userId: targetUserId,
    });

    return res.status(200).json({
      message: "Member removed",
    });
  } catch (error) {
    console.log("Server Error remove member", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
