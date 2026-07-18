import { Request, Response } from "express";
import { verifyGoogleToken } from "./auth.service";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "idToken is required",
      });
    }

    const user = await verifyGoogleToken(idToken);

    return res.status(200).json({
      success: true,
      message: "Google token verified successfully",
      data: user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Firebase token",
    });
  }
};