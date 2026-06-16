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
  ChevronDown,
  User,
  Heart,
  Truck,
  Headphones,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Sample notifications data (improved structure)
const notifications = [
  {
    id: "note-1",
    title: "Global sale live now",
    description:
      "New discounts are available in Footwear, Home, Electronics, and Food collections.",
    time: "Just now",
    unread: true,
    link: "/sale",
  },
  {
    id: "note-2",
    title: "Free shipping unlocked",
    description: "Spend $75 or more to qualify for free worldwide shipping.",
    time: "2h ago",
    unread: false,
    link: "/cart",
  },
  {
    id: "note-3",
    title: "Fresh arrivals: Spring edit",
    description:
      "New global styles and travel essentials have arrived in store.",
    time: "Yesterday",
    unread: false,
    link: "/collections/spring",
  },
];

const navLinks = [
  { name: "Shop", href: "/shop", dropdown: true },
  { name: "Collections", href: "/collections", dropdown: false },
  { name: "Highlights", href: "/highlights", dropdown: false },
  { name: "Sale", href: "/sale", dropdown: false, isSale: true },
];

const categoryLinks = [
  { name: "Shop All", href: "/shop" },
  { name: "Electronics", href: "/category/Electronics" },
  { name: "Apparel", href: "/category/Apparel" },
  { name: "Footwear", href: "/category/Footwear" },
  { name: "Accessories", href: "/category/Accessories" },
  { name: "Mobile", href: "/category/Mobile" },
  { name: "Home & Living", href: "/category/Home & Living" },
  { name: "Fitness", href: "/category/Fitness" },
];

