const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true, default: "Generic" },
    rating: { type: Number, default: 4.5 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    delivery: {
      standard: { type: Number, default: 5 },
      express: { type: Number, default: 2 },
      overnight: { type: Number, default: 1 }
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
