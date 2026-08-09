import { Request, Response } from "express";
import z from "zod";
import { chatSchema } from "../../validations/chat.schema";
import { uploadImage } from "../../lib/upload-image";
import { prisma } from "../../prisma/prisma-client";

export const createChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const parsed = chatSchema.safeParse(req.body);

    if (!parsed.success)
      return res.status(400).json(z.treeifyError(parsed.error));

    const data = parsed.data;

    const imageUrl = data.icon ? await uploadImage(data.icon) : null;

    const newChat = await prisma.chat.create({
      data: {
        name: data.name,

        icon: imageUrl,

        user: { connect: { id: userId } },

        members: {
          create: [{ userId }],
        },
      },
    });

    return res.status(201).json(newChat);
  } catch (error) {
    console.log("Server Error create chat", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
