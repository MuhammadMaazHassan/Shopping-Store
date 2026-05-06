const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  const order = new Order({
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "orderItems.product",
    "name image price",
  );
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  if (order.user._id.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }
  res.json(order);
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
};
