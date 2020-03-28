process.env.NODE_ENV = "test";
const axios = require("axios");
const auth = require("./auth");
const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const conn = require("../config/config");
let token = "";
let tokenReqStatus = null;

beforeAll(async () => {
  await conn.connectDB();
  const getToken = await request.post("/user").send({
    name: "benedykt",
    email: "benedykt@onet.pl",
    password: "123456"
  });
  token = JSON.parse(getToken.text).token;
  tokenReqStatus = getToken.status;
});
afterAll(async () => {
  await conn.close();
});
describe("testing auth endpoint", () => {
  test("should register user with status 200 and return token", async () => {
    await expect(tokenReqStatus).toBe(200);
  });
  test("api should be defined", () => {
    expect(auth).toBeDefined();
  });
  test("api get should return with 401 status without token", async () => {
    const req = await request.get("/auth");
    return await expect(req.status).toBe(401);
  });
  test("token should exist", () => {
    expect(token).toBeDefined();
  });
  test("token", async () => {
    expect(token).toBeTruthy();
  });
  test("should make correct get request and fetch user", async () => {
    const req = await request.get("/auth").set("x-auth-token", token);
    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty("name", "email", "date");
  });
});
