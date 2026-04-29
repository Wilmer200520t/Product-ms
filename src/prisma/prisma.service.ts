import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { envs } from "../configs";
import { PrismaClient } from "../generated/prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: envs.DATABASE_URL });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      Logger.log("Connected to the database successfully.");
    } catch (error) {
      Logger.error("Error connecting to the database:", error);
      throw error;
    }
  }
}
