import jwt from "jsonwebtoken";
import jwtConfig from "../../../config/jwt.config";
import { Payload } from "../../../modules/auth/auth.dto";

const { secret } = jwtConfig;

export const sign = async (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET!);
};

export const verify = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET ?? "", {
    ignoreExpiration: true,
  }) as Payload;
};
