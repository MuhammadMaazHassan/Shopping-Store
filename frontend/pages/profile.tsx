import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Package,
  User,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  Edit3,
  Settings,
  ShoppingBag,
  Award,
  Calendar,
  ChevronRight,
  CreditCard,
  Home as HomeIcon,
  LogOut,
  X,
  Mail,
  Phone,
  Map,
  Hash,
  Lock,
  Bell,
  Globe,
  Sliders,
  Shield,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../contexts/AuthContext";

type NotificationKey = "orderUpdates" | "promotions" | "security" | "digest";

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "personal" | "settings">("orders");
  const [isEditing, setIsEditing] = useState(false);

  // Edit Profile State
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    areaCode: "",
    password: "",
  });
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState("");

  // Notification Preferences State (Persisted)
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    security: true,
    digest: false,
  });

  // Global Preferences State (Persisted)
  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "English",
    darkMode: false,
  });

  const [deactivateConfirm, setDeactivateConfirm] = useState(false);

  // Stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Recent";

  // Mount effects for data fetching & settings persistence
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        areaCode: user.areaCode || "",
        password: "",
      });
      fetchOrders();
    } else {
      setIsLoading(false);
    }

    // Load notification and preference selections
    const savedNotes = localStorage.getItem("notificationSettings");
    if (savedNotes) {
      try {
        setNotificationSettings(JSON.parse(savedNotes));
      } catch (e) {
        console.error(e);
      }
    }
    const savedPrefs = localStorage.getItem("userPreferences");
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs));
      } catch (e) {
        console.error(e);
      }
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:5000/api/orders/myorders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess(false);
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      updateUser({ ...user, ...data, token: user?.token });
      setEditSuccess(true);
      setTimeout(() => {
        setIsEditing(false);
        setEditSuccess(false);
      }, 2000);
    } catch (err: any) {
      setEditError(err.message);
    }
  };

  const handleToggleNotification = (key: NotificationKey) => {
    const updated = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    };
    setNotificationSettings(updated);
    localStorage.setItem("notificationSettings", JSON.stringify(updated));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    const updated = {
      ...preferences,
      [key]: value,
    };
    setPreferences(updated);
    localStorage.setItem("userPreferences", JSON.stringify(updated));
    
    // Simple dark mode class toggle helper
    if (key === "darkMode") {
      if (value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in-up">
          <div className="mx-auto w-24 h-24 bg-surface-soft rounded-full flex items-center justify-center mb-6">
            <User size={48} className="text-muted" />
          </div>
          <h1 className="text-3xl font-bold text-text">Not signed in</h1>
          <p className="mt-2 text-muted">
            Please sign in to view your profile and account settings.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-white font-semibold hover:bg-accent-dark transition shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Account Settings & Profile | TechShed</title>
        <meta
          name="description"
          content="Manage your personal settings, notification options, profile preferences, and view complete orders at TechShed."
        />
      </Head>

      <div className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Cover / Profile Banner */}
          <div className="bg-surface rounded-[2rem] border border-border shadow-sm overflow-hidden animate-fade-in-up">
            <div className="relative h-44 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600">
              <div className="absolute -bottom-14 left-8 flex flex-col sm:flex-row sm:items-end gap-5">
                <div className="relative">
                  <img
                    src={
                      user.avatar ||
                      `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    width={112}
                    height={112}
                    className="rounded-full border-4 border-surface shadow-xl object-cover bg-white w-28 h-28"
                  />
                  <span className="absolute bottom-1 right-1 bg-green-500 w-4.5 h-4.5 rounded-full border-2 border-surface animate-pulse"></span>
                </div>
                <div className="mb-2">
                  <h1 className="text-3xl font-bold text-text flex items-center gap-2">
                    {user.name}
                    <span className="inline-flex px-2.5 py-0.5 bg-brand-100 text-brand-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      Verified
                    </span>
                  </h1>
                  <p className="text-muted text-sm flex items-center gap-1.5 mt-1">
                    <Mail size={14} className="text-slate-400" /> {user.email}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={logout}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 text-sm font-bold text-white hover:bg-white/30 transition-all flex items-center gap-2 shadow-sm"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
            <div className="h-16"></div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up [animation-delay:100ms]">
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted uppercase tracking-wider">Total Orders</p>
                  <p className="text-3xl font-bold text-text mt-1">{totalOrders}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-full flex items-center justify-center">
                  <ShoppingBag size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted uppercase tracking-wider">Total Spent</p>
                  <p className="text-3xl font-bold text-text mt-1">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center">
                  <CreditCard size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted uppercase tracking-wider">Member Since</p>
                  <p className="text-lg font-bold text-text mt-1">{memberSince}</p>
                </div>
                <div className="h-12 w-12 bg-purple-50 dark:bg-purple-950/50 rounded-full flex items-center justify-center">
                  <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted uppercase tracking-wider">Reward Points</p>
                  <p className="text-3xl font-bold text-text mt-1">2,450</p>
                </div>
                <div className="h-12 w-12 bg-amber-50 dark:bg-amber-950/50 rounded-full flex items-center justify-center">
                  <Award size={24} className="text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Workspace: Sidebar & Interactive Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start animate-fade-in-up [animation-delay:200ms]">
            
            {/* Sidebar Navigation */}
            <aside className="bg-surface rounded-[2rem] border border-border p-6 shadow-sm space-y-2 sticky top-8">
              <div className="px-3 py-2 text-xs font-bold text-muted uppercase tracking-widest border-b border-border mb-4">
                User Navigation
              </div>
              <button
                type="button"
                onClick={() => { setActiveTab("orders"); setIsEditing(false); }}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "orders"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <Package size={18} />
                <span>Order History</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${activeTab === "orders" ? "bg-white/30 text-white" : "bg-surface-soft text-muted font-bold"}`}>
                  {totalOrders}
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => { setActiveTab("personal"); }}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "personal"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <User size={18} />
                <span>Personal Info</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("settings"); setIsEditing(false); }}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "settings"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <Settings size={18} />
                <span>Account & Settings</span>
              </button>
            </aside>

            {/* Dynamic Content Panel */}
            <main className="space-y-8 flex-1">
              
              {/* Tab 1: Orders History */}
              {activeTab === "orders" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                      <Package size={24} className="text-brand-600" /> Transaction Order History
                    </h2>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-surface rounded-2xl border border-border p-16 text-center shadow-sm">
                      <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4 animate-bounce-soft" />
                      <p className="text-text font-bold text-xl">No purchase logs available</p>
                      <p className="text-muted mt-2 max-w-sm mx-auto text-sm">
                        When you place order checkouts in the cart section, the detailed items history will populate here automatically.
                      </p>
                      <Link
                        href="/"
                        className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-2.5 text-white font-semibold hover:bg-brand-700 transition shadow-md"
                      >
                        Browse Store Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="bg-surface rounded-2xl border border-border shadow-sm hover:shadow-md transition overflow-hidden"
                        >
                          {/* Order Header */}
                          <div className="bg-surface-soft px-6 py-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
                            <div>
                              <p className="text-sm font-mono text-muted">
                                Order #{order._id?.slice(-8)}
                              </p>
                              <p className="text-xs text-muted flex items-center gap-1.5 mt-1">
                                <Clock size={12} className="text-slate-400" />
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  { year: "numeric", month: "short", day: "numeric" },
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xs text-muted uppercase">Total Price</p>
                                <p className="text-xl font-bold text-brand-600">
                                  ${order.totalPrice?.toFixed(2)}
                                </p>
                              </div>
                              <div
                                className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                  order.isPaid
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                  }`}
                              >
                                {order.isPaid ? "Paid Secured" : "Payment Pending"}
                              </div>
                            </div>
                          </div>

                          {/* Order Body */}
                          <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-8">
                              {/* Items */}
                              <div>
                                <h3 className="text-xs font-bold text-text uppercase tracking-widest mb-3 flex items-center gap-2 text-slate-500">
                                  <Truck size={14} className="text-brand-600" /> Purchased Items List
                                </h3>
                                <div className="space-y-3.5">
                                  {order.orderItems?.map((item: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="flex gap-4 items-center"
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-100 p-1"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-text truncate">
                                          {item.name}
                                        </p>
                                        <p className="text-xs text-muted font-medium mt-0.5">
                                          Qty: {item.quantity} · Brand: {item.brand || "TechShed"}
                                        </p>
                                      </div>
                                      <p className="text-sm font-bold text-text">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div>
                                <h3 className="text-xs font-bold text-text uppercase tracking-widest mb-3 flex items-center gap-2 text-slate-500">
                                  <MapPin size={14} className="text-brand-600" /> Shipping Destination Address
                                </h3>
                                {order.shippingAddress ? (
                                  <div className="bg-surface-soft rounded-2xl p-4 border border-border text-sm text-muted leading-relaxed space-y-1">
                                    <p className="font-semibold text-text">
                                      {order.shippingAddress.fullName}
                                    </p>
                                    <p className="flex items-center gap-1.5">
                                      <MapPin size={12} className="text-slate-400" />
                                      {order.shippingAddress.street}
                                    </p>
                                    <p className="font-medium text-slate-600">
                                      {order.shippingAddress.city}, ZIP: {order.shippingAddress.zip}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted">
                                    No shipping coordinates provided
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                              <Link
                                href={`/order/${order._id}`}
                                className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
                              >
                                View Order Page details <ChevronRight size={14} />
                              </Link>
                              {!order.isPaid && (
                                <button
                                  type="button"
                                  className="text-xs font-bold uppercase tracking-wider bg-brand-600 text-white px-5 py-2 rounded-full hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all shadow-md shadow-brand-500/20"
                                >
                                  Complete Payment
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Personal Information */}
              {activeTab === "personal" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                      <User size={24} className="text-brand-600" /> Personal Identity Profile
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                    >
                      {isEditing ? <X size={14} /> : <Edit3 size={14} />}
                      {isEditing ? "View Details" : "Edit Personal Info"}
                    </button>
                  </div>

                  {editSuccess && (
                    <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center gap-2 animate-scale-in">
                      <CheckCircle size={18} /> Update complete! Personal details synchronized on MERN server.
                    </div>
                  )}
                  {editError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2 animate-scale-in">
                      <AlertCircle size={18} /> {editError}
                    </div>
                  )}

                  {!isEditing ? (
                    <div className="bg-surface rounded-[2rem] border border-border p-8 shadow-sm space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="border border-border rounded-2xl p-5 bg-surface-soft">
                          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5">Registered Name</p>
                          <p className="text-lg font-bold text-text flex items-center gap-2">
                            <User size={18} className="text-brand-600" /> {user.name}
                          </p>
                        </div>
                        <div className="border border-border rounded-2xl p-5 bg-surface-soft">
                          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5">Primary Email</p>
                          <p className="text-lg font-bold text-text flex items-center gap-2 truncate">
                            <Mail size={18} className="text-brand-600" /> {user.email}
                          </p>
                        </div>
                        <div className="border border-border rounded-2xl p-5 bg-surface-soft">
                          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5">Contact Phone</p>
                          <p className="text-lg font-bold text-text flex items-center gap-2">
                            <Phone size={18} className="text-brand-600" /> {user.phone || "Not set yet"}
                          </p>
                        </div>
                        <div className="border border-border rounded-2xl p-5 bg-surface-soft">
                          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5">Delivery Area Code</p>
                          <p className="text-lg font-bold text-text flex items-center gap-2">
                            <Hash size={18} className="text-brand-600" /> {user.areaCode || "Not set yet"}
                          </p>
                        </div>
                        <div className="sm:col-span-2 border border-border rounded-2xl p-5 bg-surface-soft">
                          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5">Default Shipping Address</p>
                          <p className="text-base font-semibold text-text flex items-center gap-2">
                            <MapPin size={18} className="text-brand-600 shrink-0" /> {user.address || "No default address set. Edit your profile to add default shipping coordinates."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-surface rounded-[2rem] border border-border p-8 shadow-sm">
                      <form onSubmit={handleEditProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                              Full Profile Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, name: e.target.value })
                                }
                                className="w-full rounded-2xl border border-border bg-surface-soft pl-12 pr-4 py-3.5 text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                              <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, email: e.target.value })
                                }
                                className="w-full rounded-2xl border border-border bg-surface-soft pl-12 pr-4 py-3.5 text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                              <input
                                type="tel"
                                value={editForm.phone}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, phone: e.target.value })
                                }
                                className="w-full rounded-2xl border border-border bg-surface-soft pl-12 pr-4 py-3.5 text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                              Area Code / ZIP
                            </label>
                            <div className="relative">
                              <Hash className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                              <input
                                type="text"
                                value={editForm.areaCode}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, areaCode: e.target.value })
                                }
                                className="w-full rounded-2xl border border-border bg-surface-soft pl-12 pr-4 py-3.5 text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                              Default Shipping Coordinates
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                              <input
                                type="text"
                                value={editForm.address}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, address: e.target.value })
                                }
                                className="w-full rounded-2xl border border-border bg-surface-soft pl-12 pr-4 py-3.5 text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                              Change Password (leave blank to retain current)
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                              <input
                                type="password"
                                value={editForm.password}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, password: e.target.value })
                                }
                                placeholder="Enter secure combination"
                                className="w-full rounded-2xl border border-border bg-surface-soft pl-12 pr-4 py-3.5 text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 rounded-full border border-border text-slate-600 hover:bg-surface-soft font-semibold transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-brand-500/20 animate-pulse-glow"
                          >
                            Save Synchronized Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Detailed Account Settings Section */}
              {activeTab === "settings" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                      <Settings size={24} className="text-brand-600" /> Comprehensive System Settings
                    </h2>
                  </div>

                  {/* 1. Notification Section & Related Options */}
                  <div className="bg-surface rounded-[2rem] border border-border p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <div className="p-2.5 bg-brand-50 dark:bg-indigo-950/40 rounded-xl text-brand-600 dark:text-indigo-400">
                        <Bell size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text">Notification Alerts Preferences</h3>
                        <p className="text-xs text-muted">Configure how and when you receive order, security, and promotional logs.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Toggle Option 1: Order Updates */}
                      <div className="flex items-center justify-between p-4 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                        <div className="max-w-[80%]">
                          <h4 className="text-sm font-bold text-text">Order & Delivery Status Updates</h4>
                          <p className="text-xs text-muted mt-1">Get real-time push logs and invoice records when orders ship, transit, or deliver.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleNotification("orderUpdates")}
                          className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-all duration-300 ${
                            notificationSettings.orderUpdates ? "bg-brand-600 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"></span>
                        </button>
                      </div>

                      {/* Toggle Option 2: Promotions */}
                      <div className="flex items-center justify-between p-4 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                        <div className="max-w-[80%]">
                          <h4 className="text-sm font-bold text-text">Promotional Offers & Flash Discounts</h4>
                          <p className="text-xs text-muted mt-1">Receive early updates regarding coupon releases, global sales, and seasonal spring catalogs.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleNotification("promotions")}
                          className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-all duration-300 ${
                            notificationSettings.promotions ? "bg-brand-600 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"></span>
                        </button>
                      </div>

                      {/* Toggle Option 3: Security */}
                      <div className="flex items-center justify-between p-4 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                        <div className="max-w-[80%]">
                          <h4 className="text-sm font-bold text-text">Account Security & Audit Alerts</h4>
                          <p className="text-xs text-muted mt-1">Get high-priority alerts regarding account password changes, token updates, and suspicious sign-ins.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleNotification("security")}
                          className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-all duration-300 ${
                            notificationSettings.security ? "bg-brand-600 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"></span>
                        </button>
                      </div>

                      {/* Toggle Option 4: Digest */}
                      <div className="flex items-center justify-between p-4 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                        <div className="max-w-[80%]">
                          <h4 className="text-sm font-bold text-text">Weekly Store Highlights Digest</h4>
                          <p className="text-xs text-muted mt-1">A curated weekly email showcasing newly imported footwear, apparel, and electronics drops.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleNotification("digest")}
                          className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-all duration-300 ${
                            notificationSettings.digest ? "bg-brand-600 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"></span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. Global Personal Store Preferences Settings */}
                  <div className="bg-surface rounded-[2rem] border border-border p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <div className="p-2.5 bg-brand-50 dark:bg-indigo-950/40 rounded-xl text-brand-600 dark:text-indigo-400">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text">Global Store Preferences</h3>
                        <p className="text-xs text-muted">Customize catalog currency, storefront language, and screen display properties.</p>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Currency Preferences */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                          Store Currency
                        </label>
                        <select
                          value={preferences.currency}
                          onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                          className="w-full rounded-2xl border border-border bg-surface-soft px-4 py-3 text-sm font-semibold text-text focus:border-brand-500 focus:outline-none"
                        >
                          <option value="USD">USD ($) - US Dollar</option>
                          <option value="EUR">EUR (€) - Euro</option>
                          <option value="GBP">GBP (£) - British Pound</option>
                          <option value="PKR">PKR (Rs) - Pakistani Rupee</option>
                        </select>
                      </div>

                      {/* Language Selection */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                          Interface Language
                        </label>
                        <select
                          value={preferences.language}
                          onChange={(e) => handlePreferenceChange("language", e.target.value)}
                          className="w-full rounded-2xl border border-border bg-surface-soft px-4 py-3 text-sm font-semibold text-text focus:border-brand-500 focus:outline-none"
                        >
                          <option value="English">English (US)</option>
                          <option value="Spanish">Spanish (ES)</option>
                          <option value="Urdu">Urdu (اردو)</option>
                        </select>
                      </div>

                      {/* Toggle Option: Dark Mode */}
                      <div className="sm:col-span-2 flex items-center justify-between p-4 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition mt-2">
                        <div>
                          <h4 className="text-sm font-bold text-text">Enable Dark Theme</h4>
                          <p className="text-xs text-muted mt-1">Switch between beautiful dark mode theme and clean contrast system palettes.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-all duration-300 ${
                            theme === "dark" ? "bg-brand-600 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"></span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3. Danger Zone */}
                  <div className="bg-surface rounded-[2rem] border border-rose-200 p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-rose-100 pb-4">
                      <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600">
                        <Trash2 size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-rose-800">Danger Operations Area</h3>
                        <p className="text-xs text-rose-600">Deactivating or modifying administrative records cannot be rolled back.</p>
                      </div>
                    </div>

                    {!deactivateConfirm ? (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                        <div className="max-w-[70%]">
                          <h4 className="text-sm font-bold text-rose-900">Deactivate Account Credentials</h4>
                          <p className="text-xs text-rose-700 mt-1">This shuts down your account access, clears active carts, and locks transaction history logs.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDeactivateConfirm(true)}
                          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                        >
                          Request Deactivation
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200 space-y-4 animate-scale-in">
                        <h4 className="text-sm font-bold text-rose-900">Are you absolutely sure you want to deactivate?</h4>
                        <p className="text-xs text-rose-700 leading-relaxed">
                          By continuing, you acknowledge that all order logs and secure addresses will be archived. You can reactive your credentials later by signing back in.
                        </p>
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => setDeactivateConfirm(false)}
                            className="px-4 py-2 border border-rose-200 rounded-full text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                          >
                            Go Back
                          </button>
                          <button
                            type="button"
                            onClick={() => alert("Deactivation request generated! Standard simulation complete.")}
                            className="px-5 py-2 bg-rose-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition"
                          >
                            Confirm Archive
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out forwards;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
}
