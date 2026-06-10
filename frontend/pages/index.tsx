import Link from "next/link";
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type Product } from "../data/products";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import ProductImageFallback from "../components/ProductImageFallback";

const SafeSpotlightImage = ({ product }: { product: Product }) => {
  const [imageError, setImageError] = useState(false);
  return !imageError && product.image ? (
    <img
      src={product.image}
      alt={product.name}
      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
      onError={() => setImageError(true)}
    />
  ) : (
    <ProductImageFallback
      category={product.category}
      name={product.name}
      className="h-full w-full"
    />
  );
};

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
    title: "Free Shipping",
    subtitle: "On all shopping orders over $50 worldwide.",
    icon: "🚚",
  },
  {
    title: "24/7 Support",
    subtitle:
      "Connect with our certified electronics support technicians anytime.",
    icon: "💬",
  },
  {
    title: "Secure checkout",
    subtitle:
      "Encrypted SSL protocols and trusted payment gateways for every buy.",
    icon: "💳",
  },
];

const brandPartners = [
  { name: "Tempo", caption: "Wearable technology" },
  { name: "TechGear", caption: "Drones & cameras" },
  { name: "Lume", caption: "Smart home lights" },
  { name: "Breathe", caption: "Air purifiers" },
  { name: "DrivePro", caption: "Car electronics" },
];

const testimonials = [
  {
    name: "Sophia Chen",
    role: "System Designer",
    text: "TechShed's curated computer and audio selections made upgrading my office setup effortless. The smartwatch shipping was lightning fast.",
    rating: 5,
  },
  {
    name: "Marcus Lee",
    role: "Tech Enthusiast",
    text: "The headphone and TV systems are well organized. Love the real-time product filters and highly detailed specifications.",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "Home Architect",
    text: "Stunning smart home and drone catalog – exactly the premium quality products I wanted for my smart house automation.",
    rating: 5,
  },
];

