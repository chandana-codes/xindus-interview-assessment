const WishlistItem = require("../models/WishlistItem");

exports.addWishlistItem = (req, res) => {
  const wishlistItem = new WishlistItem(req.db);
  wishlistItem.add(req.body, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Wishlist item added successfully" });
  });
};
