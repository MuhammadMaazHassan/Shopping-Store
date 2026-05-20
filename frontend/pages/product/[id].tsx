import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { type Product } from "../../data/products";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

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
        <title>{product.name} | WonderCart</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="mx-auto grid max-w-7xl gap-10 animate-fadeInUp lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm animate-slideInLeft dark:border-slate-800 dark:bg-slate-950">
          {/* Main Image Display with Context */}
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 p-6 aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Image Context Info */}
          <div className="mt-4 rounded-3xl bg-brand-50 p-4 dark:bg-brand-950/30">
            <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
              {product.category}
            </p>
            <p className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">
              {product.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {product.brand} • {product.gender || "Unisex"}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                {product.category}
              </span>
              {product.gender && (
                <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
                  {product.gender}
                </span>
              )}
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <StarRating rating={product.rating} />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {product.rating} ({product.numReviews} reviews)
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-slate-900">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-slate-500">By {product.brand}</p>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              {product.description}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.availableSizes && (
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-700">
                    Size
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-brand-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-700">
                  Details
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  {product.details?.material && (
                    <p>
                      <span className="font-semibold text-slate-900">
                        Material:
                      </span>{" "}
                      {product.details.material}
                    </p>
                  )}
                  {product.details?.color && (
                    <p>
                      <span className="font-semibold text-slate-900">
                        Color:
                      </span>{" "}
                      {product.details.color}
                    </p>
                  )}
                  {product.details?.style && (
                    <p>
                      <span className="font-semibold text-slate-900">
                        Style:
                      </span>{" "}
                      {product.details.style}
                    </p>
                  )}
                </div>
              </div>
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
            onClick={() => cartContext?.addToCart(product)}
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
          <div className="grid gap-10 xl:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Product details
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Dive into every section for a complete product story — material,
                color, style, weight, and delivery details are all here to help
                you choose with confidence.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                    Category
                  </p>
                  <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {product.category}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                    Brand
                  </p>
                  <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {product.brand}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                    Sizes
                  </p>
                  <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {product.availableSizes?.join(" • ") ?? "One size"}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                    Delivery
                  </p>
                  <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
                    Standard {product.delivery?.standard ?? "-"}d, Express{" "}
                    {product.delivery?.express ?? "-"}d, Overnight{" "}
                    {product.delivery?.overnight ?? "-"}d
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Description overview
              </h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                {product.description}
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {product.details?.material && (
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Material:
                    </span>{" "}
                    {product.details.material}
                  </p>
                )}
                {product.details?.color && (
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Color:
                    </span>{" "}
                    {product.details.color}
                  </p>
                )}
                {product.details?.weight && (
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Weight:
                    </span>{" "}
                    {product.details.weight}
                  </p>
                )}
                {product.details?.style && (
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Style:
                    </span>{" "}
                    {product.details.style}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

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
    </>
  );
}
