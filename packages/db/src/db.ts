import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

// Create adapter using DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const isServer =
  typeof process !== "undefined" && process.versions && process.versions.node;

if (isServer) {
  if (process.env.NODE_ENV === "production") {
    db = new PrismaClient({ adapter });
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        adapter,
        log: ["query", "info", "warn", "error"],
      });
    }
    db = global.prisma;
  }
}

export { db };
