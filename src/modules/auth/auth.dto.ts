import { User, role, UserStatus as status } from "@prisma/client";
import { string } from "joi";

export interface LoginDto {
  // username: string;
  email: string;
  password: string;
}

export interface Payload {
  id: number;
  name: string;
  surname: string;
  username: string | null;
  phone: string;
  email: string;
  address: string;
  role: role;
  status: status;
  created: Date | string;
  updated: Date | string;
}

export const UserDto = (user: User): Omit<User, "password"> => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    phone: user.phone,
    email: user.email,
    address: user.address,
    role: user.role,
    status: user.status,
    created: user.created,
    updated: user.updated,
  };
};

export class Verification {
  constructor(
    readonly id: string,
    readonly code: string,
    readonly email: string,
    readonly createdAt: Date
  ) {}
}

export interface VerificationDto {
  code: string;
  verificationId: string;
}

export interface resendDto {
  email: string;
}
