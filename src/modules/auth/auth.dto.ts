import { User, role, UserStatus as status } from "@prisma/client";

export interface LoginDto {
  username?: string;
  email?: string;
  password: string;
}

export interface Payload {
  id: number;
  name: string;
  surname: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  role: role;
  status: status;
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
  verificationId: string
  code: string
}