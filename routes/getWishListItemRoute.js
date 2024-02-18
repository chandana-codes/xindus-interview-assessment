const express = require("express");
const router = express.Router();
const {
  addWishlistItem,
} = require("../controllers/postWishListItemController");

router.post("/", addWishlistItem);

module.exports = router;
