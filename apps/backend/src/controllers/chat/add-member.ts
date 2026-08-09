import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { io } from "../../lib/socket";

export const addMember = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id as string;
    const { userId: newUserId } = req.body;
    const currentUserId = req.user.id;

    if (!newUserId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const isMember = await prisma.chatMember.findUnique({
      where: { chatId_userId: { chatId, userId: currentUserId } },
    });

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this chat" });
    }

    const alreadyMember = await prisma.chatMember.findUnique({
      where: { chatId_userId: { chatId, userId: newUserId } },
    });

    if (alreadyMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    const newMember = await prisma.chatMember.create({
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

    io.to(chatId).emit("memberAdded", {
      chatId,
      member: newMember,
    });

    return res.status(201).json(newMember);
  } catch (error) {
    console.log("Server Error add member", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
