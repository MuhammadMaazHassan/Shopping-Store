import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Bell,
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const notifications = [
  {
    id: "note-1",
    title: "Global sale live now",
    description:
      "New discounts are available in Footwear, Home, Electronics, and Food collections.",
    time: "Just now",
  },
  {
    id: "note-2",
    title: "Free shipping unlocked",
    description: "Spend $75 or more to qualify for free worldwide shipping.",
    time: "2h ago",
  },
  {
    id: "note-3",
    title: "Fresh arrivals: Spring edit",
    description:
      "New global styles and travel essentials have arrived in store.",
    time: "Yesterday",
  },
];

export default function Navbar({ itemCount }: { itemCount: number }) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-green-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter"
          >
            Wonder
            <span className="text-brand-600 dark:text-brand-400">Cart</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#shop"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              Shop
            </Link>
            <Link
              href="/#collections"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              Collections
            </Link>
            <Link
              href="/#highlights"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              Highlights
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/cart"
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {itemCount}
              </span>
            )}
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen((current) => !current)}
              className="relative rounded-full p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="View notifications"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 max-w-xs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 z-50">
                <div className="bg-brand-600 px-5 py-4 text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em]">
                    <Sparkles size={16} /> Live updates
                  </div>
                  <p className="mt-2 text-sm text-brand-100">
                    Stay in the loop with every global launch.
                  </p>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.map((note) => (
                    <div
                      key={note.id}
                      className="px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                    >
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {note.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {note.description}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                        {note.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-3 text-sm text-slate-500 dark:text-slate-400">
                  New updates every hour for trending collections.
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none ml-1 rounded-full ring-2 ring-transparent hover:ring-brand-200 dark:hover:ring-brand-900 transition-all"
              >
                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
                  }
                  alt={user.name}
                  className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900 border border-slate-200 dark:border-slate-700 object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 rounded-xl transition"
                    >
                      <LayoutDashboard size={18} /> Profile
                    </Link>
                    <Link
                      href="/profile#orders"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 rounded-xl transition"
                    >
                      <Package size={18} /> Orders
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 rounded-xl transition">
                      <Settings size={18} /> Settings
                    </button>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-1 rounded-full bg-slate-900 dark:bg-white px-5 py-2.5 text-sm font-bold text-white dark:text-slate-900 shadow-sm transition hover:bg-slate-800 dark:hover:bg-slate-100"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
