import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database.js";

export async function createSession(user) {
  const token = faker.random.alphaNumeric();
  const sessionData = {
    userId: user.id,
    token
  }
  await prisma.session.create({
    data: sessionData
  });
  return sessionData;
}