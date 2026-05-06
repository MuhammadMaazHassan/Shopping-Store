export type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
  featured: boolean;
  delivery?: { standard: number; express: number; overnight: number };
  details?: { material?: string; color?: string; weight?: string };
};

const products: Product[] = []; // empty array as placeholder, will be fetched from backend

export default products;
