import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const getMessageUser = async (req: Request, res: Response) => {
  try {
    const receiverId = req.params.id as string;
    const userId = req.user.id as string;

    const messages = await prisma.message.findMany({
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

    await prisma.message.updateMany({
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
  } catch (error) {
    console.log("Server Error get message user", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
