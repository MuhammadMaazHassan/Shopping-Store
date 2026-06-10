import Head from "next/head";
import Link from "next/link";

export default function DeliveryPage() {
  return (
    <>
      <Head>
        <title>Delivery & Shipping | TechShed</title>
      </Head>

      <div className="mx-auto max-w-4xl space-y-8 bg-white">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-semibold text-slate-900">
            Fast & Reliable Delivery
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            We offer flexible shipping options to get your products to you
            quickly and safely.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              name: "Standard Delivery",
              time: "4-7 business days",
              price: "FREE",
              description:
                "Perfect for non-urgent orders. Your items arrive safely and on schedule.",
              color: "border-green-200 bg-green-50",
              icon: "📦",
            },
            {
              name: "Express Delivery",
              time: "2-3 business days",
              price: "$9.99",
              description:
                "For when you need your items sooner. Priority processing and fast shipping.",
              color: "border-green-200 bg-green-50",
              icon: "🚚",
            },
            {
              name: "Overnight Delivery",
              time: "Next business day",
              price: "$24.99",
              description:
                "Get your order tomorrow morning. Available for most products.",
              color: "border-green-200 bg-green-50",
              icon: "⚡",
            },
          ].map((option) => (
            <div
              key={option.name}
              className={`rounded-[1.5rem] border-2 ${option.color} p-8`}
            >
              <div className="mb-4 text-4xl">{option.icon}</div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {option.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-brand-700">
                {option.time}
              </p>
              <p className="mt-4 text-lg font-bold text-slate-900">
                {option.price}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            How Delivery Works
          </h2>
          <div className="space-y-4">
            {[
              {
                num: "1",
                title: "Place Your Order",
                desc: "Add items to your cart and checkout securely. Choose your delivery option.",
              },
              {
                num: "2",
                title: "Order Confirmation",
                desc: "You'll receive a confirmation email with tracking information within 2 hours.",
              },
              {
                num: "3",
                title: "Preparation",
                desc: "Our team picks, checks, and packages your order with care.",
              },
              {
                num: "4",
                title: "Shipped",
                desc: "Your package ships and you receive tracking updates via email.",
              },
              {
                num: "5",
                title: "On the Way",
                desc: "Track your package in real-time from warehouse to your door.",
              },
              {
                num: "6",
                title: "Delivered",
                desc: "Receive your package and enjoy your purchase!",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Shipping Policy
          </h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>✓ All orders are carefully packed and insured.</p>
            <p>✓ Free standard shipping on all orders over $50.</p>
            <p>✓ We ship to over 100 countries worldwide.</p>
            <p>✓ Track your package with our real-time tracking system.</p>
            <p>✓ Issues? Our support team is available 24/7.</p>
            <p>✓ International shipping times vary by location.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex rounded-full bg-green-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Back to shopping
          </Link>
        </div>
      </div>
    </>
  );
}