export default function Navbar({ itemCount }: { itemCount: number }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Refs for click outside handling
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
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
    setIsUserMenuOpen(false);
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

  const handleDropdownEnter = (linkName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(linkName);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      {/* Enhanced Top Utility Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs font-medium py-2.5 px-4 hidden lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <Truck className="h-3 w-3" />
              <span>Free Shipping over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-3 w-3" />
              <span>24/7 Support</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-300">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
            <Link href="/help" className="hover:text-white transition">
              Help Center
            </Link>
            <Link href="/track-order" className="hover:text-white transition">
              Track Order
            </Link>
            <div className="h-4 w-px bg-gray-600" />
            <span className="flex items-center gap-1">
              <span>Need help?</span>
              <span className="font-bold">+1 (555) 123-4567</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header with Dynamic Styling */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95"
            : "border-b border-slate-200/60 bg-white/90 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-950/90"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Name Bar - Perfectly Centered & Responsive */}
          <div className="flex items-center gap-3 lg:gap-8">
            <Link
              href="/"
              className="group relative flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              {/* Brand Icon */}
              <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 shadow-md transition-all group-hover:shadow-lg">
                <span className="text-lg font-black text-white">T</span>
              </div>
              {/* Brand Name with Perfect Typography */}
              <div className="flex flex-col">
                <span
                  className="text-xl font-black uppercase tracking-tighter text-slate-900 transition dark:text-white lg:text-2xl"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  TechShed
                </span>
                <span className="hidden text-[9px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 lg:block">
                  Premium Electronics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Dropdowns */}
            <nav className="hidden gap-1 lg:flex">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && handleDropdownEnter(link.name)
                  }
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActiveLink(link.href)
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400"
                        : link.isSale
                          ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {isActiveLink(link.href) && !link.dropdown && (
                      <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-600 dark:bg-brand-400" />
                    )}
                  </Link>

                  {/* Dropdown Menu for Shop */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-200">
                      <div className="grid gap-1">
                        <Link
                          href="/shop/all"
                          className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          All Products
                        </Link>
                        <Link
                          href="/shop/new-arrivals"
                          className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          New Arrivals
                        </Link>
                        <Link
                          href="/shop/best-sellers"
                          className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Best Sellers
                        </Link>
                        <div className="my-1 h-px bg-slate-200 dark:bg-slate-800" />
                        <Link
                          href="/shop/deals"
                          className="rounded-xl px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400"
                        >
                          🔥 Today's Deals
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Icons Group */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button (Desktop) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden rounded-full p-2 text-slate-600 transition-all hover:bg-slate-100 hover:scale-105 dark:text-slate-300 dark:hover:bg-slate-800 lg:flex"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="hidden rounded-full p-2 text-slate-600 transition-all hover:bg-slate-100 hover:scale-105 dark:text-slate-300 dark:hover:bg-slate-800 sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-slate-600 transition-all hover:bg-slate-100 hover:scale-105 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 text-slate-600 transition-all hover:bg-slate-100 hover:scale-105 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative rounded-full p-2 text-slate-600 transition-all hover:bg-slate-100 hover:scale-105 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
              </button>

              {/* Notifications Panel */}
              <div
                className={`absolute right-0 mt-3 w-80 origin-top-right rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 ${
                  isNotificationsOpen
                    ? "pointer-events-auto scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                  <button className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={notification.link}
                      onClick={() => setIsNotificationsOpen(false)}
                      className={`block border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 ${
                        notification.unread
                          ? "bg-brand-50/50 dark:bg-brand-950/30"
                          : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {notification.description}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-brand-500" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-3 dark:border-slate-800">
                  <Link
                    href="/notifications"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="block text-center text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-700 lg:block" />

            {/* User Menu / Auth */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full ring-2 ring-transparent transition-all focus:outline-none hover:ring-brand-200 dark:hover:ring-brand-800"
                  aria-label="User menu"
                >
                  <div className="relative">
                    <img
                      src={
                        user.avatar ||
                        `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
                      }
                      alt={user.name}
                      className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm dark:border-slate-800"
                    />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900" />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`hidden text-slate-600 transition-transform duration-200 dark:text-slate-400 lg:block ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 ${
                    isUserMenuOpen
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
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <User size={18} /> My Profile
                    </Link>
                    <Link
                      href="/profile#orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Package size={18} /> My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Heart size={18} /> Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        router.push("/settings");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
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
              <div className="hidden gap-2 sm:flex">
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-menu-button rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <div className="hidden border-t border-slate-200/50 bg-slate-50/50 dark:border-slate-800/50 dark:bg-slate-900/30 lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-8 py-2.5">
            {categoryLinks.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/sale"
              className="text-xs font-bold uppercase tracking-wider text-rose-500 transition-colors hover:text-rose-600 dark:text-rose-400"
            >
              🔥 Flash Sale
            </Link>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
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
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-950 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div>
              <span
                className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                TechShed
              </span>
              <p className="text-[10px] text-brand-600 dark:text-brand-400">
                Premium Electronics
              </p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Search Bar */}
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
              className="mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </form>

            {/* Navigation Links */}
            <div className="space-y-1">
              {[...navLinks, ...categoryLinks].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActiveLink(link.href)
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400"
                      : link.name === "Sale"
                        ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="my-4 h-px bg-slate-200 dark:bg-slate-800" />

            {/* User Section */}
            {user ? (
              <div className="space-y-1">
                <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <img
                    src={
                      user.avatar ||
                      `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User size={20} /> My Profile
                </Link>
                <Link
                  href="/profile#orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Package size={20} /> My Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Heart size={20} /> Wishlist
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Settings size={20} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20"
                >
                  <LogOut size={20} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-full bg-slate-100 px-4 py-3 text-center text-base font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-center text-base font-bold text-white shadow-sm"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Search Modal (Desktop) */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 transition-all duration-200 ${
          isSearchOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setIsSearchOpen(false)}
        />
        <div
          className={`relative w-full max-w-2xl transform overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 ${
            isSearchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <form onSubmit={handleSearch}>
            <div className="flex items-center p-2">
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
            </div>
          </form>

          {/* Search Suggestions */}
          {searchQuery.trim() && (
            <div className="border-t border-slate-100 p-4 dark:border-slate-800">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Quick suggestions
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "Laptop",
                  "Headphones",
                  "Smartphone",
                  "Monitor",
                  "Keyboard",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setTimeout(
                        () => handleSearch(new Event("submit") as any),
                        0,
                      );
                    }}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-brand-100 hover:text-brand-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery.trim() && (
            <div className="border-t border-slate-100 p-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Press Enter to search for "
              <strong className="text-brand-600">{searchQuery}</strong>"
            </div>
          )}
        </div>
      </div>
    </>
  );
}
