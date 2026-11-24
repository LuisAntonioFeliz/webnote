import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// El backend usa su propio entorno: se carga backend/.env a partir de la
// ubicación de este archivo, sin depender del directorio desde el que se
// ejecute el proceso. `override: false` hace que las variables ya definidas
// (por ejemplo, las del hosting en producción) tengan prioridad sobre el .env.
const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
config({ path: resolve(backendRoot, ".env"), override: false, quiet: true });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL no está definida. Configúrala en backend/.env o en las variables de entorno del servidor."
  );
}

// Instancia global de Prisma Client (evita abrir múltiples conexiones en
// desarrollo por el hot-reload).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: databaseUrl,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
