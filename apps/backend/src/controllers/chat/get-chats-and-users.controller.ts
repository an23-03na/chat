import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const getChatsAndUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const chats = await prisma.chat.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,

          include: {
            sender: { select: { id: true, name: true, avatar: true } },
          },
        },

        members: {
          include: {
            user: {
              select: { id: true, name: true, avatar: true },
            },
          },
        },
      },
    });

    const users = await prisma.user.findMany({
      where: {
        id: { not: userId },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
      },
    });

    return res.status(200).json({ chats, users });
  } catch (error) {
    console.log("Server Error get chats and users", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
