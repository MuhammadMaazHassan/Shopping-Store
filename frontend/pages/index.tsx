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
    icon: "🌍",
  },
  {
    title: "Curated collections",
    subtitle:
      "Each section is stocked with 25+ products and curated brand favorites.",
    icon: "✨",
  },
  {
    title: "Secure checkout",
    subtitle:
      "Encrypted payments and trusted order tracking for every purchase.",
    icon: "🔒",
  },
];

const brandPartners = [
  { name: "Stride", caption: "Footwear innovators" },
  { name: "Tempo", caption: "Wearable technology" },
  { name: "Lume", caption: "Home lighting" },
  { name: "Breathe", caption: "Beauty essentials" },
  { name: "DrivePro", caption: "Auto accessories" },
];

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Fashion Buyer",
    text: "WonderCart's curated categories made finding premium footwear effortless. The delivery was lightning fast.",
    rating: 5,
  },
  {
    name: "Marcus Lee",
    role: "Tech Enthusiast",
    text: "Electronics section is well organised. Love the product filters and detailed specs.",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "Home Decorator",
    text: "Beautiful home collection – exactly what I needed for my renovation project.",
    rating: 4,
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

      {/* Hero Split Section */}
      <section className="relative min-h-[70vh] lg:h-[80vh] w-full bg-gradient-to-br from-slate-900 via-slate-950 to-brand-950 overflow-hidden flex items-center py-12 lg:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)]" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Column */}
          <div className="text-white z-10 space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold tracking-wider uppercase">
              ✨ Curated Premium Store
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Premium Footwear <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-300">
                Redefined
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed">
              Step into style and absolute comfort with our signature premium shoe collection. Engineered for elegance, crafted for the modern individual.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigateCategory("Footwear")}
                className="rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-105 hover:shadow-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                Shop Footwear →
              </button>
              <Link
                href="/category/All"
                className="rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/30"
              >
                Explore All
              </Link>
            </div>
          </div>
          
          {/* Right Complete Image Column */}
          <div className="relative flex justify-center items-center z-10 animate-fade-in-up [animation-delay:300ms]">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-indigo-500/20 rounded-[3rem] blur-2xl opacity-60 animate-pulse-slow" />
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-6 w-full max-w-lg aspect-[4/3] flex items-center justify-center shadow-2xl transition-all hover:scale-[1.02] duration-500">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=max&w=800"
                alt="Featured Premium Footwear"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_50px_rgba(239,68,68,0.3)] animate-float"
              />
            </div>
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

      {/* New Arrivals Banner with Spotlight Complete Image */}
      <section
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 p-8 md:p-12 shadow-xl border border-emerald-400/20 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in-left space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold tracking-widest uppercase">
                ✨ NEW ARRIVAL SPOTLIGHT
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Fresh Picks Just Landed
              </h2>
              <p className="max-w-md text-sm sm:text-base leading-relaxed text-emerald-50/90">
                Explore our absolute latest addition: crafted to perfection, designed for daily excellence, and styled for standout presence. Order now with free standard shipping!
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateCategory("New Arrivals")}
                  className="rounded-full bg-white text-teal-800 px-6 py-3 text-sm font-bold shadow-md transition-all hover:scale-105 hover:bg-emerald-50"
                >
                  View All New Drops
                </button>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center animate-slide-in-right [animation-delay:400ms]">
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 w-full max-w-sm aspect-square flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-300">
                <img
                  src={newArrivals[0]?.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=max&w=800"}
                  alt={newArrivals[0]?.name || "New Arrival Spotlight"}
                  className="max-h-full max-w-full object-contain rounded-2xl filter drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section
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
              Browse top sellers, flash favorites, and seasonal essentials with
              clean, professional product cards.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in [animation-delay:600ms]">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={`skeleton-${i}`} />
                ))
              : newArrivals.map((product, index) => (
                  <div
                    key={product._id}
                    className="transition-all duration-500 hover:-translate-y-2 animate-bounce-in opacity-0"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
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
                      className={`h-4 w-4 animate-pulse ${
                        i < testimonial.rating
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
