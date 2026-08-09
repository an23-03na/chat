import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "success logout" });
  } catch (error) {
    console.log("Server Error logout ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
