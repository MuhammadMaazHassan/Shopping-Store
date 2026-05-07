import { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type Product } from "../data/products";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

const categoryOptions = [
  "All",
  "Footwear",
  "Apparel",
  "Electronics",
  "Home",
  "Beauty",
  "Fitness",
  "Kids",
  "Auto",
  "Food",
  "New Arrivals",
  "Sale",
];

const heroHighlights = [
  {
    title: "Global shipping",
    subtitle: "Fast, reliable delivery to customers around the world.",
  },
  {
    title: "Curated collections",
    subtitle:
      "Each section is stocked with 25+ products and curated brand favorites.",
  },
  {
    title: "Secure checkout",
    subtitle:
      "Encrypted payments and trusted order tracking for every purchase.",
  },
];

const brandPartners = [
  { name: "Stride", caption: "Footwear innovators" },
  { name: "Tempo", caption: "Wearable technology" },
  { name: "Lume", caption: "Home lighting" },
  { name: "Breathe", caption: "Beauty essentials" },
  { name: "DrivePro", caption: "Auto accessories" },
];

export default function Home() {
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const navigateCategory = (category: string) => {
    router.push(`/category/${encodeURIComponent(category)}`);
  };

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).slice(0, 6),
    [products],
  );

  const newArrivals = useMemo(
    () => products.filter((product) => product.newArrival).slice(0, 6),
    [products],
  );

  const handleAddToCart = (product: Product) => {
    cartContext?.addToCart(product);
  };

  return (
    <>
      <Head>
        <title>
          WonderCart | Global shopping for fashion, home, electronics, and more
        </title>
        <meta
          name="description"
          content="WonderCart is a worldwide e-commerce showcase for footwear, apparel, electronics, home, beauty, food, and auto essentials. Shop trending collections, limited-time deals, and fast delivery."
        />
        <meta
          name="keywords"
          content="shopping, ecommerce, online store, footwear, apparel, electronics, home decor, food, auto accessories"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "WonderCart",
              url: "https://your-store-url.example",
              logo: "https://your-store-url.example/logo.png",
              description:
                "A global shopping destination for fashion, electronics, home goods, food, and automotive essentials.",
              openingHours: "24/7",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Worldwide",
                addressCountry: "Global",
              },
            }),
          }}
        />
      </Head>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                <span>Every category contains 25+ products</span>
              </div>
              <div className="max-w-xl space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  A modern shopping experience for every curated category.
                </h1>
                <p className="text-lg leading-8 text-slate-300">
                  Browse footwear, apparel, electronics, home, beauty, fitness,
                  and more in dedicated pages built for clean discovery and
                  professional buying confidence.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigateCategory("All")}
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
                >
                  Browse all categories
                </button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 backdrop-blur-sm shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                      {product.category}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {product.brand}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="rounded-[2rem] bg-slate-50 p-8 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-700">
                Shop by section
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                One menu for every category.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Select a category from the menu below and explore a focused
                collection with 25+ curated products and clean browsing.
              </p>
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => navigateCategory(selectedCategory)}
                className="ml-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Go to {selectedCategory}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {brandPartners.map((brand, index) => (
            <div
              key={brand.name}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-lg font-semibold text-slate-900">
                {brand.name}
              </p>
              <p className="mt-2 text-sm text-slate-500">{brand.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="rounded-[2rem] bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-purple-200">
                New arrivals
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Fresh picks just landed
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-purple-100">
                Discover the latest additions to our collection with exclusive
                deals and limited-time offers.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {newArrivals.slice(0, 3).map((product, index) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 pb-20">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                Popular picks
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Trending products for every shop page
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Browse top sellers, flash favorites, and seasonal essentials with
              clean, professional product cards.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {newArrivals.map((product, index) => (
              <div
                key={product._id}
                className="transition duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
