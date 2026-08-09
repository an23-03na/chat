import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.user!;
    return res.status(200).json(rest);
  } catch (error) {
    console.log("Server Error get me", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
