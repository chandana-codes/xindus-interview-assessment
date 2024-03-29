const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.checkToken);

router.get("/wishlists", wishlistController.getWishlist);
router.post("/wishlists", wishlistController.createWishlistItem);
router.delete("/wishlists/:id", wishlistController.deleteWishlistItem);

module.exports = router;
