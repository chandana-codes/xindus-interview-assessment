const WishlistItem = require("../models/WishlistItem");

exports.deleteWishlistItem = (req, res) => {
  const wishlistItem = new WishlistItem(req.db);
  wishlistItem.remove(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Wishlist item removed successfully" });
  });
};
