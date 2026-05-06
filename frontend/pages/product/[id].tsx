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
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="p-20 text-center text-slate-600">Loading product...</div>;
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

  return (
    <>
      <Head>
        <title>{product.name} | WonderCart</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="mx-auto grid max-w-7xl gap-10 animate-fadeInUp lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm animate-slideInLeft">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-[1.5rem] object-cover"
          />
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm font-semibold text-slate-600">
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
              {product.delivery && (
                <>
                  <label
                    className={`block cursor-pointer rounded-3xl border-2 p-4 transition ${
                      selectedDelivery === "standard"
                        ? "border-brand-600 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={selectedDelivery === "standard"}
                      onChange={(e) =>
                        setSelectedDelivery(
                          e.target.value as
                            | "standard"
                            | "express"
                            | "overnight",
                        )
                      }
                      className="accent-brand-600"
                    />
                    <span className="ml-3 font-semibold text-slate-900">
                      Standard ({product.delivery.standard}d) - FREE
                    </span>
                  </label>
                  <label
                    className={`block cursor-pointer rounded-3xl border-2 p-4 transition ${
                      selectedDelivery === "express"
                        ? "border-brand-600 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={selectedDelivery === "express"}
                      onChange={(e) =>
                        setSelectedDelivery(
                          e.target.value as
                            | "standard"
                            | "express"
                            | "overnight",
                        )
                      }
                      className="accent-brand-600"
                    />
                    <span className="ml-3 font-semibold text-slate-900">
                      Express ({product.delivery.express}d) - $9.99
                    </span>
                  </label>
                  <label
                    className={`block cursor-pointer rounded-3xl border-2 p-4 transition ${
                      selectedDelivery === "overnight"
                        ? "border-brand-600 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="overnight"
                      checked={selectedDelivery === "overnight"}
                      onChange={(e) =>
                        setSelectedDelivery(
                          e.target.value as
                            | "standard"
                            | "express"
                            | "overnight",
                        )
                      }
                      className="accent-brand-600"
                    />
                    <span className="ml-3 font-semibold text-slate-900">
                      Overnight ({product.delivery.overnight}d) - $24.99
                    </span>
                  </label>
                </>
              )}
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
