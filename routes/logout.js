const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  // Handle logout logic
  res.json({ message: "Logout successful" });
});

module.exports = router;
