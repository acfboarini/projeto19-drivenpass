import bcrypt from "bcrypt";
import { prisma } from "../../src/config/database.js";
import { faker } from "@faker-js/faker";

export async function createUser() {
  const email = faker.internet.email();
  const password = faker.internet.password();

  const userCreated = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password, 10)
    }
  });
  return {
    id: userCreated.id,
    email, 
    password
  };
}