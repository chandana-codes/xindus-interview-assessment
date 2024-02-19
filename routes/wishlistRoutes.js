const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.checkToken); // Apply authentication middleware to all wishlist routes

router.get("/wishlists", wishlistController.getWishlist);
router.post("/wishlists", wishlistController.createWishlistItem);
router.delete("/wishlists/:id", wishlistController.deleteWishlistItem);

module.exports = router;
