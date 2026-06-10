import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { type Product } from "../../data/products";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import ProductImageFallback from "../../components/ProductImageFallback";

type Review = {
  name: string;
  email?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  createdAt: string;
};

type ProductWithReviews = Product & {
  reviews?: Review[];
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="h-4 w-4 fill-current text-yellow-500" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="h-4 w-4 fill-current text-yellow-500" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="h-4 w-4 fill-current text-slate-300 dark:text-slate-700" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const cartContext = useContext(CartContext);
  const { user } = useAuth();
  const [selectedDelivery, setSelectedDelivery] = useState<
    "standard" | "express" | "overnight"
  >("standard");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [product, setProduct] = useState<ProductWithReviews | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [reviewStatus, setReviewStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "shipping">("overview");
  const [showCartToast, setShowCartToast] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [imageError, setImageError] = useState(false);

  const productId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (user) {
      setReviewName(user.name);
      setReviewEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setImageError(false);
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);



  if (loading) {
    return (
      <div className="p-20 text-center text-slate-600">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Product not found
        </h1>
        <p className="mt-4 text-slate-600">
          Please return to the store and select a valid item.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Back to store
        </Link>
      </div>
    );
  }

  const handleReviewImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).slice(0, 3);
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setReviewImages((prev) => [...prev, reader.result as string]);
          setImagePreviews((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReviewImage = (indexToRemove: number) => {
    setReviewImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setReviewError(null);
    setReviewStatus("submitting");

    if (!reviewName.trim() || !reviewComment.trim()) {
      setReviewError("Please add your name and review details.");
      setReviewStatus("error");
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: reviewName.trim(),
          email: reviewEmail.trim(),
          rating: reviewRating,
          title: reviewTitle.trim(),
          comment: reviewComment.trim(),
          images: reviewImages,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || "Unable to submit review.");
      }

      const data = await response.json();
      const updatedReviews = data.reviews || [data.review, ...reviews];
      setReviews(updatedReviews);

      if (product) {
        const totalRating = updatedReviews.reduce((sum: number, r: Review) => sum + r.rating, 0);
        const avgRating = totalRating / updatedReviews.length;
        setProduct({
          ...product,
          reviews: updatedReviews,
          numReviews: updatedReviews.length,
          rating: Number(avgRating.toFixed(1)),
        });
      }

      setReviewTitle("");
      setReviewComment("");
      setReviewImages([]);
      setImagePreviews([]);
      setReviewStatus("success");
    } catch (error) {
      console.error(error);
      setReviewError(
        error instanceof Error
          ? error.message
          : "Unable to submit your review at this time.",
      );
      setReviewStatus("error");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    cartContext?.addToCart(product);
    setShowCartToast(true);
    setTimeout(() => {
      setShowCartToast(false);
    }, 4000);
  };

  const deliveryCosts: {
    standard: number;
    express: number;
    overnight: number;
  } = {
    standard: 0,
    express: 9.99,
    overnight: 24.99,
  };

  const totalPrice = product.price + (deliveryCosts[selectedDelivery] || 0);

  return (
    <>
      <Head>
        <title>{product.name} | TechShed</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="mx-auto grid max-w-7xl gap-10 animate-fadeInUp lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm animate-slideInLeft dark:border-slate-800 dark:bg-slate-950">
          {/* Main Image Display with Context */}
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 p-6 aspect-square flex items-center justify-center relative">
              {!imageError && product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <ProductImageFallback
                  category={product.category}
                  name={product.name}
                  className="h-full w-full"
                />
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.sale && (
                  <span className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-rose-500/20">
                    🔥 Sale
                  </span>
                )}
                {product.newArrival && (
                  <span className="rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-500/20">
                    ✨ New
                  </span>
                )}
                {product.featured && (
                  <span className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-amber-500/20">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Stock Status Badge */}
              <div className="absolute top-4 right-4">
                {product.countInStock === 0 ? (
                  <span className="rounded-full bg-rose-100 px-3.5 py-1.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                    ✕ Out of Stock
                  </span>
                ) : product.countInStock <= 5 ? (
                  <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    ⚠️ Only {product.countInStock} Left!
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    ✓ In Stock
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {product.brand}
              </span>
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                {product.category}
              </span>
              {product.gender && (
                <span className="rounded-full bg-brand-50 dark:bg-brand-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                  {product.gender}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {product.numReviews} Reviews
                </span>
              </div>
            </div>

            {/* Size Selector with Guide Option */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="rounded-[1.75rem] border border-slate-200/60 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
                    Select Size
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 hover:underline hover:text-brand-700"
                  >
                    📏 Size Guide
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 min-w-12 items-center justify-center rounded-full border px-4 text-sm font-bold transition-all duration-150 ${
                        selectedSize === size
                          ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-500/20 scale-105"
                          : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 hover:border-brand-300 hover:scale-[1.02]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Segmented Tab Navigation System */}
            <div className="mt-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex gap-8">
                {[
                  { id: "overview", label: "Description" },
                  { id: "specs", label: "Specifications" },
                  { id: "shipping", label: "Shipping" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition relative ${
                      activeTab === tab.id
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Segmented Content Area */}
            <div className="py-4">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                    {product.description}
                  </p>
                  <div className="rounded-2xl bg-indigo-50/50 p-5 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/30">
                    <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">
                      💡 Premium Brand Heritage
                    </p>
                    <p className="mt-1.5 text-xs text-indigo-700 dark:text-indigo-400/90 leading-5">
                      This item is a 100% authentic release from <strong>{product.brand}</strong>, designed with top-tier materials and visual craft standards.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="rounded-3xl border border-slate-200/60 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30 space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                    Product Details & Specifications
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                      <span className="text-sm text-slate-500">Material</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.details?.material || "Premium Composition"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                      <span className="text-sm text-slate-500">Colorway</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.details?.color || "Custom Palette"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                      <span className="text-sm text-slate-500">Model Style</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.details?.style || "Contemporary"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                      <span className="text-sm text-slate-500">Product Weight</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.details?.weight || "Lightweight Release"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                      <span className="text-sm text-slate-500">Gender Selection</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.gender || "Unisex Release"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                      <span className="text-sm text-slate-500">Category Tag</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.category}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="rounded-3xl border border-slate-200/60 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30 space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                    Logistic & Care Details
                  </p>
                  <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300 leading-6">
                    <p>📦 <strong>Fast Tracking Logistics</strong>: All items are packaged carefully in protective, double-walled boxes and dispatched within 24 hours.</p>
                    <p>🛡️ <strong>Secure Shipment Insured</strong>: Every package includes real-time tracking numbers and visual delivery confirmation.</p>
                    <p>🔄 <strong>Hassle-Free Returns</strong>: Fit not perfect? Enjoy worry-free 30-day returns and fast refunds.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm animate-slideInRight">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] font-semibold text-brand-700">
              Pricing
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-3xl bg-brand-50 p-4">
                <p className="text-sm text-slate-600">Product Price</p>
                <p className="text-2xl font-bold text-brand-700">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Stock Available</p>
                <p className="text-lg font-semibold text-slate-900">
                  {product.countInStock} items
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.32em] font-semibold text-brand-700">
              Delivery Options
            </p>
            <div className="mt-4 space-y-3">
              {product.delivery &&
                [
                  {
                    id: "standard",
                    label: "Standard",
                    time: `${product.delivery.standard}d`,
                    price: "FREE",
                  },
                  {
                    id: "express",
                    label: "Express",
                    time: `${product.delivery.express}d`,
                    price: "$9.99",
                  },
                  {
                    id: "overnight",
                    label: "Overnight",
                    time: `${product.delivery.overnight}d`,
                    price: "$24.99",
                  },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`block cursor-pointer rounded-3xl border-2 p-4 transition ${
                      selectedDelivery === option.id
                        ? "border-brand-600 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedDelivery === option.id}
                      onChange={() =>
                        setSelectedDelivery(
                          option.id as "standard" | "express" | "overnight",
                        )
                      }
                      className="accent-brand-600"
                    />
                    <span className="ml-3 font-semibold text-slate-900">
                      {option.label} ({option.time}) - {option.price}
                    </span>
                  </label>
                ))}
            </div>
          </div>

          <div className="rounded-3xl bg-green-50 border border-green-200 p-6">
            <p className="text-sm text-slate-600">Total Price</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              ${totalPrice.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Free shipping on orders over $50
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-full bg-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700"
          >
            Add to cart
          </button>
          <Link
            href="/cart"
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View cart
          </Link>
        </aside>
      </div>

      <div className="mx-auto mt-10 max-w-7xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="grid gap-10 xl:grid-cols-[1fr_1.25fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Customer reviews
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  Share your experience with this product, upload images, and
                  help others learn more from your review.
                </p>
              </div>

              <form
                onSubmit={handleReviewSubmit}
                className="space-y-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Name
                    </span>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your name"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Email
                    </span>
                    <input
                      type="email"
                      value={reviewEmail}
                      onChange={(e) => setReviewEmail(e.target.value)}
                      placeholder="Email (optional)"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Rating
                    </span>
                    <div
                      className="mt-2 flex items-center gap-1.5 py-2"
                      onMouseLeave={() => setHoverRating(null)}
                    >
                      {[1, 2, 3, 4, 5].map((value) => {
                        const isSelected = value <= (hoverRating !== null ? hoverRating : reviewRating);
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setReviewRating(value)}
                            onMouseEnter={() => setHoverRating(value)}
                            className="text-2xl transition-all duration-150 hover:scale-125 focus:outline-none active:scale-95"
                            aria-label={`Rate ${value} stars`}
                          >
                            <span
                              className={
                                isSelected
                                  ? "text-yellow-500"
                                  : "text-slate-300 dark:text-slate-700"
                              }
                            >
                              ★
                            </span>
                          </button>
                        );
                      })}
                      <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                        ({reviewRating} star{reviewRating !== 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Review title
                    </span>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Review headline"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Review details
                  </span>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={5}
                    placeholder="Tell others what you liked, how the product feels, and what makes it stand out."
                    className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Add images
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleReviewImageUpload}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 file:mr-4 file:rounded-full file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-3 animate-fade-in">
                    {imagePreviews.map((src, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900 shadow-sm transition-transform hover:scale-[1.02]"
                      >
                        <img
                          src={src}
                          alt={`Review image ${index + 1}`}
                          className="h-28 w-full object-cover rounded-[1.25rem]"
                        />
                        <button
                          type="button"
                          onClick={() => removeReviewImage(index)}
                          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white shadow hover:bg-rose-600 transition active:scale-90"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {reviewError && (
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    {reviewError}
                  </p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Reviews are visible instantly after submission.
                  </p>
                  <button
                    type="submit"
                    disabled={reviewStatus === "submitting"}
                    className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {reviewStatus === "submitting"
                      ? "Sending..."
                      : "Submit review"}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm uppercase tracking-[0.32em] text-brand-700 dark:text-brand-300 font-semibold">
                  {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="rounded-3xl bg-brand-600 px-4 py-3 text-white shadow-md shadow-brand-500/20">
                    <span className="text-3xl font-extrabold">
                      {product.rating?.toFixed(1) ?? "5.0"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Average Score
                    </p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={product.rating || 5} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {reviews.length === 0 ? (
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    No reviews yet — be the first to share your experience.
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={`${review.name}-${review.createdAt}`}
                      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 text-sm font-bold text-white uppercase shadow-sm">
                            {review.name ? review.name[0] : "C"}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                              {review.title || "Customer review"}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-medium text-slate-700 dark:text-slate-300">{review.name}</span> •{" "}
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <StarRating rating={review.rating} />
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {review.rating} / 5
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-slate-700 dark:text-slate-300">
                        {review.comment}
                      </p>
                      {review.images && review.images.length > 0 && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {review.images.map((src, index) => (
                            <div
                              key={index}
                              onClick={() => setActiveLightboxImage(src)}
                              className="group relative cursor-zoom-in overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition hover:shadow-md"
                            >
                              <img
                                src={src}
                                alt={`Review image ${index + 1}`}
                                className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-200 group-hover:opacity-100">
                                <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                                  🔍 Click to expand
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        >
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-slate-300 focus:outline-none"
          >
            ×
          </button>
          <div className="relative max-h-[85vh] max-w-[85vw] overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl dark:bg-slate-900">
            <img
              src={activeLightboxImage}
              alt="Review enlargement"
              className="max-h-[80vh] max-w-[80vw] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {showCartToast && (
        <div className="fixed top-6 right-6 z-50 flex max-w-md items-center gap-4 rounded-3xl border border-emerald-200 bg-white p-4 shadow-2xl dark:border-emerald-900 dark:bg-slate-900 animate-slideInRight">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold">
            ✓
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Added to Cart!</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{product.name}</p>
          </div>
          <Link
            href="/cart"
            className="rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700 transition shrink-0"
          >
            Checkout
          </Link>
        </div>
      )}

      {showSizeGuide && (
        <div
          onClick={() => setShowSizeGuide(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950 animate-scale-in"
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 text-2xl focus:outline-none"
            >
              ×
            </button>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              📏 Size Chart Guide
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Standard brand shoe dimension chart for men and women.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-900 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">US Size</th>
                    <th className="px-6 py-3.5">UK Size</th>
                    <th className="px-6 py-3.5">EU Size</th>
                    <th className="px-6 py-3.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {[
                    { us: "7.0", uk: "6.0", eu: "40.0", cm: "25.0 cm" },
                    { us: "8.0", uk: "7.0", eu: "41.0", cm: "26.0 cm" },
                    { us: "9.0", uk: "8.0", eu: "42.0", cm: "27.0 cm" },
                    { us: "10.0", uk: "9.0", eu: "43.0", cm: "28.0 cm" },
                    { us: "11.0", uk: "10.0", eu: "44.0", cm: "29.0 cm" },
                    { us: "12.0", uk: "11.0", eu: "45.0", cm: "30.0 cm" },
                  ].map((row) => (
                    <tr key={row.us} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                      <td className="px-6 py-3 font-bold text-slate-900 dark:text-white">{row.us}</td>
                      <td className="px-6 py-3">{row.uk}</td>
                      <td className="px-6 py-3">{row.eu}</td>
                      <td className="px-6 py-3">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full rounded-full bg-slate-100 py-3 text-sm font-bold text-slate-800 hover:bg-slate-200 transition"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </>
  );
}
