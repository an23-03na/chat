import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma-client";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "not authorized token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      userId: string;
    };

    if (!decoded) {
      return res.status(401).json({ message: "not authorized decoded" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "not authorized user" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Internal Server Error protectRoute");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

