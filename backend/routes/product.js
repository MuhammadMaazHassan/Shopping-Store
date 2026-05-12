const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProductReview,
  seedProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/seed", seedProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", addProductReview);

module.exports = router;
