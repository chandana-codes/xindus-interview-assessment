const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api", wishlistRoutes);

module.exports = app;
