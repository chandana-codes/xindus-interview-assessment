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

  it("POST /logout should return 200 and a success message", (done) => {
    request(app)
      .post("/logout")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty("message", "Logout successful");
      })
      .expect(200, done);
  });

  it("POST /signup should return 200 and give session token as a response", (done) => {
    request(app)
      .post("/signup")
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

  it("GET /wishlist should return 200 and an array of wishlist items", (done) => {
    request(app)
      .get("/wishlist")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("items");
        expect(Array.isArray(res.body.items)).toBe(true);
      })
      .expect(200, done);
  });

  it("POST /wishlist should return 201 and the created wishlist item", (done) => {
    request(app)
      .post("/wishlist")
      .send({
        item: "New wishlist item",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("item", "New wishlist item");
      })
      .expect(201, done);
  });
});
