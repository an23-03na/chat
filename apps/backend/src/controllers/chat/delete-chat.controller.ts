import { Request, Response } from "express";

import { prisma } from "../../prisma/prisma-client";

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const chat = await prisma.chat.findUnique({ where: { id } });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (chat.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deleted = await prisma.chat.delete({ where: { id } });

    return res.status(200).json(deleted);
  } catch (error) {
    console.log("Server Error delete chat", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
