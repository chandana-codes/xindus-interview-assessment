const { faker } = require("@faker-js/faker");
const request = require("supertest");
const app = require("../app");

describe("Auth APIs", () => {
  it("POST /register should return 200 and give session token as a response", (done) => {
    request(app)
      .post("/register")
      .send({
        username: faker.internet.userName(),
        password: "testPassword001",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty("token");
      })
      .expect(200, done);
  });

  it("POST /login should return 200 and give session token as a response", (done) => {
    request(app)
      .post("/login")
      .send({ username: "aneshcodes001@gmail.com", password: "Anesh123" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("message", "Login successful");
      })
      .expect(200, done);
  });
});
