import { PrismaClient } from ".prisma/client";
import path from "path";
import * as fsregular from "node:fs";
import { CreateFileDto as createDto } from "./file.dto";

const prisma = new PrismaClient();

export default class FileService {
  static async create(dtos: createDto[]) {
    const files: {
      id: number;
      path: string;
      filename: string;
    }[] = [];

    for (let dto of dtos) {
      const file = await prisma.file.create({
        data: {
          path: dto.path,
          filename: dto.filename,
        },
        select: {
          id: true,
          path: true,
          filename: true,
        },
      });

      files.push(file);
    }

    return files;
  }

  
}
