import supertest from "supertest";
import app from "../../src/app.js";

export async function createUser() {
  const userData = {
    email: "teste@gmail.com",
    password: "1234"
  };
  await supertest(app).post("/signup").send(userData);
  return userData;
}