import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Brand & Desc */}
        <div className="space-y-4">
          <Link
            href="/"
            className="text-2xl font-extrabold uppercase tracking-widest text-white hover:opacity-85 transition"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            TechShed
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium electronic storefront presenting incredible prices on computers, tablets, mobile accessories, audio gear, and drones.
          </p>
          <div className="text-xs text-slate-500 space-y-1">
            <p>Customer Care: 123-456-7890</p>
            <p>Support: support@techshed.com</p>
          </div>
        </div>

        {/* Column 2: Shop Category Filters */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-black uppercase tracking-widest">Shop Collections</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/category/Electronics" className="hover:text-white transition">Computers & Tablets</Link></li>
            <li><Link href="/category/Electronics" className="hover:text-white transition">Drones & Cameras</Link></li>
            <li><Link href="/category/Electronics" className="hover:text-white transition">Audio & Speakers</Link></li>
            <li><Link href="/category/Electronics" className="hover:text-white transition">Mobile & Smartphones</Link></li>
            <li><Link href="/category/Sale" className="hover:text-rose-500 transition text-rose-500 font-semibold">Limited Hot Sales</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Info */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-black uppercase tracking-widest">Customer Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-white transition">About Our Store</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="/help" className="hover:text-white transition">Help Center & FAQ</Link></li>
            <li><Link href="/delivery" className="hover:text-white transition">Shipping & Delivery Info</Link></li>
            <li><Link href="/settings" className="hover:text-white transition">Personal Settings</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-black uppercase tracking-widest font-sans">TechShed Newsletter</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Subscribe to acquire dynamic updates, hot deal listings, and early holiday promotional coupons.
          </p>
          <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email here *"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-full py-2.5 transition active:scale-95"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 TechShed Store. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-slate-400 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-400 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
