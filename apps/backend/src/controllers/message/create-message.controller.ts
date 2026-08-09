import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { io, getSocketId } from "../../lib/socket";
import { uploadImage } from "../../lib/upload-image";
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { text, receiverId, imageUrl } = req.body;
    const chatId = req.params.id as string;
    const userId = req.user.id;

    const image = imageUrl ? await uploadImage(imageUrl) : null;

    if (!text?.trim() && !imageUrl)
      return res.status(400).json({ message: "Text is required" });

    if (receiverId) {
      const newMessage = await prisma.message.create({
        data: {
          text,
          imageUrl: image,
          sender: { connect: { id: userId } },

          receiver: { connect: { id: receiverId } },
        },

        include: {
          sender: { select: { id: true, name: true, avatar: true } },
          chat: { select: { id: true } },
        },
      });

      const receiverSocketId = getSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newPrivateMessage", newMessage);
      }

      return res.status(201).json(newMessage);
    }

    const isMember = await prisma.chatMember.findUnique({
      where: { chatId_userId: { chatId, userId } },
    });

    if (!isMember)
      return res
        .status(403)
        .json({ message: "You are not a member of this chat" });

    const newMessage = await prisma.message.create({
      data: {
        text,
        imageUrl: image,
        sender: { connect: { id: userId } },
        chat: { connect: { id: chatId } },
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        chat: { select: { id: true } },
      },
    });

    io.to(chatId).emit("newMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Server Error create message", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
