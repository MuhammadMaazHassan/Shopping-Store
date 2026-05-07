import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { type Product } from "../../data/products";
import { CartContext } from "../../contexts/CartContext";
import ProductCard from "../../components/ProductCard";

const categoryOptions = [
  "All",
  "Footwear",
  "Apparel",
  "Electronics",
  "Home",
  "Beauty",
  "Food",
  "Auto",
  "Fitness",
  "Kids",
  "New Arrivals",
  "Sale",
];

const pageSize = 8;

function normalizeCategory(category: string) {
  return category === "All" ? "All" : category;
}

function buildHeadline(category: string) {
  if (category === "New Arrivals") {
    return "New arrivals curated for you";
  }

  if (category === "Sale") {
    return "Hot deals and flash prices";
  }

  if (category === "All") {
    return "Browse the full collection";
  }

  return `${category} essentials and best sellers`;
}

const brandHighlights = [
  { title: "Stride", subtitle: "Footwear bestsellers" },
  { title: "Tempo", subtitle: "Electronics innovation" },
  { title: "Lume", subtitle: "Design-led home essentials" },
  { title: "Breathe", subtitle: "Beauty and wellness" },
];

export default function CategoryPage() {
  const router = useRouter();
  const categoryQuery = Array.isArray(router.query.category)
    ? router.query.category[0]
    : (router.query.category ?? "All");
  const selectedCategory = normalizeCategory(decodeURIComponent(categoryQuery));

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(true);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data ?? []);
        setIsLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }

    if (selectedCategory === "New Arrivals") {
      return products.filter((product) => product.newArrival);
    }

    if (selectedCategory === "Sale") {
      return products.filter((product) => product.sale);
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingCount = filteredProducts.length - visibleProducts.length;

  return (
    <>
      <Head>
        <title>{selectedCategory} products | Shopping Store</title>
        <meta
          name="description"
          content={`Browse ${selectedCategory} products with staged loading and curated recommendations.`}
        />
      </Head>

      <main className="min-h-screen bg-slate-50 pb-20">
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-700">
                  Category collection
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {selectedCategory}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  {buildHeadline(selectedCategory)}. Start with eight products
                  and load more as you browse.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-slate-50 hover:text-brand-700"
              >
                Back to home
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {categoryOptions.map((category) => {
                const isActive = category === selectedCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      router.push(`/category/${encodeURIComponent(category)}`)
                    }
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50 hover:text-brand-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {brandHighlights.map((brand) => (
              <div
                key={brand.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-brand-700">
                  {brand.title}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {brand.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  {filteredProducts.length} products found
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Explore the latest {selectedCategory.toLowerCase()} selection
                </h2>
              </div>
              <div className="rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600">
                Showing {visibleProducts.length} of {filteredProducts.length}
              </div>
            </div>

            <div className="mt-8">
              {isLoading ? (
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-16 text-center text-slate-500">
                  Loading product collection...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-16 text-center text-slate-500">
                  No products match this category yet.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={(product) => cartContext?.addToCart(product)}
                    />
                  ))}
                </div>
              )}
            </div>

            {remainingCount > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(filteredProducts.length, count + pageSize),
                    )
                  }
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                >
                  Load {Math.min(pageSize, remainingCount)} more
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
