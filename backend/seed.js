const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const categories = ["Footwear", "Apparel", "Electronics", "Accessories", "Home", "Fitness"];
const adjectives = ["Premium", "Essential", "Modern", "Classic", "Pro", "Ultra", "Smart", "Eco", "Urban", "Minimal"];
const nouns = {
  "Footwear": ["Sneakers", "Boots", "Running Shoes", "Sandals", "Loafers", "Trainers"],
  "Apparel": ["T-Shirt", "Jacket", "Jeans", "Hoodie", "Shorts", "Sweater"],
  "Electronics": ["Headphones", "Speaker", "Charger", "Webcam", "Keyboard", "Mouse"],
  "Accessories": ["Backpack", "Wallet", "Sunglasses", "Cap", "Watch Strap", "Scarf"],
  "Home": ["Lamp", "Bedding Set", "Pillow", "Storage", "Coffee Maker", "Desk"],
  "Fitness": ["Yoga Mat", "Dumbbell", "Resistance Band", "Treadmill", "Kettlebell", "Foam Roller"]
};
const brands = ["SpeedRun", "UrbanStyle", "TechGear", "HomeDecor", "FitLife", "WonderStore"];

const generateProducts = () => {
  const products = [];
  categories.forEach((category) => {
    for (let i = 0; i < 22; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[category][Math.floor(Math.random() * nouns[category].length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      products.push({
        name: `${adj} ${noun} ${i + 1}`,
        description: `Experience the best with this ${adj.toLowerCase()} ${noun.toLowerCase()}. High quality materials and modern design.`,
        price: Number((Math.random() * 190 + 10).toFixed(2)),
        image: `https://picsum.photos/seed/${category}${i}/500/500`,
        category: category,
        brand: brand,
        countInStock: Math.floor(Math.random() * 150) + 10,
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        numReviews: Math.floor(Math.random() * 800),
        featured: Math.random() > 0.85,
        delivery: {
          standard: Math.floor(Math.random() * 3) + 3,
          express: 2,
          overnight: 1
        }
      });
    }
  });
  return products;
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected.");
    await Product.deleteMany({});
    console.log("Cleared existing products.");
    const products = generateProducts();
    await Product.insertMany(products);
    console.log("Seeded " + products.length + " products automatically.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed", err);
    process.exit(1);
  });
