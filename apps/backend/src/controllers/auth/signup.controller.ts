import { Request, Response } from "express";
import { signupSchema } from "../../validations/auth.schema";
import z from "zod";
import { prisma } from "../../prisma/prisma-client";
import bcrypt from "bcrypt";
import { sendEmail } from "../../lib/send-email";

export const signup = async (req: Request, res: Response) => {
  const { email, name, phone, password, avatar } = req.body;
  try {
    const parsed = signupSchema.safeParse({
      email,
      avatar,
      name,
      password,
      phone,
    });
    if (!parsed.success) {
      const error = z.treeifyError(parsed.error);
      return res.status(400).json(error);
    }
    const data = parsed.data;

    const isUserExist = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (isUserExist) {
      return res.status(400).json("user already exist");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        userName: data.userName,
        email: data.email,
        name: data.name,
        password: hashedPassword,
        avatar: data.avatar,
        phone: data.phone,
      },
    });

    if (user) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await prisma.verificationCode.create({
        data: { code, userId: user.id },
      });
      await sendEmail({
        to: data.email,
        subject: "Verification",
        html: `<a href="${process.env.API_URL}/api/auth/verify?code=${code}">verify</a>`,
      });
      return res.status(201).json({ message: "success register" });
    } else {
      return res.status(400).json("user not created");
    }
  } catch (error) {
    console.log("Server Error signup ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
