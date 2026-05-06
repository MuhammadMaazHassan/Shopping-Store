const products = [
  {
    name: "Fresh Active Sneakers",
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    price: 79.99,
    countInStock: 25,
    brand: "Stride",
    rating: 4.8,
    numReviews: 190,
    description:
      "High-energy sporty sneakers designed for comfort and everyday performance.",
    featured: true,
  },
  {
    name: "Premium Leather Jacket",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=800&q=80",
    price: 149.99,
    countInStock: 18,
    brand: "Nova",
    rating: 4.9,
    numReviews: 142,
    description:
      "Classic leather jacket with a modern fit and superior softness.",
    featured: true,
  },
  {
    name: "Ultra Smart Watch",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    price: 169.99,
    countInStock: 30,
    brand: "Tempo",
    rating: 4.7,
    numReviews: 204,
    description:
      "Smart fitness watch with wellness tracking, calls, and sleep analytics.",
    featured: true,
  },
  {
    name: "Travel Backpack Pro",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    price: 69.99,
    countInStock: 28,
    brand: "Voyage",
    rating: 4.6,
    numReviews: 78,
    description:
      "Lightweight travel backpack with padded laptop sleeve and water-resistant body.",
    featured: true,
  },
  {
    name: "Wireless Noise Headphones",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=800&q=80",
    price: 99.99,
    countInStock: 21,
    brand: "Echo",
    rating: 4.8,
    numReviews: 148,
    description:
      "Premium over-ear headphones with advanced active noise cancellation.",
    featured: true,
  },
  {
    name: "Cozy Knit Sweater",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=800&q=80",
    price: 44.99,
    countInStock: 40,
    brand: "Luna",
    rating: 4.5,
    numReviews: 96,
    description:
      "Soft knitted sweater with a relaxed fit for year-round style.",
    featured: false,
  },
  {
    name: "Chef’s Choice Cookware Set",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1510626176961-4b29a4b4538f?auto=format&fit=crop&w=800&q=80",
    price: 129.99,
    countInStock: 15,
    brand: "Culina",
    rating: 4.7,
    numReviews: 62,
    description:
      "Complete nonstick cookware collection for effortless home cooking.",
    featured: false,
  },
  {
    name: "Premium Yoga Mat",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1f?auto=format&fit=crop&w=800&q=80",
    price: 39.99,
    countInStock: 36,
    brand: "ZenFlex",
    rating: 4.6,
    numReviews: 112,
    description:
      "Eco-friendly yoga mat with extra grip and cushioning for daily practice.",
    featured: false,
  },
  {
    name: "Luxury Bedding Bundle",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    price: 159.99,
    countInStock: 22,
    brand: "CloudSleep",
    rating: 4.9,
    numReviews: 88,
    description:
      "Complete bedding set with duvet cover, pillowcases, and premium sheets.",
    featured: false,
  },
  {
    name: "Kids Adventure Playset",
    category: "Kids",
    image:
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=800&q=80",
    price: 59.99,
    countInStock: 27,
    brand: "PlayJoy",
    rating: 4.6,
    numReviews: 44,
    description:
      "Creative playset for children with quality components and bright design.",
    featured: false,
  },
  {
    name: "Daily Essentials Bundle",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    price: 49.99,
    countInStock: 33,
    brand: "Glowday",
    rating: 4.8,
    numReviews: 58,
    description:
      "Skincare essentials bundle for glowing, refreshed skin every day.",
    featured: false,
  },
  {
    name: "Modern Minimalist Lamp",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    price: 54.99,
    countInStock: 14,
    brand: "Lume",
    rating: 4.6,
    numReviews: 43,
    description:
      "Contemporary table lamp with warm LED lighting for cozy rooms.",
    featured: false,
  },
  {
    name: "Wireless Charging Station",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1510552776732-43a83573995e?auto=format&fit=crop&w=800&q=80",
    price: 34.99,
    countInStock: 42,
    brand: "Pulse",
    rating: 4.7,
    numReviews: 76,
    description: "Fast charging station for phones, earbuds, and smartwatches.",
    featured: false,
  },
  {
    name: "Culinary Essentials Bundle",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1528690533407-8895a0b67784?auto=format&fit=crop&w=800&q=80",
    price: 89.99,
    countInStock: 20,
    brand: "HomeChef",
    rating: 4.7,
    numReviews: 52,
    description:
      "Curated kitchen essentials bundle for food lovers and home chefs.",
    featured: false,
  },
  {
    name: "Everyday Denim Jacket",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1523473827532-83d4e7d2fe09?auto=format&fit=crop&w=800&q=80",
    price: 89.99,
    countInStock: 12,
    brand: "Indigo",
    rating: 4.5,
    numReviews: 71,
    description:
      "Timeless denim jacket with a comfortable cut for all seasons.",
    featured: false,
  },
  {
    name: "Smart Home Speaker",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511456838797-8c0b01ae1b2f?auto=format&fit=crop&w=800&q=80",
    price: 79.99,
    countInStock: 35,
    brand: "Aura",
    rating: 4.7,
    numReviews: 144,
    description:
      "High-quality voice speaker with rich sound and intelligent assistant support.",
    featured: false,
  },
  {
    name: "Relaxation Candle Set",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    price: 29.99,
    countInStock: 44,
    brand: "Breathe",
    rating: 4.9,
    numReviews: 39,
    description: "Luxury scent candle collection designed for calm evenings.",
    featured: false,
  },
  {
    name: "Active Performance Tee",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    price: 29.99,
    countInStock: 46,
    brand: "ActiveLine",
    rating: 4.5,
    numReviews: 104,
    description:
      "Breathable performance tee built for comfort and everyday training.",
    featured: false,
  },
  {
    name: "Smart Kitchen Scale",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1510626176961-4b29a4b4538f?auto=format&fit=crop&w=800&q=80",
    price: 24.99,
    countInStock: 60,
    brand: "WeightWise",
    rating: 4.4,
    numReviews: 33,
    description:
      "Precision kitchen scale with app support for recipes and nutrition.",
    featured: false,
  },
  {
    name: "Daily Hydration Bottle",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    price: 19.99,
    countInStock: 80,
    brand: "PureFlow",
    rating: 4.6,
    numReviews: 61,
    description:
      "Insulated water bottle designed to keep drinks cold or hot for hours.",
    featured: false,
  },
  {
    name: "Travel Essentials Kit",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    price: 34.99,
    countInStock: 50,
    brand: "Waypoint",
    rating: 4.7,
    numReviews: 46,
    description:
      "Compact travel kit with organizers, adapters, and handy storage.",
    featured: false,
  },
];

module.exports = products;
