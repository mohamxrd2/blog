import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialisation de Prisma
export const db = globalThis.prisma || new PrismaClient();

// Assurez-vous de n'instancier Prisma qu'une seule fois en développement
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
