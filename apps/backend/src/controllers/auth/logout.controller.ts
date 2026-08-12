import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    const isProd = process.env.NODE_ENV !== "development";
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      domain: isProd ? ".mk-flower.am" : undefined,
    });
    return res.status(200).json({ message: "success logout" });
  } catch (error) {
    console.log("Server Error logout ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};