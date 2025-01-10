// lib/db.ts
import { PrismaClient } from "@prisma/client";


// Definir el tipo de `globalForPrisma` para TypeScript
declare const global: typeof globalThis & {
  prisma?: PrismaClient;
};

// Función para crear una instancia de PrismaClient
const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

// Acceder a `globalThis` y asegurar la tipificación
const globalForPrisma = global as typeof global & {
  prisma?: PrismaClient;
};

// Crear o reutilizar la instancia de PrismaClient
const prisma: PrismaClient = globalForPrisma.prisma ?? prismaClientSingleton();

// Exportar la instancia de PrismaClient
export default prisma;

// En producción, almacenar la instancia en `globalThis` para reutilización
if (process.env.NODE_ENV === 'production') {
  globalForPrisma.prisma = prisma;
}