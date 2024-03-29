const db = require("../entities/database");

const wishlistService = {};

wishlistService.getWishlist = async (userId, token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secret_key", (err, decoded) => {
      if (err) {
        reject(err);
      }
      if (decoded.id !== userId) {
        reject(new Error("Unauthorized access"));
      }
      db.all(
        "SELECT * FROM wishlist WHERE userId = ?",
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  });
};

wishlistService.createWishlistItem = async (userId, item) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO wishlist (userId, item) VALUES (?, ?)",
      [userId, item],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, userId, item });
      }
    );
  });
};

wishlistService.deleteWishlistItem = async (userId, itemId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM wishlist WHERE id = ? AND userId = ?",
      [itemId, userId],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

module.exports = wishlistService;
