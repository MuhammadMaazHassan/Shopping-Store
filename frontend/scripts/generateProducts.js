const fs = require("fs");

const categories = [
  {
    name: "Footwear",
    brands: ["Stride", "Pulse", "Avenue", "Trail", "Velocity"],
    genders: ["Men", "Women", "Unisex"],
    images: [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Comfortable everyday footwear for walking, running, and style.",
  },
  {
    name: "Apparel",
    brands: ["Luna", "Nova", "Indigo", "Aura Lane", "Veloria"],
    genders: ["Men", "Women", "Unisex"],
    images: [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Premium apparel for every season with relaxed and tailored fits.",
  },
  {
    name: "Electronics",
    brands: ["Tempo", "Echo", "Aura", "SkyLens", "Nova Tech"],
    genders: ["Unisex"],
    images: [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Modern electronics that keep you connected, productive, and entertained.",
  },
  {
    name: "Home",
    brands: ["Lume", "CloudSleep", "Culina", "NestWorks", "HouseCraft"],
    genders: ["Unisex"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Home essentials crafted for modern living and effortless style.",
  },
  {
    name: "Beauty",
    brands: ["Breathe", "PureGlow", "VividSpa", "Serene", "Silka"],
    genders: ["Unisex"],
    images: [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Beauty and wellness products made for daily self-care and gifting.",
  },
  {
    name: "Food",
    brands: ["Tasteful", "BrewLab", "Harvest", "Savor", "Epicure"],
    genders: ["Unisex"],
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Gourmet food gifts, snack boxes, and kitchen staples delivered fast.",
  },
  {
    name: "Auto",
    brands: ["DrivePro", "ChargeDrive", "AutoSafe", "MotorEase", "RoadReady"],
    genders: ["Unisex"],
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Smart auto accessories built for safer, cleaner, and more comfortable travel.",
  },
  {
    name: "Fitness",
    brands: ["ZenFlex", "VitalFlow", "FitPrime", "CoreMotion", "PulseFit"],
    genders: ["Unisex"],
    images: [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Fitness gear designed for home workouts, recovery, and daily movement.",
  },
  {
    name: "Kids",
    brands: ["PlayJoy", "LittleLux", "TinyTrail", "BrightSteps", "WonderKid"],
    genders: ["Kids"],
    images: [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Playful kids products that bring color, comfort, and creative fun.",
  },
];

const availableSizes = ["XS", "S", "M", "L", "XL"];

function createProduct(category, index) {
  const brand = category.brands[index % category.brands.length];
  const gender = category.genders[index % category.genders.length];
  const image = category.images[index % category.images.length];
  const priceBase = 29.99 + index * 3;
  const price = Math.round((priceBase + (index % 5) * 7) * 100) / 100;
  const sale = index % 4 === 0;
  const newArrival = index % 6 === 0;
  const featured = index % 5 === 0;

  return {
    _id: `${category.name.toLowerCase()}-${String(index + 1).padStart(3, "0")}`,
    name: `${brand} ${category.name} ${index + 1}`,
    category: category.name,
    gender,
    image,
    images: [
      image,
      category.images[(index + 1) % category.images.length],
      category.images[(index + 2) % category.images.length],
    ],
    price,
    countInStock: 10 + ((index * 7) % 40),
    brand,
    rating: Math.round((4.2 + (index % 5) * 0.15) * 10) / 10,
    numReviews: 20 + ((index * 7) % 180),
    description: `${category.description} Crafted for everyday use with premium quality and standout design.`,
    featured,
    sale,
    newArrival,
    delivery: { standard: 3, express: 1, overnight: 0 },
    availableSizes:
      category.name === "Footwear" || category.name === "Apparel"
        ? availableSizes
        : undefined,
    details: {
      material:
        category.name === "Electronics"
          ? "Aluminum and glass"
          : category.name === "Home"
            ? "Premium composite"
            : category.name === "Beauty"
              ? "Skin-safe formula"
              : "Premium materials",
      color: index % 2 === 0 ? "Midnight" : "Soft white",
      style: "Modern",
      weight: category.name === "Auto" ? `${1 + (index % 6)} kg` : undefined,
    },
  };
}

const products = categories.flatMap((category) =>
  Array.from({ length: 20 }, (_, index) => createProduct(category, index)),
);

const output = `export type Product = {
  _id: string;
  name: string;
  category: string;
  gender?: "Men" | "Women" | "Kids" | "Unisex";
  image: string;
  images: string[];
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
  featured: boolean;
  sale?: boolean;
  newArrival?: boolean;
  delivery?: { standard: number; express: number; overnight: number };
  availableSizes?: string[];
  details?: {
    material?: string;
    color?: string;
    weight?: string;
    style?: string;
  };
};

const products: Product[] = ${JSON.stringify(products, null, 2)};

export default products;
`;

fs.writeFileSync("../data/products.ts", output, "utf-8");
console.log("Generated products.ts with", products.length, "products.");


