const userService = require("../services/userService");

const authController = {};

authController.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json(err.message);
  }
};

authController.logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

module.exports = authController;
