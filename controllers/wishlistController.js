const wishlistService = require("../services/wishlistService");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request object after authentication
    const wishlist = await wishlistService.getWishlist(userId);
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWishlistItem = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request object after authentication
    const { item } = req.body;
    const newWishlistItem = await wishlistService.createWishlistItem(
      userId,
      item
    );
    res.json(newWishlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteWishlistItem = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request object after authentication
    const itemId = req.params.id;
    await wishlistService.deleteWishlistItem(userId, itemId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
