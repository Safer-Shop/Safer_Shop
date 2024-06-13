import * as localJwt from "./local-jwt.service";

const service = localJwt;

const { sign, verify } = service;

export { sign, verify };
