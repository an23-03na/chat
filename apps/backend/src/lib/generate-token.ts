import { Response } from "express";
import jwt from "jsonwebtoken";
export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "7d",
  });

  const isProd = process.env.NODE_ENV !== "development";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    domain: isProd ? ".mk-flower.am" : undefined,
  });
  return token;
};