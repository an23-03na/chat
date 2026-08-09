import { Request, Response } from "express";
import { updateProfileSchema } from "../../validations/auth.schema";
import z from "zod";
import { prisma } from "../../prisma/prisma-client";
import cloudinary from "../../lib/cloudinary";

export const updateProfile = async (req: Request, res: Response) => {
  const { name, phone, avatar } = req.body;
  const user = req.user;
  try {
    const parsed = updateProfileSchema.safeParse({
      avatar,
      name,
      phone,
    });
    if (!parsed.success) {
      const error = z.treeifyError(parsed.error);
      return res.status(400).json(error);
    }
    const data = parsed.data;

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    let imageUrl = "";
    if (data.avatar) {
      const uploadImage = await cloudinary.uploader.upload(data.avatar || "");
      imageUrl = uploadImage.secure_url;
    }

    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        avatar: imageUrl,
        phone: data.phone,
      },
      select: {
        id: true,
        avatar: true,
        name: true,
        verified: true,
      },
    });
    return res.status(200).json(updateUser);
  } catch (error) {
    console.log("Server Error update profile ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
