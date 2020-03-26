const auth = require("./auth");
const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
let token = "";

describe("testing auth endpoint", () => {
  beforeAll(done => {
    request
      .post("/auth")
      .send({ email: "benedykt@onet.pl", password: "konik12" })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
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
  test("should make correct get request and fetch user", async () => {
    const req = await request.get("/auth").set("x-auth-token", token);
    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty("name", "email", "date");
  });
});
