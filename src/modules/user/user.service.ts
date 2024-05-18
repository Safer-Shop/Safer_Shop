import { PrismaClient, User, UserStatus, role } from "@prisma/client";
import { UpdateBody, Userbody } from "./user.dto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default class UserService {
  static async create(detail: Userbody) {
    const hashPassword = bcrypt.hashSync(
      detail.password,
      bcrypt.genSaltSync(10)
    );

    return prisma.user.create({
      data: {
        name: detail.name,
        surname: detail.surname,
        username: detail.username,
        phone: detail.phone,
        email: detail.email,
        address: detail.address,
        password: hashPassword,
      },
    });
  }

  static async excisUser(email: string): Promise<boolean> {
    const user = await prisma.user.findMany({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    return user.length !== 0;
  }

  static async findByRole(role: role) {
    const client = await prisma.user.findMany({
      where: {
        role,
      },
    });
    return client;
  }

  static async findByEmail(email: string) {
    const info = await prisma.user.findUnique({
      where: { email },
    });
    return info;
  }

  static async changeUserRole(id: number, role: role) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return user;
  }

  static async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findById(id: number) {
    const client = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return client;
  }

  static async allUsers(page?: number, limit?: number) {
    const client = await prisma.user.findMany({
      skip: page ? (page - 1) * (limit ?? 0) + 1 : undefined,
      take: limit,
    });
    return client;
  }

  static async updateData(id: number, detail: UpdateBody) {
    const hashPassword = bcrypt.hashSync(
      detail.password,
      bcrypt.genSaltSync(10)
    );

    const newData = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: detail.name,
        surname: detail.surname,
        phone: detail.phone,
        email: detail.email,
        address: detail.address,
        role: detail.role,
        password: hashPassword,
      },
    });
    return newData;
  }

  static async changeStatus(id: number, status: UserStatus) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
