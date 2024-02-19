const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const db = new sqlite3.Database("mydatabase.db");

router.post("/", (req, res) => {
  // Handle registration logic
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (user) {
      return res.status(401).json({ error: "Username already taken." });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Store the user in the database
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // Create JWT token
          const token = jwt.sign(
            { username: username },
            "your_secret_key_here"
          );

          res.status(200).json({ token: token });
        }
      );
    });
  });
});

module.exports = router;
