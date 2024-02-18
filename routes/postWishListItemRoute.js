const express = require("express");
const router = express.Router();
const {
  getWishlistItems,
} = require("../controllers/getWishListItemController");

router.get("/", getWishlistItems);

module.exports = router;
