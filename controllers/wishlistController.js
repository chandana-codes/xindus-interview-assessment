const wishlistService = require("../services/wishlistService");

const wishlistController = [];

wishlistController.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await wishlistService.getWishlist(userId);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

wishlistController.createWishlistItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.body;
    const newWishlistItem = await wishlistService.createWishlistItem(
      userId,
      item
    );
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(newWishlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

wishlistController.deleteWishlistItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;
    await wishlistService.deleteWishlistItem(userId, itemId);
    res.setHeader("Content-Type", "application/json");
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = wishlistController;
