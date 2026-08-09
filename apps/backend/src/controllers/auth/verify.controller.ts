import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { generateToken } from "../../lib/generate-token";

export const verify = async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    if (!code || typeof code !== "string") {
      return res.status(400).json({ message: "code not found" });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code: code as string },
      include: { user: true },
    });

    if (!verificationCode) {
      return res.status(400).json({ message: "code not found" });
    }

    await prisma.verificationCode.delete({
      where: { userId: verificationCode.user.id },
    });

    const user = await prisma.user.update({
      where: { id: verificationCode.user.id },
      data: { verified: new Date() },
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    if (user) {
      generateToken(user.id, res);
      return res.redirect("http://localhost:3000?verify");
    } else {
      return res.status(400).json("user not created");
    }
  } catch (error) {
    console.log("Server Error verify ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
