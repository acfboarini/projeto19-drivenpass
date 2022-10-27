import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database.js";
import { clearDatabase } from "../factories/databaseScenarioFactory";
import { createUser } from "../factories/userFactory";

const agent = supertest(app);

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});
/* -------------------- SIGN UP  -----------------------*/ 

describe("testing signup...", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it("should create the user", async () => {
    const user = {
      email: "teste@gmail.com",
      password: "1234"
    }
    const result = await agent.post("/signup").send(user);
    expect(result.statusCode).toEqual(201);
    expect(result.body).not.toBeNull();
  });

  it("shouldn't create user. unprocessable entity", async () => {
    let result = await agent.post("/signup").send({ email: "teste@gmail.com" });
    expect(result.statusCode).toEqual(404);
    expect(result.body).toHaveProperty("error");

    result = await agent.post("/signup").send({ password: "1234" });
    expect(result.statusCode).toEqual(404);
    expect(result.body).toHaveProperty("error");

    result = await agent.post("/signup").send({});
    expect(result.statusCode).toEqual(404);
    expect(result.body).toHaveProperty("error");
  });

  it("shouldn't create user. conflict", async () => {
    const user = await createUser();
    const result = await agent.post("/signup").send(user);
    expect(result.statusCode).toEqual(409);
  });
});

/* -------------------- SIGN IN  -----------------------*/ 

describe("testing signin...", () => {
  beforeEach(async () => {
    await clearDatabase();
    await createUser();
  });

  it("user should login", async () => {
    const result = await agent.post("/signin").send({
      email: "teste@gmail.com",
      password: "1234"
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("token");
    expect(result.body).toHaveProperty("userId");
  });

  it("shuld can't find user", async () => {
    const result = await agent.post("/signin").send({ email: "teste@gmail.co", password: "1234" });
    expect(result.statusCode).toEqual(404);
  });

  it("shuldn't login because incorret password", async () => {
    const result = await agent.post("/signin").send({ email: "teste@gmail.com", password: "123" });
    expect(result.statusCode).toEqual(422);
  });

  it("shouldn't login. unprocessable entity", async () => {
    let result = await agent.post("/signin").send({ email: "teste@gmail.com" });
    expect(result.statusCode).toEqual(404);
    expect(result.body).toHaveProperty("error");

    result = await agent.post("/signin").send({ password: "1234" });
    expect(result.statusCode).toEqual(404);
    expect(result.body).toHaveProperty("error");

    result = await agent.post("/signin").send({});
    expect(result.statusCode).toEqual(404);
    expect(result.body).toHaveProperty("error");
  });
});

/* -------------------- SIGN OUT  -----------------------*/ 

describe("testing signout...", () => {
  let token = "";

  beforeEach(async () => {
    const user = await createUser();
    const result = await agent.post("/signin").send(user);
    token = result.body.token;
  });

  it ("should logout user", async () => {
    const result = await agent.delete("/signout").set({authorization: token});
    expect(result.statusCode).toEqual(201);
  });

  it("shouldn't logout user because token invalid or null", async () => {
    let result = await agent.delete("/signout").set({});
    expect(result.statusCode).toEqual(403);

    result = await agent.delete("/signout").set({authorization: null});
    expect(result.statusCode).toEqual(401);
  });
});
