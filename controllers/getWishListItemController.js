const WishlistItem = require("../models/WishlistItem");

exports.getWishlistItems = (req, res) => {
  const wishlistItem = new WishlistItem(req.db);
  wishlistItem.getAll((err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};
