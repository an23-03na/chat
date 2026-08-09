import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const getMessageChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id as string;
    const userId = req.user.id as string;

    const isMember = await prisma.chatMember.findUnique({
      where: { chatId_userId: { chatId, userId } },
    });

    if (!isMember) {
      return res.status(403).json({ message: "user not found" });
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
    });

    await prisma.message.updateMany({
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
  } catch (error) {
    console.log("Server Error get message user", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
