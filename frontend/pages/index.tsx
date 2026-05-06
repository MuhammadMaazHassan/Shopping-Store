import { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { type Product } from "../data/products";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

const categories = [
  "All",
  "Footwear",
  "Apparel",
  "Electronics",
  "Accessories",
  "Home",
  "Fitness",
];

export default function Home() {
  const cartContext = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = useMemo(() => {
    return activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).slice(0, 2),
    [products],
  );

  const handleAddToCart = (product: Product) => {
    cartContext?.addToCart(product);
  };

  return (
    <>
      <Head>
        <title>WonderCart | White & Green Shopping Experience</title>
        <meta
          name="description"
          content="WonderCart is a modern white and green themed shopping store built with Next.js and Tailwind CSS. Browse premium categories, view product details, and manage your cart."
        />
      </Head>

      <section className="rounded-[2rem] border border-slate-200 bg-white/90 px-6 py-14 shadow-glow sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.32em] text-brand-700">
                modern essentials
              </span>
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  A beautiful shopping store built for every need.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Discover curated products, powerful bundles, and a seamless
                  checkout flow in a bright white and green theme.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700"
                >
                  Browse products
                </a>
                <a
                  href="#collections"
                  className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-white px-7 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  Explore bundles
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {featuredProducts.map((product) => (
                  <article
                    key={product._id}
                    className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full rounded-[1.5rem] object-cover"
                    />
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">
                        {product.category}
                      </p>
                      <h2 className="mt-3 text-lg font-semibold text-slate-900">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {product.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="shop"
        className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-700">
              Live store
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Browse hundreds of products by category.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <section
        id="collections"
        className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              title: "Essential bundles",
              description:
                "Hand-selected bundles for daily work, fitness, and home comfort.",
              color: "bg-brand-50",
            },
            {
              title: "Green lifestyle",
              description:
                "Eco-friendly and wellness-focused products for modern life.",
              color: "bg-emerald-50",
            },
            {
              title: "Fast delivery",
              description: "Quick shipping and easy tracking for every order.",
              color: "bg-slate-50",
            },
          ].map((bundle) => (
            <div
              key={bundle.title}
              className={`overflow-hidden rounded-[1.75rem] border border-slate-200 ${bundle.color} p-8 shadow-sm`}
            >
              <h3 className="text-2xl font-semibold text-slate-900">
                {bundle.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {bundle.description}
              </p>
              <button className="mt-8 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
                Shop bundle
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Trusted payments",
              description:
                "Secure checkout with card and wallet options for every customer.",
            },
            {
              title: "Healthy deals",
              description:
                "Curated categories for fitness, home, beauty, and everyday essentials.",
            },
            {
              title: "Customer support",
              description:
                "Friendly help available around the clock for any order needs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
