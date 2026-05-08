// @ts-nocheck
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

// Star rating helper (full, half, empty stars)
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 fill-current text-yellow-500"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className="h-3.5 w-3.5 fill-current text-yellow-500"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 fill-current text-gray-300"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

// Animated Add to Cart button with loading and stock states
const AddToCartButton = ({ onClick, isAdding, outOfStock }) => {
  if (outOfStock) {
    return (
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-full bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500"
      >
        Out of stock
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAdding}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 active:scale-95 ${
        isAdding
          ? "cursor-wait bg-brand-400"
          : "bg-brand-600 hover:bg-brand-700 hover:shadow-md"
      }`}
    >
      {isAdding ? (
        <div className="flex items-center justify-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-white"
            viewBox="0 0 24 24"
            fill="none"
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
          <span>Adding...</span>
        </div>
      ) : (
        "Add to cart"
      )}
    </button>
  );
};

// Main ProductCard component
const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  // Stock handling (default to 1 if countInStock missing)
  const outOfStock = (product.countInStock ?? 1) <= 0;
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const handleAddToCart = async () => {
    if (outOfStock || isAdding) return;

    setIsAdding(true);
    try {
      await onAddToCart(product);
      setShowAddedFeedback(true);
      setTimeout(() => setShowAddedFeedback(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Added to cart toast feedback */}
      <div
        className={`absolute left-1/2 top-4 z-20 -translate-x-1/2 transform rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 ${
          showAddedFeedback
            ? "translate-y-0 opacity-100"
            : "-translate-y-8 pointer-events-none opacity-0"
        }`}
      >
        ✓ Added to cart!
      </div>

      {/* Product image with zoom on hover */}
      <Link
        href={`/product/${product._id}`}
        className="relative block h-72 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
      >
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <span className="text-sm text-slate-400">Image unavailable</span>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.newArrival && (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              New
            </span>
          )}
          {product.sale && discountPercent > 0 && (
            <span className="rounded-full bg-rose-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {outOfStock && (
            <span className="rounded-full bg-slate-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                {product.category}
              </span>
              {product.gender && (
                <span className="text-xs text-slate-500">
                  • {product.gender}
                </span>
              )}
            </div>
            <Link href={`/product/${product._id}`}>
              <h3 className="line-clamp-2 text-base font-semibold text-slate-900 transition-colors hover:text-brand-700">
                {product.name}
              </h3>
            </Link>
            {product.brand && (
              <p className="mt-0.5 text-xs text-slate-500">{product.brand}</p>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-brand-700">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-brand-700">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-500">
            ({product.numReviews} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>

        {/* Low stock warning */}
        {!outOfStock &&
          product.countInStock !== undefined &&
          product.countInStock < 5 && (
            <p className="mt-2 text-xs text-emerald-600">
              Only {product.countInStock} left in stock
            </p>
          )}

        {/* Delivery options (if provided) */}
        {product.delivery && (
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3">
            <div className="text-center text-[11px]">
              <p className="font-semibold text-slate-700">
                {product.delivery.standard}d
              </p>
              <p className="text-slate-500">Standard</p>
            </div>
            <div className="text-center text-[11px]">
              <p className="font-semibold text-slate-700">
                {product.delivery.express}d
              </p>
              <p className="text-slate-500">Express</p>
            </div>
            <div className="text-center text-[11px]">
              <p className="font-semibold text-slate-700">
                {product.delivery.overnight}d
              </p>
              <p className="text-slate-500">Overnight</p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            href={`/product/${product._id}`}
            className="text-sm font-medium text-brand-700 transition-all hover:text-brand-900 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
          >
            View details →
          </Link>
          <AddToCartButton
            onClick={handleAddToCart}
            isAdding={isAdding}
            outOfStock={outOfStock}
          />
        </div>
      </div>
    </article>
  );
};

// PropTypes for runtime type checking (optional but recommended)
ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    brand: PropTypes.string,
    gender: PropTypes.string,
    newArrival: PropTypes.bool,
    sale: PropTypes.bool,
    countInStock: PropTypes.number,
    originalPrice: PropTypes.number,
    delivery: PropTypes.shape({
      standard: PropTypes.number,
      express: PropTypes.number,
      overnight: PropTypes.number,
    }),
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
