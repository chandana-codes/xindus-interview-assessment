const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const getWishlistItemsRoute = require("./routes/getWishListItemRoute");
const addWishlistItemRoute = require("./routes/postWishListItemRoute");
const deleteWishlistItemRoute = require("./routes/deleteWishListItemRoute");

const app = express();
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database("./wishlistitemdatabase.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database");
    // Create the WishlistItem table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS WishlistItem (
            productId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            itemId INTEGER PRIMARY KEY
        )`);
  }
});

// Pass the SQLite database connection to route handlers
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/wishlist/items", getWishlistItemsRoute);
app.use("/wishlist/items", addWishlistItemRoute);
app.use("/wishlist/items", deleteWishlistItemRoute);

const PORT = process.env.PORT || 3040;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
