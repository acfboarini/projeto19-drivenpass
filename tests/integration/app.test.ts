import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database.js";
import { clearDatabase } from "../factories/databaseScenarioFactory.js";
import { createSession } from "../factories/sessionFactory";
import { createUser } from "../factories/userFactory.js";

const agent = supertest(app);

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
    expect(result.statusCode).toEqual(422);
    expect(result.clientError);

    result = await agent.post("/signup").send({ password: "1234" });
    expect(result.statusCode).toEqual(422);
    expect(result.clientError);

    result = await agent.post("/signup").send({});
    expect(result.statusCode).toEqual(422);
    expect(result.clientError);
  });

  it("shouldn't create user. conflict", async () => {
    const { email, password } = await createUser();
    const result = await agent.post("/signup").send({ email, password});
    expect(result.statusCode).toEqual(409);
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });
});

/* -------------------- SIGN IN  -----------------------*/ 

describe("testing signin...", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it("user should login", async () => {
    const { email, password } = await createUser();
    const result = await agent.post("/signin").send({ email, password });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("token");
    expect(result.body).toHaveProperty("userId");
  });

  it("should can't find user", async () => {
    const { email, password } = await createUser();
    const fakeEmail = "_" + email;
    const result = await agent.post("/signin").send({ email: fakeEmail, password });
    expect(result.statusCode).toEqual(404);
  });

  it("shuldn't login because incorret password", async () => {
    const { email } = await createUser();
    const result = await agent.post("/signin").send({ email, password: "senha_incorreta" });
    expect(result.statusCode).toEqual(401);
  });

  it("shouldn't login. unprocessable entity", async () => {
    let result = await agent.post("/signin").send({ email: "teste@gmail.com" });
    expect(result.statusCode).toEqual(422);
    expect(result.clientError);

    result = await agent.post("/signin").send({ password: "1234" });
    expect(result.statusCode).toEqual(422);
    expect(result.clientError);

    result = await agent.post("/signin").send({});
    expect(result.statusCode).toEqual(422);
    expect(result.clientError);
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });
});

/* -------------------- SIGN OUT  -----------------------*/ 

describe("testing signout...", () => {
  
  let token = "";
  beforeEach(async () => {
    await clearDatabase();
    const user = await createUser();
    const result = await createSession(user);
    token = result.token;
  });

  it ("should logout user", async () => {
  const result = await agent.delete("/signout").set({authorization: token});
    expect(result.statusCode).toEqual(200);
  });

  it("shouldn't logout user because token invalid or null", async () => {
    let result = await agent.delete("/signout").set({});
    expect(result.statusCode).toEqual(401);
    expect(result.text).toEqual("token not to be null");

    result = await agent.delete("/signout").set({authorization: null});
    expect(result.statusCode).toEqual(401);
    expect(result.text).toEqual("invalid token");
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });
});
