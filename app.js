const express = require("express");
const session = require("express-session");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const crypto = require("crypto");

const app = express();

app.use(express.json());

// Generate a random string of 64 characters
const generateRandomString = () => {
  return crypto.randomBytes(32).toString("hex");
};

const secretKey = generateRandomString();
// console.log("Generated secret key:", secretKey);

// Configure express-session middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);

module.exports = app;
