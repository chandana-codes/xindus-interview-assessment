const sqlite3 = require("sqlite3").verbose();

class WishlistItem {
  constructor(db) {
    this.db = db;
  }

  getAll(callback) {
    this.db.all("SELECT * FROM WishlistItem", callback);
  }

  add(item, callback) {
    this.db.run(
      "INSERT INTO WishlistItem (productId, userId, itemId) VALUES (?, ?, ?)",
      [item.productId, item.userId, item.itemId],
      callback
    );
  }

  remove(itemId, callback) {
    this.db.run(
      "DELETE FROM WishlistItem WHERE itemId = ?",
      [itemId],
      callback
    );
  }
}

module.exports = WishlistItem;
