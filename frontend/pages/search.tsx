import { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import { type Product } from "../data/products";

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

const defaultSuggestions = [
  "Footwear",
  "Electronics",
  "Apparel",
  "Home",
  "Beauty",
  "New Arrivals",
  "Sale",
];

function SearchSkeleton({ count = pageSize }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="h-56 rounded-3xl bg-slate-100 dark:bg-slate-900" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const queryParam = Array.isArray(router.query.q)
    ? router.query.q[0]
    : router.query.q || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

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
      })
      .catch((err) => {
        console.error("Search load failed:", err);
        setError("Unable to load search results. Please try again later.");
        setProducts([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      const text = [
        product.name,
        product.brand,
        product.category,
        product.description,
        product.gender,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(normalizedQuery);
    });
  }, [products, normalizedQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingCount = filteredProducts.length - visibleProducts.length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const suggestionTerms = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const candidateValues = [
      ...categoryOptions,
      ...products.flatMap((product) => [
        product.name,
        product.brand,
        product.category,
      ]),
    ]
      .filter(Boolean)
      .map((value) => String(value).trim());

    const uniqueValues = Array.from(new Set(candidateValues));

    if (!normalizedQuery) {
      return defaultSuggestions;
    }

    const matches = uniqueValues.filter((term) =>
      term.toLowerCase().includes(normalizedQuery),
    );

    return matches.length > 0
      ? matches.slice(0, 10)
      : uniqueValues.slice(0, 10);
  }, [products, searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category === "All" ? "" : category);
    router.push(
      `/search?q=${encodeURIComponent(category === "All" ? "" : category)}`,
    );
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(filteredProducts.length, prev + pageSize),
    );
  };

  return (
    <>
      <Head>
        <title>Search | TechShed</title>
        <meta
          name="description"
          content="Search the store for products, brands, categories, and featured collections."
        />
      </Head>

      <main className="min-h-screen bg-bg pb-24 pt-10">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-sm px-6 py-8 dark:bg-slate-950 dark:border-slate-800 sm:px-10">
            <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
                  Search the store
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
                  {normalizedQuery
                    ? `Results for "${normalizedQuery}"`
                    : "Find the perfect product"}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  Search by product name, category, brand, or any keyword that
                  matters.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <label htmlFor="search" className="sr-only">
                  Search products
                </label>
                <div className="flex gap-3">
                  <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products, brands, categories..."
                    className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <button
                    type="submit"
                    className="rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
                  >
                    Search
                  </button>
                </div>

                {suggestionTerms.length > 0 && (
                  <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-muted dark:text-slate-400">
                      Suggestions
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {suggestionTerms.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                      category.toLowerCase() === normalizedQuery ||
                      (normalizedQuery === "" && category === "All")
                        ? "bg-brand-600 text-white"
                        : "bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            {isLoading ? (
              <SearchSkeleton />
            ) : error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-lg font-bold text-text dark:text-slate-100">
                  No results found
                </p>
                <p className="mt-3 text-sm text-muted dark:text-slate-400">
                  Try a different keyword, browse through categories, or explore
                  new arrivals.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Link
                    href="/category/All"
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Browse all products
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted dark:text-slate-400">
                      {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? "s" : ""} found
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-text dark:text-slate-100">
                      Search results
                    </h2>
                  </div>
                  {normalizedQuery && (
                    <p className="text-sm text-muted dark:text-slate-400">
                      Searching for{" "}
                      <span className="font-semibold text-text dark:text-slate-100">
                        "{normalizedQuery}"
                      </span>
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>

                {remainingCount > 0 && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
                    >
                      Load {Math.min(pageSize, remainingCount)} more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
