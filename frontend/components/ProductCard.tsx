import Link from "next/link";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="product-card overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/product/${product._id}`}
        className="product-image block overflow-hidden rounded-t-[2rem] bg-slate-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {product.newArrival && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">
                  New
                </span>
              )}
              {product.sale && (
                <span className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-rose-700">
                  Sale
                </span>
              )}
              {product.gender && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
                  {product.gender}
                </span>
              )}
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-brand-700 font-semibold">
              {product.category}
            </p>
            <p className="text-xs text-slate-500">{product.brand}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-yellow-500">★</span>
              <span className="text-xs font-medium text-slate-600">
                {product.rating} ({product.numReviews})
              </span>
            </div>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-bold text-brand-700">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          {product.description}
        </p>
        {product.delivery && (
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-3xl bg-slate-50 p-3">
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
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/product/${product._id}`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View details
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
