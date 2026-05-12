const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    gender: { type: String, enum: ["Men", "Women", "Kids", "Unisex"] },
    countInStock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true, default: "Generic" },
    rating: { type: Number, default: 4.5 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    sale: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    delivery: {
      standard: { type: Number, default: 5 },
      express: { type: Number, default: 2 },
      overnight: { type: Number, default: 1 },
    },
    availableSizes: [{ type: String }],
    details: {
      material: String,
      color: String,
      weight: String,
      style: String,
    },
    reviews: [
      {
        name: { type: String, required: true },
        email: { type: String },
        rating: { type: Number, required: true, default: 5 },
        title: { type: String },
        comment: { type: String, required: true },
        images: [{ type: String }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
