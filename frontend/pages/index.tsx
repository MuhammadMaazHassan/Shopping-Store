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
import Image from "next/image";
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
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

      {/* Hero Slider Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image with fade transition */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <Image
            src={currentSlideData.image}
            alt={currentSlideData.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-20">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent-soft">
              {currentSlideData.category}
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {currentSlideData.title}
            </h1>
            <p className="mb-8 text-base leading-relaxed text-white/90 sm:text-lg">
              {currentSlideData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigateCategory(currentSlideData.category)}
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                Shop Now →
              </button>
              <Link
                href={currentSlideData.link}
                className="rounded-full bg-white/20 backdrop-blur-sm px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Previous slide"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Next slide"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slidesToShow.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? "w-8 bg-accent"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
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
              'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:from-yellow-100 hover:to-orange-100',
              'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100',
              'bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:from-green-100 hover:to-teal-100'
            ];
            return (
              <div
                key={highlight.title}
                className={`rounded-2xl border-2 ${colors[idx]} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{highlight.subtitle}</p>
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
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 shadow-sm transition-all hover:shadow-md border border-blue-100">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-blue-600 font-semibold">
                🌈 Shop by section
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-800 sm:text-4xl">
                One menu for every category.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                Select a category from the colorful menu below and explore a focused
                collection with 25+ curated products and clean browsing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-blue-300 hover:shadow-md focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 shadow-lg"
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
              'from-red-100 to-pink-100 border-red-200 hover:from-red-200 hover:to-pink-200',
              'from-orange-100 to-yellow-100 border-orange-200 hover:from-orange-200 hover:to-yellow-200',
              'from-green-100 to-emerald-100 border-green-200 hover:from-green-200 hover:to-emerald-200',
              'from-blue-100 to-cyan-100 border-blue-200 hover:from-blue-200 hover:to-cyan-200',
              'from-purple-100 to-indigo-100 border-purple-200 hover:from-purple-200 hover:to-indigo-200'
            ];
            return (
              <div
                key={brand.name}
                className={`rounded-[1.75rem] border-2 bg-gradient-to-br ${colors[index % colors.length]} p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <p className="text-lg font-semibold text-gray-800">{brand.name}</p>
                <p className="mt-2 text-sm text-gray-600">{brand.caption}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* New Arrivals Banner with Colors */}
      <section
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 p-8 shadow-lg transition-all hover:shadow-xl border-2 border-green-300">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-green-100 font-semibold">
                ✨ New arrivals
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Fresh picks just landed
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/90">
                Discover the latest additions to our collection with exclusive
                deals and limited-time offers.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {newArrivals.slice(0, 3).map((product, index) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-lg bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 border border-white/30"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section
        ref={register}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-20 pb-20 opacity-0"
      >
        <div className="rounded-[2rem] bg-surface p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                Popular picks
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl">
                Trending products for every shop page
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted">
              Browse top sellers, flash favorites, and seasonal essentials with
              clean, professional product cards.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={`skeleton-${i}`} />
                ))
              : newArrivals.map((product) => (
                  <div
                    key={product._id}
                    className="transition-all duration-300 hover:-translate-y-1"
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
        <div className="rounded-[2rem] bg-surface-soft p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-dark">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl">
              What our customers say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className="rounded-2xl bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex gap-1 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
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
                <p className="text-muted text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
