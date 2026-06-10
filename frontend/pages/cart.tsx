import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import ProductImageFallback from "../components/ProductImageFallback";

const CartItemImage = ({ item }: { item: any }) => {
  const [imageError, setImageError] = useState(false);
  return !imageError && item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="h-28 w-28 rounded-2xl object-contain bg-white border border-slate-100 p-2 shadow-sm"
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="h-28 w-28 rounded-2xl overflow-hidden shadow-sm">
      <ProductImageFallback
        category={item.category}
        name={item.name}
        className="h-full w-full"
      />
    </div>
  );
};

export default function CartPage() {
  const cartContext = useContext(CartContext);
  const { user } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState<
    "standard" | "express" | "overnight"
  >("standard");
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    zip: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!cartContext) {
    return null;
  }

  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    cartContext as any;
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  const deliveryCosts = {
    standard: 0,
    express: 9.99,
    overnight: 24.99,
  };

  const deliveryCost = deliveryCosts[deliveryMethod];
  const total = subtotal + deliveryCost;

  const handleCheckout = async () => {
    if (!address.fullName || !address.street || !address.city || !address.zip) {
      setError("Please fill in all address fields to complete the checkout.");
      return;
    }

    if (!user) {
      setError("You must be signed in to place an order.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const orderData = {
        orderItems: cartItems.map((item: any) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: address,
        paymentMethod: "Credit Card",
        totalPrice: Number(total.toFixed(2)),
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      clearCart();
      setCheckoutSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (checkoutSuccess) {
    return (
      <div className="mx-auto max-w-4xl text-center py-20 animate-fadeInUp">
        <div className="mx-auto h-64 w-64 mb-8">
          <img
            src="/images/checkout_success.png"
            alt="Success Illustration"
            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Thank you,{" "}
          <span className="font-semibold text-slate-900">
            {address.fullName}
          </span>
          ! Your items are being prepared. They will be shipped to{" "}
          <span className="font-semibold text-slate-900">
            {address.street}, {address.city}
          </span>{" "}
          via {deliveryMethod} delivery.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-brand-600 px-8 py-4 font-semibold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-1 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Your Cart & Checkout | TechShed</title>
      </Head>

      <div className="mx-auto max-w-7xl space-y-8 animate-fadeInUp px-4 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-10 sm:p-14 text-white shadow-lg relative min-h-[320px] flex flex-col justify-center group">
          <img
            src="/images/checkout_banner.png"
            alt="Checkout Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm text-white">
              Secure Checkout
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              Complete your purchase
            </h1>
            <p className="mt-4 text-slate-200 text-lg leading-relaxed drop-shadow-md">
              Review your items, choose a delivery method, and tell us where to
              send your order. Your items are reserved for 15 minutes.
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-16 text-center shadow-sm">
            <div className="text-6xl mb-6">🛒</div>
            <p className="text-2xl font-bold text-slate-900">
              Your cart is empty
            </p>
            <p className="mt-3 text-slate-600 text-lg">
              Find your next favorite product in the store.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-full bg-brand-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
            {/* Left Column: Items, Delivery, Address */}
            <div className="space-y-8">
              {/* Items Section */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Review Items
                </h2>
                <div className="space-y-6">
                  {cartItems.map((item: any) => (
                    <div
                      key={item._id}
                      className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4 flex flex-col sm:flex-row items-center gap-6 relative"
                    >
                      <CartItemImage item={item} />
                      <div className="flex-1 w-full text-center sm:text-left">
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium tracking-wide uppercase mt-1">
                          {item.brand}
                        </p>
                        <p className="mt-2 font-semibold text-brand-700">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-2 rounded-full border border-slate-200 shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 font-bold"
                        >
                          -
                        </button>
                        <span className="w-4 text-center font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Section */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  Delivery Method
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: "standard",
                      title: "Standard",
                      time: "4-7 Days",
                      price: 0,
                    },
                    {
                      id: "express",
                      title: "Express",
                      time: "2-3 Days",
                      price: 9.99,
                    },
                    {
                      id: "overnight",
                      title: "Overnight",
                      time: "Next Day",
                      price: 24.99,
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`cursor-pointer rounded-[1.5rem] border-2 p-5 transition-all ${deliveryMethod === method.id ? "border-brand-600 bg-brand-50 shadow-md" : "border-slate-100 bg-white hover:border-brand-200"}`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        className="sr-only"
                        checked={deliveryMethod === method.id}
                        onChange={() => setDeliveryMethod(method.id as any)}
                      />
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {method.title}
                          </h4>
                          <p className="text-sm text-slate-500 mt-1">
                            {method.time}
                          </p>
                        </div>
                        <p className="font-bold text-brand-700 mt-4">
                          {method.price === 0 ? "FREE" : `$${method.price}`}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    3
                  </span>
                  Shipping Address
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      placeholder="123 Shopping Avenue, Apt 4B"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      placeholder="Metropolis"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={address.zip}
                      onChange={(e) =>
                        setAddress({ ...address, zip: e.target.value })
                      }
                      placeholder="90210"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <aside className="sticky top-8 space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Summary
              </h2>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold text-slate-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span>Delivery ({deliveryMethod})</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryCost === 0
                      ? "Free"
                      : `$${deliveryCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-brand-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {user ? (
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-lg shadow-slate-900/20"
                >
                  {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block text-center w-full rounded-full bg-brand-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700 mt-6 shadow-lg shadow-brand-600/20"
                >
                  Sign In to Checkout
                </Link>
              )}

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mt-4 uppercase tracking-widest">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure 256-bit Encryption
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
