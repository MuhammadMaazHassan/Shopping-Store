import { useContext, useEffect, useMemo, useState, useCallback } from "react";
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
  if (category === "New Arrivals") return "Fresh drops — just landed";
  if (category === "Sale") return "Limited prices, unlimited style";
  if (category === "All") return "Every product, one seamless view";
  return `Discover the finest ${category.toLowerCase()} selection`;
}

const brandHighlights = [
  { title: "Stride", subtitle: "Footwear bestsellers", icon: "👟" },
  { title: "Tempo", subtitle: "Electronics innovation", icon: "💡" },
  { title: "Lume", subtitle: "Design-led home essentials", icon: "🏠" },
  { title: "Breathe", subtitle: "Beauty & wellness", icon: "🌸" },
];

// Skeleton Loader (animated)
function ProductGridSkeleton({ count = pageSize }: { count: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="aspect-square w-full rounded-xl bg-slate-100 dark:bg-slate-700" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-700" />
            <div className="h-4 w-1/2 rounded bg-slate-100 dark:bg-slate-700" />
            <div className="h-6 w-1/3 rounded bg-slate-100 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const router = useRouter();
  const categoryQuery = Array.isArray(router.query.category)
    ? router.query.category[0]
    : (router.query.category ?? "All");
  const selectedCategory = normalizeCategory(decodeURIComponent(categoryQuery));

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cartContext = useContext(CartContext);

  // Fetch products (identical to your original)
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please refresh or try again later.");
        setProducts([]);
        setIsLoading(false);
      });
  }, []);

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [selectedCategory]);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory]);

  // Filter products (identical logic)
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    if (selectedCategory === "New Arrivals")
      return products.filter((product) => product.newArrival === true);
    if (selectedCategory === "Sale")
      return products.filter((product) => product.sale === true);
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingCount = filteredProducts.length - visibleProducts.length;

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(filteredProducts.length, prev + pageSize),
      );
      setIsLoadingMore(false);
    }, 300);
  }, [filteredProducts.length]);

  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Still having trouble. Please check your connection.");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>{selectedCategory} | Modern Store</title>
        <meta
          name="description"
          content={`Shop the ${selectedCategory.toLowerCase()} collection. Staged loading, curated picks & fast checkout.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24 dark:from-slate-950 dark:to-slate-900">
        {/* Hero + Category chips */}
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-600 dark:text-brand-400">
                  Curated collection
                </p>
                <h1 className="mt-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent dark:from-slate-100 dark:to-slate-300 sm:text-4xl">
                  {selectedCategory}
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {buildHeadline(selectedCategory)}. Smart pagination, smooth
                  browsing — start with eight products and expand as you go.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-brand-200 hover:bg-slate-50 hover:text-brand-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-600 dark:hover:bg-slate-700"
              >
                ← Back to home
              </Link>
            </div>

            {/* Category filters - horizontal scroll on mobile */}
            <div className="mt-8">
              <div className="flex overflow-x-auto pb-3 md:flex-wrap md:overflow-visible md:pb-0">
                <div className="flex min-w-max gap-2 md:min-w-0 md:flex-wrap">
                  {categoryOptions.map((category) => {
                    const isActive = category === selectedCategory;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          router.push(
                            `/category/${encodeURIComponent(category)}`,
                          )
                        }
                        aria-pressed={isActive}
                        className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                          isActive
                            ? "bg-brand-600 text-white shadow-md shadow-brand-200 dark:bg-brand-500 dark:shadow-brand-800"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-slate-700"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Highlights */}
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {brandHighlights.map((brand) => (
              <div
                key={brand.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{brand.icon}</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">
                      {brand.title}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                      {brand.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product listing */}
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {error
                    ? "⚠️ Connection issue"
                    : isLoading
                      ? "Loading collection"
                      : `${filteredProducts.length} products found`}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {isLoading
                    ? "Preparing your selection"
                    : error
                      ? "Something went wrong"
                      : `Latest ${selectedCategory.toLowerCase()}`}
                </h2>
              </div>
              {!isLoading && !error && (
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Showing {visibleProducts.length} of {filteredProducts.length}
                </div>
              )}
            </div>

            <div className="mt-8">
              {error ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-12 text-center dark:border-red-800 dark:bg-red-950/30">
                  <p className="text-red-700 dark:text-red-400">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-4 rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                  >
                    Try again
                  </button>
                </div>
              ) : isLoading ? (
                <ProductGridSkeleton count={pageSize} />
              ) : filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-16 text-center dark:border-slate-800 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400">
                    No products match {selectedCategory.toLowerCase()} yet.
                  </p>
                  <Link
                    href="/category/All"
                    className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                  >
                    Explore all products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                    {visibleProducts.map((product, idx) => (
                      <div
                        key={product._id}
                        className="animate-fadeInUp"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={(prod) => cartContext?.addToCart(prod)}
                        />
                      </div>
                    ))}
                  </div>

                  {remainingCount > 0 && (
                    <div className="mt-12 flex justify-center">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="inline-flex transform items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoadingMore ? (
                          <>
                            <svg
                              className="h-4 w-4 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Loading...
                          </>
                        ) : (
                          `Load ${Math.min(pageSize, remainingCount)} more product${
                            Math.min(pageSize, remainingCount) > 1 ? "s" : ""
                          }`
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}
