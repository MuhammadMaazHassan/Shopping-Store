import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { type Product } from "../../data/products";
import { CartContext } from "../../contexts/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const cartContext = useContext(CartContext);
  const [selectedDelivery, setSelectedDelivery] = useState<
    "standard" | "express" | "overnight"
  >("standard");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product?.availableSizes?.length) {
      setSelectedSize(product.availableSizes[0]);
    }
    if (product?.images?.length) {
      setSelectedImageIndex(0);
    }
  }, [product]);

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
  const imageList = product.images.length ? product.images : [product.image];
  const selectedImage = imageList[selectedImageIndex] || product.image;

  return (
    <>
      <Head>
        <title>{product.name} | WonderCart</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="mx-auto grid max-w-7xl gap-10 animate-fadeInUp lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm animate-slideInLeft">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>

          <div className="mt-5 grid gap-3 grid-cols-3">
            {imageList.slice(0, 3).map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`overflow-hidden rounded-3xl border transition ${
                  selectedImageIndex === index
                    ? "border-brand-600 ring-2 ring-brand-200"
                    : "border-slate-200"
                }`}
              >
                <img
                  src={src}
                  alt={`${product.name} ${index + 1}`}
                  className="h-24 w-full object-cover"
                />
              </button>
            ))}
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
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="text-yellow-500">★★★★★</span>
                <span>
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
    </>
  );
}
