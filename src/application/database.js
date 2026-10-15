import { adapter } from "../../lib/prisma.js";
import { logger } from "./logging.js";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient({
  adapter,
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

prisma.$on("error", (e) => {
  logger.error(e);
});

prisma.$on("warn", (e) => {
  logger.warn(e);
});

prisma.$on("info", (e) => {
  logger.info(e);
});

prisma.$on("query", (e) => {
  logger.info(e);
});

export { prisma };