// Custom hook for scroll‑reveal animations
const useScrollReveal = () => {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delay
            const delay = index * 150; // 150ms stagger
            setTimeout(() => {
              entry.target.classList.add("animate-fade-up");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const register = useCallback((el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  }, []);

  return { register };
};

// Skeleton loader component for product cards
const ProductSkeleton = () => (
  <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden animate-pulse">
    <div className="h-72 w-full bg-surface-strong" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-surface-strong rounded w-1/3" />
      <div className="h-5 bg-surface-strong rounded w-2/3" />
      <div className="h-4 bg-surface-strong rounded w-full" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-surface-strong rounded w-1/4" />
        <div className="h-10 bg-surface-strong rounded-full w-1/3" />
      </div>
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isNavigating, setIsNavigating] = useState(false);
  const { register } = useScrollReveal();

  // Hero slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch");
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

  // Compute featured products and new arrivals
  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).slice(0, 6),
    [products],
  );

  const newArrivals = useMemo(
    () => products.filter((product) => product.newArrival).slice(0, 6),
    [products],
  );

  const [activeShopCategory, setActiveShopCategory] = useState("All");

  const filteredShopProducts = useMemo(() => {
    if (activeShopCategory === "All") return products.slice(0, 9);
    return products.filter(
      (p) => p.category.toLowerCase() === activeShopCategory.toLowerCase()
    ).slice(0, 9);
  }, [products, activeShopCategory]);

  // Auto‑advance hero slider every 10 seconds
  useEffect(() => {
    if (featuredProducts.length === 0 && heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const navigateCategory = (category: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    router.push(`/category/${encodeURIComponent(category)}`).finally(() => {
      setTimeout(() => setIsNavigating(false), 500);
    });
  };

  const handleAddToCart = (product: Product) => {
    cartContext?.addToCart(product);
  };

  // Prepare hero slides from featured products (max 4)
  const heroSlides = featuredProducts.slice(0, 4).map((product) => ({
    image: product.image,
    title: product.name,
    subtitle: product.description.substring(0, 100) + "...",
    category: product.category,
    link: `/product/${product._id}`,
  }));

  // Fallback slides (Unsplash – beautiful, reliable)
  const defaultSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed2f6b45d?w=1200&h=600&fit=crop",
      title: "Premium Footwear",
      subtitle:
        "Step into style with our latest collection of sneakers and formal shoes.",
      category: "Footwear",
      link: "/category/Footwear",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
      title: "Modern Apparel",
      subtitle: "Upgrade your wardrobe with sustainable, high‑quality fashion.",
      category: "Apparel",
      link: "/category/Apparel",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=600&fit=crop",
      title: "Smart Electronics",
      subtitle: "Discover the latest gadgets and smart home essentials.",
      category: "Electronics",
      link: "/category/Electronics",
    },
    {
      image:
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=600&fit=crop",
      title: "Home & Living",
      subtitle:
        "Create your dream space with curated home decor and furniture.",
      category: "Home",
      link: "/category/Home",
    },
  ];

  const slidesToShow = heroSlides.length ? heroSlides : defaultSlides;
  const currentSlideData = slidesToShow[currentSlide];

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + slidesToShow.length) % slidesToShow.length,
    );

  return (
    <>
      <Head>
        <title>
          TechShed | Incredible Prices on Computers, Mobile, Audio & Wearable Tech
        </title>
        <meta
          name="description"
          content="TechShed is a premium electronic storefront presenting incredible prices on computers, tablets, mobile accessories, audio gear, and drones. Shop trending tech deals and fast delivery."
        />
        <meta
          name="keywords"
          content="shopping, electronics, online store, computers, tablets, smartphones, audio devices, smart home, wearable tech"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "TechShed",
              url: "https://techshed.example.com",
              logo: "https://techshed.example.com/logo.png",
              description:
                "A premium shopping destination for computers, laptops, tablets, smartphones, audio, and wearable technology.",
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

      {/* Hero Slider Section */}
      {/* Premium TechShed Wix Mockup Hero Section */}
      <section className="relative w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="space-y-6 max-w-xl text-left animate-fade-in-up">
            <div>
              <span className="inline-block bg-red-600 text-white font-black uppercase tracking-wider text-[10px] px-3.5 py-1.5 rounded-sm">
                Best Prices
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Incredible Prices on All Your Favorite Items
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-normal">
              Get more for less on selected brands
            </p>
            <div className="pt-2">
              <Link
                href="/#shop"
                className="inline-block rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-9 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-md shadow-indigo-500/20"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Hero Right Image */}
          <div className="relative flex justify-center items-center animate-fade-in [animation-delay:300ms]">
            <div className="w-[85%] md:w-[95%] aspect-square max-w-[440px] bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden shadow-2xl relative border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
                alt="Premium Smartwatch Hero"
                className="w-[80%] h-[80%] object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Soft background glow */}
            <div className="absolute -z-10 w-72 h-72 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Side-by-Side Dual Promotional Grid (Holiday Deals & Just In) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Banner 1: Holiday Deals */}
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-red-600 to-amber-600 text-white p-8 md:p-12 min-h-[380px] flex flex-col justify-between shadow-lg group hover:-translate-y-1 transition-all duration-300">
          <div className="space-y-4 max-w-[65%]">
            <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Holiday Deals</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Up to 30% off
            </h2>
            <p className="text-white/90 text-sm font-medium">
              Selected Smartphone Brands
            </p>
            <div className="pt-4">
              <Link
                href="/category/Electronics"
                className="inline-block rounded-full bg-white text-slate-900 hover:bg-slate-100 px-7 py-3 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Shop
              </Link>
            </div>
          </div>
          {/* Overlay phone image */}
          <div className="absolute right-4 bottom-4 w-[35%] max-w-[200px] h-[80%] flex items-end">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
              alt="Smartphone holiday deals"
              className="w-full h-auto object-contain rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Banner 2: Just In */}
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-750 text-white p-8 md:p-12 min-h-[380px] flex flex-col justify-between shadow-lg group hover:-translate-y-1 transition-all duration-300">
          <div className="space-y-4 max-w-[65%]">
            <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Just In</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Take Your Sound Anywhere
            </h2>
            <p className="text-white/90 text-sm font-medium">
              Top Headphone Brands
            </p>
            <div className="pt-4">
              <Link
                href="/category/Electronics"
                className="inline-block rounded-full bg-white text-slate-900 hover:bg-slate-100 px-7 py-3 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Shop
              </Link>
            </div>
          </div>
          {/* Overlay headphone image */}
          <div className="absolute right-4 bottom-4 w-[35%] max-w-[200px] h-[80%] flex items-end">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
              alt="Headphone showcase"
              className="w-full h-auto object-contain rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </section>

      {/* Hero Highlights with Colors */}
      <section
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 opacity-0"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {heroHighlights.map((highlight, idx) => {
            const colors = [
              "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:from-yellow-100 hover:to-orange-100",
              "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100",
              "bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:from-green-100 hover:to-teal-100",
            ];
            return (
              <div
                key={highlight.title}
                className={`rounded-2xl border-2 ${colors[idx]} p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg animate-scale-in opacity-0`}
                style={{ animationDelay: `${(idx + 1) * 200}ms` }}
              >
                <div className="text-3xl mb-3 animate-bounce-soft">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 animate-fade-in">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 animate-fade-in [animation-delay:100ms]">
                  {highlight.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Category Selector with Colors */}
      <section
        id="collections"
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 shadow-sm transition-all hover:shadow-md border border-blue-100 animate-scale-in">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="animate-slide-in-left">
              <p className="text-sm uppercase tracking-[0.32em] text-blue-600 font-semibold animate-fade-in">
                🌈 Shop by section
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-800 sm:text-4xl animate-slide-in-right [animation-delay:200ms]">
                One menu for every category.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 animate-fade-in [animation-delay:400ms]">
                Select a category from the colorful menu below and explore a
                focused collection with 25+ curated products and clean browsing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 animate-slide-in-right [animation-delay:600ms]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-blue-300 hover:shadow-md focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in"
                aria-label="Select category"
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
                disabled={isNavigating}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 shadow-lg animate-pulse-glow"
              >
                {isNavigating ? "Redirecting..." : `Go to ${selectedCategory}`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners with Colors */}
      <section
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 opacity-0"
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {brandPartners.map((brand, index) => {
            const colors = [
              "from-red-100 to-pink-100 border-red-200 hover:from-red-200 hover:to-pink-200",
              "from-orange-100 to-yellow-100 border-orange-200 hover:from-orange-200 hover:to-yellow-200",
              "from-green-100 to-emerald-100 border-green-200 hover:from-green-200 hover:to-emerald-200",
              "from-blue-100 to-cyan-100 border-blue-200 hover:from-blue-200 hover:to-cyan-200",
              "from-purple-100 to-indigo-100 border-purple-200 hover:from-purple-200 hover:to-indigo-200",
            ];
            return (
              <div
                key={brand.name}
                className={`rounded-[1.75rem] border-2 bg-gradient-to-br ${colors[index % colors.length]} p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg animate-bounce-in opacity-0`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <p className="text-lg font-semibold text-gray-800 animate-fade-in">
                  {brand.name}
                </p>
                <p className="mt-2 text-sm text-gray-600 animate-fade-in [animation-delay:100ms]">
                  {brand.caption}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* New Arrivals Banner with Highlights */}
      <section
        id="highlights"
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-8 shadow-xl transition-all hover:shadow-2xl border-2 border-purple-300 animate-scale-in">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="animate-slide-in-left">
              <p className="text-sm uppercase tracking-[0.32em] text-purple-100 font-semibold animate-fade-in">
                ✨ Curated Highlights
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl animate-slide-in-right [animation-delay:200ms]">
                Fresh drops just landed
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 animate-fade-in [animation-delay:400ms]">
                Discover top-tier releases from our spring collection. Click on any item below to view full specifications, conversions, and customer reviews.
              </p>
               {newArrivals.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/product/${newArrivals[0]._id}`}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-purple-600 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-lg animate-bounce-in"
                  >
                    Shop Highlights Collection →
                  </Link>
                  <Link
                    href="/#reviews"
                    className="inline-flex items-center justify-center rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white hover:bg-white/30 hover:scale-105 active:scale-95 transition-all shadow-md animate-float"
                  >
                    See Customer Reviews ⭐
                  </Link>
                </div>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-3 animate-slide-in-right [animation-delay:600ms]">
              {newArrivals.slice(0, 3).map((product, index) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group block overflow-hidden rounded-3xl bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/20 animate-bounce-in opacity-0"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="overflow-hidden rounded-2xl bg-white p-3 h-28 flex items-center justify-center">
                    <SafeSpotlightImage product={product} />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="truncate text-xs font-bold text-white">{product.name}</p>
                    <p className="text-xs font-semibold text-purple-100 mt-0.5">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section
        id="shop"
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 pb-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-surface p-8 shadow-sm animate-scale-in">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between animate-fade-in">
            <div className="animate-slide-in-left">
              <p className="text-sm uppercase tracking-[0.32em] text-muted animate-fade-in">
                Popular picks
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl animate-slide-in-right [animation-delay:200ms]">
                Trending products for every shop page
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted animate-fade-in [animation-delay:400ms]">
              Select from the quick category filter buttons below to dynamically load and browse our premium catalog of curated, high-end products.
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="mt-8 flex flex-wrap gap-2 animate-fade-in [animation-delay:500ms]">
            {[
              { id: "All", name: "All Items", icon: "✨" },
              { id: "Footwear", name: "Footwear", icon: "👟" },
              { id: "Apparel", name: "Apparel", icon: "👕" },
              { id: "Electronics", name: "Electronics", icon: "🎧" },
              { id: "Accessories", name: "Accessories", icon: "⌚" },
              { id: "Home", name: "Home & Living", icon: "🏠" },
              { id: "Fitness", name: "Fitness", icon: "🏋️" }
            ].map((cat) => {
              const isActive = activeShopCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveShopCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95 shadow-sm border ${
                    isActive
                      ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 scale-105 shadow-md shadow-brand-500/20"
                      : "bg-surface-soft hover:bg-surface-strong text-slate-700 dark:text-slate-300 border-border hover:border-slate-300"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in [animation-delay:600ms]">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={`skeleton-${i}`} />
              ))
              : filteredShopProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="transition-all duration-500 hover:-translate-y-2 animate-bounce-in opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
          </div>
          
          {filteredShopProducts.length === 0 && (
            <div className="mt-12 text-center text-slate-500 py-10 animate-fade-in">
              <span className="text-4xl">🔍</span>
              <p className="mt-3 text-sm font-semibold">No items found in this section category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="reviews"
        ref={register}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 pb-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-surface-soft p-8 shadow-sm animate-scale-in">
          <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-dark animate-fade-in">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl animate-slide-in-left [animation-delay:200ms]">
              What our customers say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in [animation-delay:400ms]">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className="rounded-2xl bg-surface p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg animate-bounce-in opacity-0"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="flex gap-1 text-yellow-500 mb-3 animate-float">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 animate-pulse ${i < testimonial.rating
                        ? "fill-current"
                        : "fill-gray-200 text-gray-200"
                        }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted text-sm leading-relaxed animate-fade-in">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 pt-4 border-t border-border animate-slide-in-up [animation-delay:300ms]">
                  <p className="font-semibold text-text animate-fade-in">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted animate-fade-in [animation-delay:100ms]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
