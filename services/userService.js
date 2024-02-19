const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../entities/database");

const userService = {};

userService.createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, username });
      }
    );
  });
};

userService.login = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, row) => {
        if (err) {
          reject(err);
        }
        if (!row) {
          reject(new Error("User not found"));
        }
        const isPasswordValid = await bcrypt.compare(password, row.password);
        if (!isPasswordValid) {
          reject(new Error("Invalid password"));
        }
        const token = jwt.sign(
          { id: row.id, username: row.username },
          "secret_key"
        );
        resolve(token);
      }
    );
  });
};

module.exports = userService;
