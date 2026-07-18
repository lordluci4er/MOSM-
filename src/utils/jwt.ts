import jwt from "jsonwebtoken";
import env from "../config/env";

export interface JwtPayload {
  uid: string;
  email: string;
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};