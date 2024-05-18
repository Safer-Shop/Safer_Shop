import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { Verification } from "./auth.dto";

const prisma = new PrismaClient();

export default class AuthService {
  static async createVerification(code: string, email: string) {
    const id = uuid();

    return prisma.verification.create({
      data: {
        id,
        code,
        email,
      },
    });
  }

  static async findVerificationById(id: string) {
    const result = await prisma.verification.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    const { code, email, createdAt } = result;

    return new Verification(id, code, email, new Date(createdAt));
  }

  static async findVerificationByEmail(email: string) {
    const user = await prisma.verification.findFirst({
      where: { email },
    });

    return user;
  }

  static async cleanVerification(timeOut: number) {
    const time = new Date().getTime() - timeOut * 1000;

    const item = await prisma.verification.deleteMany({
      where: {
        createdAt: {
          lt: new Date(time),
        },
      },
    });
    return item;
  }
}
