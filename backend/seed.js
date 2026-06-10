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

const unsplashImages = {
  "Footwear": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80"
  ],
  "Apparel": [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=500&q=80"
  ],
  "Electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1605086366700-fd0d9cb371ab?auto=format&fit=crop&w=500&q=80"
  ],
  "Accessories": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1627124793833-28029ff5240c?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
  ],
  "Home": [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=500&q=80"
  ],
  "Fitness": [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?auto=format&fit=crop&w=500&q=80"
  ]
};

const generateProducts = () => {
  const products = [];
  categories.forEach((category) => {
    for (let i = 0; i < 22; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[category][Math.floor(Math.random() * nouns[category].length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const categoryImages = unsplashImages[category] || unsplashImages["Footwear"];
      const imgUrl = categoryImages[i % categoryImages.length];
      
      products.push({
        name: `${adj} ${noun} ${i + 1}`,
        description: `Experience the best with this ${adj.toLowerCase()} ${noun.toLowerCase()}. High quality materials and modern design.`,
        price: Number((Math.random() * 190 + 10).toFixed(2)),
        image: imgUrl,
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
