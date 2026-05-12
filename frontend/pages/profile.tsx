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
  Home,
  LogOut,
  X,
  Mail,
  Phone,
  Map,
  Hash,
  Lock,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in-up">
          <div className="mx-auto w-24 h-24 bg-surface-soft rounded-full flex items-center justify-center mb-6">
            <User size={48} className="text-muted" />
          </div>
          <h1 className="text-3xl font-bold text-text">Not signed in</h1>
          <p className="mt-2 text-muted">
            Please sign in to view your profile and orders.
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
        <title>My Profile | WonderCart</title>
        <meta
          name="description"
          content="View your orders, edit your profile, and manage your account at WonderCart."
        />
      </Head>

      <div className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up [animation-delay:100ms]">
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Total Orders</p>
                  <p className="text-3xl font-bold text-text mt-1">
                    {totalOrders}
                  </p>
                </div>
                <div className="h-12 w-12 bg-accent-soft rounded-full flex items-center justify-center">
                  <ShoppingBag size={24} className="text-accent" />
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Total Spent</p>
                  <p className="text-3xl font-bold text-text mt-1">
                    ${totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-accent-soft rounded-full flex items-center justify-center">
                  <CreditCard size={24} className="text-accent" />
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Member Since</p>
                  <p className="text-xl font-bold text-text mt-1">
                    {memberSince}
                  </p>
                </div>
                <div className="h-12 w-12 bg-accent-soft rounded-full flex items-center justify-center">
                  <Calendar size={24} className="text-accent" />
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Reward Points</p>
                  <p className="text-3xl font-bold text-text mt-1">1,250</p>
                </div>
                <div className="h-12 w-12 bg-accent-soft rounded-full flex items-center justify-center">
                  <Award size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden animate-fade-in-up [animation-delay:200ms]">
            <div className="relative h-32 bg-gradient-to-r from-accent to-accent-dark">
              <div className="absolute -bottom-12 left-6 flex items-end gap-4">
                <div className="relative">
                  <img
                    src={
                      user.avatar ||
                      `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-surface shadow-lg object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-surface rounded-full p-1 shadow-md border border-border">
                    <Edit3 size={14} className="text-accent" />
                  </button>
                </div>
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-text">{user.name}</h1>
                  <p className="text-muted text-sm flex items-center gap-1">
                    <Mail size={14} /> {user.email}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition flex items-center gap-2"
                >
                  {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  onClick={logout}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
            <div className="pt-16 pb-6 px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {user.phone && (
                  <div className="flex items-center gap-2 text-muted">
                    <Phone size={16} className="text-accent" /> {user.phone}
                  </div>
                )}
                {user.address && user.areaCode && (
                  <div className="flex items-center gap-2 text-muted">
                    <Home size={16} className="text-accent" /> {user.address},{" "}
                    {user.areaCode}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Profile Modal / Inline Form */}
          {isEditing && (
            <div className="bg-surface rounded-2xl border border-border shadow-lg p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <Settings size={20} className="text-accent" /> Edit Profile
              </h2>
              {editSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-accent-soft text-accent-dark text-sm font-medium">
                  ✅ Profile updated successfully!
                </div>
              )}
              {editError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                  ⚠️ {editError}
                </div>
              )}
              <form onSubmit={handleEditProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-surface-soft px-4 py-2.5 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-surface-soft px-4 py-2.5 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-surface-soft px-4 py-2.5 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) =>
                        setEditForm({ ...editForm, address: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-surface-soft px-4 py-2.5 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Area Code / ZIP
                    </label>
                    <input
                      type="text"
                      value={editForm.areaCode}
                      onChange={(e) =>
                        setEditForm({ ...editForm, areaCode: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-surface-soft px-4 py-2.5 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      New Password (optional)
                    </label>
                    <input
                      type="password"
                      value={editForm.password}
                      onChange={(e) =>
                        setEditForm({ ...editForm, password: e.target.value })
                      }
                      placeholder="Leave blank to keep current"
                      className="w-full rounded-xl border border-border bg-surface-soft px-4 py-2.5 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-full border border-border text-muted hover:bg-surface-soft transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-accent text-white font-semibold hover:bg-accent-dark transition shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Orders Section */}
          <div className="space-y-6 animate-fade-in-up [animation-delay:300ms]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                <Package size={24} className="text-accent" /> Order History
              </h2>
              <span className="px-4 py-1.5 rounded-full bg-surface-soft text-accent-dark text-sm font-semibold">
                {totalOrders} {totalOrders === 1 ? "order" : "orders"}
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-border border-t-accent rounded-full animate-spin"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-surface rounded-2xl border border-border p-12 text-center">
                <Package size={48} className="mx-auto text-muted mb-4" />
                <p className="text-text font-semibold text-lg">No orders yet</p>
                <p className="text-muted mt-1">
                  When you place an order, it will appear here.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-block rounded-full bg-accent px-6 py-2.5 text-white font-medium hover:bg-accent-dark transition"
                >
                  Start Shopping
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
                        <p className="text-xs text-muted flex items-center gap-1 mt-1">
                          <Clock size={12} />{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted uppercase">Total</p>
                          <p className="text-xl font-bold text-accent-dark">
                            ${order.totalPrice?.toFixed(2)}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.isPaid
                              ? "bg-accent-soft text-accent-dark"
                              : "bg-rose-100 text-rose-600"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </div>
                      </div>
                    </div>

                    {/* Order Body */}
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Items */}
                        <div>
                          <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Truck size={14} className="text-accent" /> Items
                          </h3>
                          <div className="space-y-3">
                            {order.orderItems?.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex gap-3 items-center"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover bg-surface-soft"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-text line-clamp-1">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-muted">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="text-sm font-semibold text-text">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                          <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-3 flex items-center gap-2">
                            <MapPin size={14} className="text-accent" />{" "}
                            Shipping Address
                          </h3>
                          {order.shippingAddress ? (
                            <div className="bg-surface-soft rounded-xl p-3 text-sm text-muted">
                              <p className="font-medium text-text">
                                {order.shippingAddress.fullName}
                              </p>
                              <p>{order.shippingAddress.street}</p>
                              <p>
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.zip}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-muted">
                              No address provided
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                        <Link
                          href={`/order/${order._id}`}
                          className="text-sm text-accent hover:underline flex items-center gap-1"
                        >
                          View details <ChevronRight size={14} />
                        </Link>
                        {!order.isPaid && (
                          <button className="text-sm bg-accent text-white px-4 py-1.5 rounded-full hover:bg-accent-dark transition">
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
          animation: fadeInUp 0.5s ease forwards;
        }
      `}</style>
    </>
  );
}
