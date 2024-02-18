const express = require("express");
const router = express.Router();
const {
  deleteWishlistItem,
} = require("../controllers/deleteWishListItemController");

router.delete("/:id", deleteWishlistItem);

module.exports = router;
