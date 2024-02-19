const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const db = new sqlite3.Database("mydatabase.db");

router.post("/", (req, res) => {
  // Handle login logic
  const { username, password } = req.body;

  // Retrieve user from the database
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Incorrect Username" });
    }

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Generate JWT token
      const token = jwt.sign({ username }, "jW+-$3cr3t-k39", {
        expiresIn: "1h",
      });
      res.json({ message: "Login successful", token });
    });
  });
});

module.exports = router;
