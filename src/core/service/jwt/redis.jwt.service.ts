import * as redis from "redis";
import JWTR from "jwt-redis";

import { UserDto } from "../../../modules/auth/auth.dto";

const client: redis.RedisClientType = redis.createClient();

const jwtr = new JWTR(client);

client.connect();

export const sign = async (payload: any) => {
  return jwtr.sign(payload, process.env.JWT_SECRET!, {});
};

export const verify = async (token: string) => {
  return (await jwtr.verify(token, process.env.JWT_SECRET!)) as typeof UserDto;
};
