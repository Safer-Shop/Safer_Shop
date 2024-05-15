import jwt from "jsonwebtoken";
import { Payload } from "../../../modules/auth/auth.dto";

export const sign = async (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRES_IN!,
  });
};

export const verify = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET ?? "") as Payload;
};
