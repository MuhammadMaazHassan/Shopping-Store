import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
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
  Menu,
  X,
  Search,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const notifications = [
  {
    id: "note-1",
    title: "Global sale live now",
    description:
      "New discounts are available in Footwear, Home, Electronics, and Food collections.",
    time: "Just now",
    unread: true,
  },
  {
    id: "note-2",
    title: "Free shipping unlocked",
    description: "Spend $75 or more to qualify for free worldwide shipping.",
    time: "2h ago",
    unread: false,
  },
  {
    id: "note-3",
    title: "Fresh arrivals: Spring edit",
    description:
      "New global styles and travel essentials have arrived in store.",
    time: "Yesterday",
    unread: false,
  },
];

const navLinks = [
  { name: "Shop", href: "/#shop" },
  { name: "Collections", href: "/#collections" },
  { name: "Highlights", href: "/#highlights" },
];

export default function Navbar({ itemCount }: { itemCount: number }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevItemCount, setPrevItemCount] = useState(itemCount);

  // Refs for click outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation for cart badge
  useEffect(() => {
    if (itemCount !== prevItemCount) {
      setPrevItemCount(itemCount);
    }
  }, [itemCount, prevItemCount]);

  // Click outside handlers 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !(event.target as Element).closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu or search is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    router.push("/");
  };

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery, router],
  );

  const isActiveLink = (href: string) => {
    if (href === "/") return router.pathname === "/";
    if (href.startsWith("/#")) return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-slate-900 transition hover:opacity-80 dark:text-white"
            >
              Wonder
              <span className="text-brand-600 dark:text-brand-400">Cart</span>
            </Link>

            <nav className="hidden gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 ${isActiveLink(link.href)
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                    }`}
                >
                  {link.name}
                  {isActiveLink(link.href) && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-600 dark:bg-brand-400" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search (Desktop) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:flex"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white ring-2 ring-white transition-all duration-200 hover:scale-110 dark:ring-slate-950"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Link
                href="/notifications"
                className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="View notifications"
              >
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
              </Link>
            </div>

            <div className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

            {/* User Menu / Auth */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-full ring-2 ring-transparent transition-all focus:outline-none hover:ring-brand-200 dark:hover:ring-brand-800"
                  aria-label="User menu"
                >
                  <img
                    src={
                      user.avatar ||
                      `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    className="h-9 w-9 rounded-full border border-slate-200 bg-brand-100 object-cover dark:border-slate-700 dark:bg-brand-900"
                  />
                </button>

                <div
                  className={`absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 ${isDropdownOpen
                      ? "pointer-events-auto scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                    }`}
                >
                  <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link
                      href="/profile#orders"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                    >
                      <Package size={18} /> Orders
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/settings");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                    >
                      <Settings size={18} /> Settings
                    </button>
                  </div>
                  <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-1 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-menu-button rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${isMobileMenuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-950 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <span className="text-xl font-black text-slate-900 dark:text-white">
              Wonder<span className="text-brand-600">Cart</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(
                    `/search?q=${encodeURIComponent(searchQuery.trim())}`,
                  );
                  setIsMobileMenuOpen(false);
                  setSearchQuery("");
                }
              }}
              className="mb-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-brand-400"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mb-1 flex items-center rounded-xl px-3 py-3 text-base font-semibold transition-colors ${isActiveLink(link.href)
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-1 flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cart
              {itemCount > 0 && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            {!user && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 rounded-full bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal (Desktop) */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 transition-all duration-200 ${isSearchOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />
        <div
          className={`relative w-full max-w-2xl transform overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 ${isSearchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
        >
          <form onSubmit={handleSearch} className="flex items-center p-2">
            <Search className="ml-3 h-5 w-5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="flex-1 bg-transparent px-4 py-4 text-lg outline-none placeholder:text-slate-400 dark:text-white"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="mr-2 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </form>
          {searchQuery.trim() && (
            <div className="border-t border-slate-100 p-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Press Enter to search for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}
