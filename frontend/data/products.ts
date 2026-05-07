export type Product = {
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

const products: Product[] = [
  {
    "_id": "footwear-001",
    "name": "Stride Footwear 1",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "Stride",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-002",
    "name": "Pulse Footwear 2",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "Pulse",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-003",
    "name": "Avenue Footwear 3",
    "category": "Footwear",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "Avenue",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-004",
    "name": "Trail Footwear 4",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "Trail",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-005",
    "name": "Velocity Footwear 5",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "Velocity",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-006",
    "name": "Stride Footwear 6",
    "category": "Footwear",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "Stride",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-007",
    "name": "Pulse Footwear 7",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "Pulse",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-008",
    "name": "Avenue Footwear 8",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "Avenue",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-009",
    "name": "Trail Footwear 9",
    "category": "Footwear",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "Trail",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-010",
    "name": "Velocity Footwear 10",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "Velocity",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-011",
    "name": "Stride Footwear 11",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "Stride",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-012",
    "name": "Pulse Footwear 12",
    "category": "Footwear",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "Pulse",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-013",
    "name": "Avenue Footwear 13",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "Avenue",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-014",
    "name": "Trail Footwear 14",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "Trail",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-015",
    "name": "Velocity Footwear 15",
    "category": "Footwear",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "Velocity",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-016",
    "name": "Stride Footwear 16",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "Stride",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-017",
    "name": "Pulse Footwear 17",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "Pulse",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-018",
    "name": "Avenue Footwear 18",
    "category": "Footwear",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "Avenue",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-019",
    "name": "Trail Footwear 19",
    "category": "Footwear",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "Trail",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "footwear-020",
    "name": "Velocity Footwear 20",
    "category": "Footwear",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519741490212-2d04f989f81e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600181955678-5c093b6d10e4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "Velocity",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Comfortable everyday footwear for walking, running, and style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-001",
    "name": "Luna Apparel 1",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "Luna",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-002",
    "name": "Nova Apparel 2",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "Nova",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-003",
    "name": "Indigo Apparel 3",
    "category": "Apparel",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "Indigo",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-004",
    "name": "Aura Lane Apparel 4",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "Aura Lane",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-005",
    "name": "Veloria Apparel 5",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "Veloria",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-006",
    "name": "Luna Apparel 6",
    "category": "Apparel",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "Luna",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-007",
    "name": "Nova Apparel 7",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "Nova",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-008",
    "name": "Indigo Apparel 8",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "Indigo",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-009",
    "name": "Aura Lane Apparel 9",
    "category": "Apparel",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "Aura Lane",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-010",
    "name": "Veloria Apparel 10",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "Veloria",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-011",
    "name": "Luna Apparel 11",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "Luna",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-012",
    "name": "Nova Apparel 12",
    "category": "Apparel",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "Nova",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-013",
    "name": "Indigo Apparel 13",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "Indigo",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-014",
    "name": "Aura Lane Apparel 14",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "Aura Lane",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-015",
    "name": "Veloria Apparel 15",
    "category": "Apparel",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "Veloria",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-016",
    "name": "Luna Apparel 16",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "Luna",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-017",
    "name": "Nova Apparel 17",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "Nova",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-018",
    "name": "Indigo Apparel 18",
    "category": "Apparel",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "Indigo",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-019",
    "name": "Aura Lane Apparel 19",
    "category": "Apparel",
    "gender": "Men",
    "image": "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "Aura Lane",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "apparel-020",
    "name": "Veloria Apparel 20",
    "category": "Apparel",
    "gender": "Women",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975910665-901b67cbb4b0?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "Veloria",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Premium apparel for every season with relaxed and tailored fits. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-001",
    "name": "Tempo Electronics 1",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "Tempo",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-002",
    "name": "Echo Electronics 2",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "Echo",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-003",
    "name": "Aura Electronics 3",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "Aura",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-004",
    "name": "SkyLens Electronics 4",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "SkyLens",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-005",
    "name": "Nova Tech Electronics 5",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "Nova Tech",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-006",
    "name": "Tempo Electronics 6",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "Tempo",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-007",
    "name": "Echo Electronics 7",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "Echo",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-008",
    "name": "Aura Electronics 8",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "Aura",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-009",
    "name": "SkyLens Electronics 9",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "SkyLens",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-010",
    "name": "Nova Tech Electronics 10",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "Nova Tech",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-011",
    "name": "Tempo Electronics 11",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "Tempo",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-012",
    "name": "Echo Electronics 12",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "Echo",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-013",
    "name": "Aura Electronics 13",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "Aura",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-014",
    "name": "SkyLens Electronics 14",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "SkyLens",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-015",
    "name": "Nova Tech Electronics 15",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "Nova Tech",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-016",
    "name": "Tempo Electronics 16",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "Tempo",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-017",
    "name": "Echo Electronics 17",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "Echo",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-018",
    "name": "Aura Electronics 18",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "Aura",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-019",
    "name": "SkyLens Electronics 19",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "SkyLens",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "electronics-020",
    "name": "Nova Tech Electronics 20",
    "category": "Electronics",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518441250852-a9d1a94a1d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "Nova Tech",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Modern electronics that keep you connected, productive, and entertained. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Aluminum and glass",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-001",
    "name": "Lume Home 1",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "Lume",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-002",
    "name": "CloudSleep Home 2",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "CloudSleep",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-003",
    "name": "Culina Home 3",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "Culina",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-004",
    "name": "NestWorks Home 4",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "NestWorks",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-005",
    "name": "HouseCraft Home 5",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "HouseCraft",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-006",
    "name": "Lume Home 6",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "Lume",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-007",
    "name": "CloudSleep Home 7",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "CloudSleep",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-008",
    "name": "Culina Home 8",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "Culina",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-009",
    "name": "NestWorks Home 9",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "NestWorks",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-010",
    "name": "HouseCraft Home 10",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "HouseCraft",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-011",
    "name": "Lume Home 11",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "Lume",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-012",
    "name": "CloudSleep Home 12",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "CloudSleep",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-013",
    "name": "Culina Home 13",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "Culina",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-014",
    "name": "NestWorks Home 14",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "NestWorks",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-015",
    "name": "HouseCraft Home 15",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "HouseCraft",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-016",
    "name": "Lume Home 16",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "Lume",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-017",
    "name": "CloudSleep Home 17",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "CloudSleep",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-018",
    "name": "Culina Home 18",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "Culina",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "home-019",
    "name": "NestWorks Home 19",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "NestWorks",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "home-020",
    "name": "HouseCraft Home 20",
    "category": "Home",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "HouseCraft",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Home essentials crafted for modern living and effortless style. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium composite",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-001",
    "name": "Breathe Beauty 1",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "Breathe",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-002",
    "name": "PureGlow Beauty 2",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "PureGlow",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-003",
    "name": "VividSpa Beauty 3",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "VividSpa",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-004",
    "name": "Serene Beauty 4",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "Serene",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-005",
    "name": "Silka Beauty 5",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "Silka",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-006",
    "name": "Breathe Beauty 6",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "Breathe",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-007",
    "name": "PureGlow Beauty 7",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "PureGlow",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-008",
    "name": "VividSpa Beauty 8",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "VividSpa",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-009",
    "name": "Serene Beauty 9",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "Serene",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-010",
    "name": "Silka Beauty 10",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "Silka",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-011",
    "name": "Breathe Beauty 11",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "Breathe",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-012",
    "name": "PureGlow Beauty 12",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "PureGlow",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-013",
    "name": "VividSpa Beauty 13",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "VividSpa",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-014",
    "name": "Serene Beauty 14",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "Serene",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-015",
    "name": "Silka Beauty 15",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "Silka",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-016",
    "name": "Breathe Beauty 16",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "Breathe",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-017",
    "name": "PureGlow Beauty 17",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "PureGlow",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-018",
    "name": "VividSpa Beauty 18",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "VividSpa",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-019",
    "name": "Serene Beauty 19",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "Serene",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "beauty-020",
    "name": "Silka Beauty 20",
    "category": "Beauty",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495088398822-3a95a61477fb?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "Silka",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Beauty and wellness products made for daily self-care and gifting. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Skin-safe formula",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-001",
    "name": "Tasteful Food 1",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "Tasteful",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-002",
    "name": "BrewLab Food 2",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "BrewLab",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-003",
    "name": "Harvest Food 3",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "Harvest",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-004",
    "name": "Savor Food 4",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "Savor",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-005",
    "name": "Epicure Food 5",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "Epicure",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-006",
    "name": "Tasteful Food 6",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "Tasteful",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-007",
    "name": "BrewLab Food 7",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "BrewLab",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-008",
    "name": "Harvest Food 8",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "Harvest",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-009",
    "name": "Savor Food 9",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "Savor",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-010",
    "name": "Epicure Food 10",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "Epicure",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-011",
    "name": "Tasteful Food 11",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "Tasteful",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-012",
    "name": "BrewLab Food 12",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "BrewLab",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-013",
    "name": "Harvest Food 13",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "Harvest",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-014",
    "name": "Savor Food 14",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "Savor",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-015",
    "name": "Epicure Food 15",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "Epicure",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-016",
    "name": "Tasteful Food 16",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "Tasteful",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-017",
    "name": "BrewLab Food 17",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "BrewLab",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-018",
    "name": "Harvest Food 18",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "Harvest",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "food-019",
    "name": "Savor Food 19",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "Savor",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "food-020",
    "name": "Epicure Food 20",
    "category": "Food",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "Epicure",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Gourmet food gifts, snack boxes, and kitchen staples delivered fast. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "auto-001",
    "name": "DrivePro Auto 1",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "DrivePro",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "1 kg"
    }
  },
  {
    "_id": "auto-002",
    "name": "ChargeDrive Auto 2",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "ChargeDrive",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "2 kg"
    }
  },
  {
    "_id": "auto-003",
    "name": "AutoSafe Auto 3",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "AutoSafe",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "3 kg"
    }
  },
  {
    "_id": "auto-004",
    "name": "MotorEase Auto 4",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "MotorEase",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "4 kg"
    }
  },
  {
    "_id": "auto-005",
    "name": "RoadReady Auto 5",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "RoadReady",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "5 kg"
    }
  },
  {
    "_id": "auto-006",
    "name": "DrivePro Auto 6",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "DrivePro",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "6 kg"
    }
  },
  {
    "_id": "auto-007",
    "name": "ChargeDrive Auto 7",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "ChargeDrive",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "1 kg"
    }
  },
  {
    "_id": "auto-008",
    "name": "AutoSafe Auto 8",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "AutoSafe",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "2 kg"
    }
  },
  {
    "_id": "auto-009",
    "name": "MotorEase Auto 9",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "MotorEase",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "3 kg"
    }
  },
  {
    "_id": "auto-010",
    "name": "RoadReady Auto 10",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "RoadReady",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "4 kg"
    }
  },
  {
    "_id": "auto-011",
    "name": "DrivePro Auto 11",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "DrivePro",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "5 kg"
    }
  },
  {
    "_id": "auto-012",
    "name": "ChargeDrive Auto 12",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "ChargeDrive",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "6 kg"
    }
  },
  {
    "_id": "auto-013",
    "name": "AutoSafe Auto 13",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "AutoSafe",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "1 kg"
    }
  },
  {
    "_id": "auto-014",
    "name": "MotorEase Auto 14",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "MotorEase",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "2 kg"
    }
  },
  {
    "_id": "auto-015",
    "name": "RoadReady Auto 15",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "RoadReady",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "3 kg"
    }
  },
  {
    "_id": "auto-016",
    "name": "DrivePro Auto 16",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "DrivePro",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "4 kg"
    }
  },
  {
    "_id": "auto-017",
    "name": "ChargeDrive Auto 17",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "ChargeDrive",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "5 kg"
    }
  },
  {
    "_id": "auto-018",
    "name": "AutoSafe Auto 18",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "AutoSafe",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "6 kg"
    }
  },
  {
    "_id": "auto-019",
    "name": "MotorEase Auto 19",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "MotorEase",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern",
      "weight": "1 kg"
    }
  },
  {
    "_id": "auto-020",
    "name": "RoadReady Auto 20",
    "category": "Auto",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "RoadReady",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Smart auto accessories built for safer, cleaner, and more comfortable travel. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern",
      "weight": "2 kg"
    }
  },
  {
    "_id": "fitness-001",
    "name": "ZenFlex Fitness 1",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "ZenFlex",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-002",
    "name": "VitalFlow Fitness 2",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "VitalFlow",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-003",
    "name": "FitPrime Fitness 3",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "FitPrime",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-004",
    "name": "CoreMotion Fitness 4",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "CoreMotion",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-005",
    "name": "PulseFit Fitness 5",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "PulseFit",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-006",
    "name": "ZenFlex Fitness 6",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "ZenFlex",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-007",
    "name": "VitalFlow Fitness 7",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "VitalFlow",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-008",
    "name": "FitPrime Fitness 8",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "FitPrime",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-009",
    "name": "CoreMotion Fitness 9",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "CoreMotion",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-010",
    "name": "PulseFit Fitness 10",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "PulseFit",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-011",
    "name": "ZenFlex Fitness 11",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "ZenFlex",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-012",
    "name": "VitalFlow Fitness 12",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "VitalFlow",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-013",
    "name": "FitPrime Fitness 13",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "FitPrime",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-014",
    "name": "CoreMotion Fitness 14",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "CoreMotion",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-015",
    "name": "PulseFit Fitness 15",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "PulseFit",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-016",
    "name": "ZenFlex Fitness 16",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "ZenFlex",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-017",
    "name": "VitalFlow Fitness 17",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "VitalFlow",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-018",
    "name": "FitPrime Fitness 18",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "FitPrime",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-019",
    "name": "CoreMotion Fitness 19",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "CoreMotion",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "fitness-020",
    "name": "PulseFit Fitness 20",
    "category": "Fitness",
    "gender": "Unisex",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524578271613-327f5706f676?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11b1f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "PulseFit",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Fitness gear designed for home workouts, recovery, and daily movement. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-001",
    "name": "PlayJoy Kids 1",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 29.99,
    "countInStock": 10,
    "brand": "PlayJoy",
    "rating": 4.2,
    "numReviews": 20,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-002",
    "name": "LittleLux Kids 2",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 39.99,
    "countInStock": 17,
    "brand": "LittleLux",
    "rating": 4.4,
    "numReviews": 27,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-003",
    "name": "TinyTrail Kids 3",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 49.99,
    "countInStock": 24,
    "brand": "TinyTrail",
    "rating": 4.5,
    "numReviews": 34,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-004",
    "name": "BrightSteps Kids 4",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 31,
    "brand": "BrightSteps",
    "rating": 4.7,
    "numReviews": 41,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-005",
    "name": "WonderKid Kids 5",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 38,
    "brand": "WonderKid",
    "rating": 4.8,
    "numReviews": 48,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-006",
    "name": "PlayJoy Kids 6",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 44.99,
    "countInStock": 45,
    "brand": "PlayJoy",
    "rating": 4.2,
    "numReviews": 55,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-007",
    "name": "LittleLux Kids 7",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 54.99,
    "countInStock": 12,
    "brand": "LittleLux",
    "rating": 4.4,
    "numReviews": 62,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-008",
    "name": "TinyTrail Kids 8",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 64.99,
    "countInStock": 19,
    "brand": "TinyTrail",
    "rating": 4.5,
    "numReviews": 69,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-009",
    "name": "BrightSteps Kids 9",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 26,
    "brand": "BrightSteps",
    "rating": 4.7,
    "numReviews": 76,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-010",
    "name": "WonderKid Kids 10",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 33,
    "brand": "WonderKid",
    "rating": 4.8,
    "numReviews": 83,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-011",
    "name": "PlayJoy Kids 11",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 59.99,
    "countInStock": 40,
    "brand": "PlayJoy",
    "rating": 4.2,
    "numReviews": 90,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-012",
    "name": "LittleLux Kids 12",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 69.99,
    "countInStock": 47,
    "brand": "LittleLux",
    "rating": 4.4,
    "numReviews": 97,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-013",
    "name": "TinyTrail Kids 13",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 79.99,
    "countInStock": 14,
    "brand": "TinyTrail",
    "rating": 4.5,
    "numReviews": 104,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-014",
    "name": "BrightSteps Kids 14",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 89.99,
    "countInStock": 21,
    "brand": "BrightSteps",
    "rating": 4.7,
    "numReviews": 111,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-015",
    "name": "WonderKid Kids 15",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 99.99,
    "countInStock": 28,
    "brand": "WonderKid",
    "rating": 4.8,
    "numReviews": 118,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-016",
    "name": "PlayJoy Kids 16",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 74.99,
    "countInStock": 35,
    "brand": "PlayJoy",
    "rating": 4.2,
    "numReviews": 125,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": true,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-017",
    "name": "LittleLux Kids 17",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 84.99,
    "countInStock": 42,
    "brand": "LittleLux",
    "rating": 4.4,
    "numReviews": 132,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": true,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-018",
    "name": "TinyTrail Kids 18",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 94.99,
    "countInStock": 49,
    "brand": "TinyTrail",
    "rating": 4.5,
    "numReviews": 139,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-019",
    "name": "BrightSteps Kids 19",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 104.99,
    "countInStock": 16,
    "brand": "BrightSteps",
    "rating": 4.7,
    "numReviews": 146,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": true,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Midnight",
      "style": "Modern"
    }
  },
  {
    "_id": "kids-020",
    "name": "WonderKid Kids 20",
    "category": "Kids",
    "gender": "Kids",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542223616-7b40fedd3369?auto=format&fit=crop&w=900&q=80"
    ],
    "price": 114.99,
    "countInStock": 23,
    "brand": "WonderKid",
    "rating": 4.8,
    "numReviews": 153,
    "description": "Playful kids products that bring color, comfort, and creative fun. Crafted for everyday use with premium quality and standout design.",
    "featured": false,
    "sale": false,
    "newArrival": false,
    "delivery": {
      "standard": 3,
      "express": 1,
      "overnight": 0
    },
    "details": {
      "material": "Premium materials",
      "color": "Soft white",
      "style": "Modern"
    }
  }
];

export default products;
