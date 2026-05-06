import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { cartItems, shippingAddress } = req.body;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  return res.status(201).json({
    orderId: `ORDER-${Date.now()}`,
    total: cartItems.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    ),
    message: "Checkout complete. Delivery will arrive soon.",
    shippingAddress: shippingAddress || null,
  });
}
