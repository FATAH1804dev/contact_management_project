import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../generated/prisma/client";
// import { logger } from "../src/application/logging";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} belum diatur`);
  }

  return value;
}

export const adapter = new PrismaMariaDb({
  host: requireEnv("DATABASE_HOST"),
  user: requireEnv("DATABASE_USER"),
  password: requireEnv("DATABASE_PASSWORD"),
  database: requireEnv("DATABASE_NAME"),
  connectionLimit: 5,
});
// const prisma = new PrismaClient({
//   adapter,
//   log: [
//     { emit: "event", level: "query" },
//     { emit: "event", level: "info" },
//     { emit: "event", level: "warn" },
//     { emit: "event", level: "error" },
//   ],
// });

// prisma.$on("error", (e) => {
//   logger.error(e);
// });

// prisma.$on("warn", (e) => {
//   logger.warn(e);
// });

// prisma.$on("info", (e) => {
//   logger.info(e);
// });

// prisma.$on("query", (e) => {
//   logger.info(e);
// });

// module.exports = { prisma };
