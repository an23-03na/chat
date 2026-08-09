import { Request, Response } from "express";
import { loginSchema } from "../../validations/auth.schema";
import z from "zod";
import { prisma } from "../../prisma/prisma-client";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/generate-token";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const parsed = loginSchema.safeParse({
      email,
      password,
    });
    if (!parsed.success) {
      const error = z.treeifyError(parsed.error);
      return res.status(400).json(error);
    }
    const data = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    if (!user.verified) {
      return res.status(400).json({ message: "user is not verified" });
    }

    const { password: _password, createdAt, updatedAt, ...rest } = user;
    generateToken(user.id, res);
    return res.status(200).json(rest);
  } catch (error) {
    console.log("Server Error login ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
