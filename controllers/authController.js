const userService = require("../services/userService");

const authController = {};

authController.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

authController.logout = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = authController;
