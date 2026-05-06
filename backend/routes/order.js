const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;
