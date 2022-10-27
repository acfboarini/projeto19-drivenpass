import { prisma } from "../../src/config/database.js";

export async function clearDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE sessions CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE credentials CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE cards CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE notes CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE wifis CASCADE`;
}