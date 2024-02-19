const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api", wishlistRoutes);

const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
