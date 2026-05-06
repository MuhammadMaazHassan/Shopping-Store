import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Package, User, Clock, MapPin, CheckCircle, Truck, Edit3, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
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
    password: ""
  });
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        areaCode: user.areaCode || "",
        password: ""
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
        headers: { Authorization: `Bearer ${user.token}` }
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
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(editForm)
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
      <div className="mx-auto max-w-4xl py-20 px-4 text-center">
        <div className="mx-auto h-24 w-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <User size={40} className="text-slate-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">You are not signed in</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">Please sign in to view your profile and order history.</p>
        <Link href="/login" className="mt-8 inline-block rounded-full bg-brand-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile & Orders | WonderCart</title>
      </Head>

      <div className="mx-auto max-w-6xl space-y-10 py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header section */}
        <div className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 dark:bg-brand-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <img 
            src={user.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} 
            alt={user.name} 
            className="h-32 w-32 rounded-full border-4 border-white dark:border-slate-900 shadow-xl bg-brand-100 dark:bg-brand-900 object-cover z-10"
          />
          
          <div className="text-center sm:text-left z-10 space-y-2 flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-widest">
              <CheckCircle size={14} /> Verified Member
            </span>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {user.name}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              {user.email}
            </p>
            {user.phone && <p className="text-sm text-slate-500 dark:text-slate-400">{user.phone}</p>}
            
            <div className="pt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                  isEditing 
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {isEditing ? <Settings size={18} /> : <Edit3 size={18} />}
                {isEditing ? "Close Editor" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <form onSubmit={handleEditProfile} className="rounded-[2rem] border border-brand-200 dark:border-brand-900/30 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-brand-500/5 animate-fadeInDown">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Edit Profile Details</h2>
            
            {editSuccess && (
              <div className="mb-6 rounded-xl bg-green-50 dark:bg-green-500/10 p-4 text-sm font-bold text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                Profile updated successfully!
              </div>
            )}
            {editError && (
              <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-500/10 p-4 text-sm font-bold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                {editError}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</span>
                <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</span>
                <input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone</span>
                <input value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Address</span>
                <input value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Area Code / ZIP</span>
                <input value={editForm.areaCode} onChange={e => setEditForm({...editForm, areaCode: e.target.value})} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">New Password (Optional)</span>
                <input type="password" value={editForm.password} onChange={e => setEditForm({...editForm, password: e.target.value})} placeholder="Leave blank to keep current" className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500" />
              </label>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="submit" className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700 shadow-lg shadow-brand-500/30">
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Orders Section */}
        <div id="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Package className="text-brand-600 dark:text-brand-400" /> Order History
            </h2>
            <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold">
              {orders.length} Orders
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="mx-auto h-10 w-10 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-16 text-center">
              <Package size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-6" />
              <p className="text-xl font-bold text-slate-900 dark:text-white">No orders yet</p>
              <p className="mt-2 text-slate-500 dark:text-slate-400">When you buy something, it will appear here.</p>
              <Link href="/#shop" className="mt-6 inline-block rounded-full bg-slate-900 dark:bg-white px-6 py-3 text-sm font-bold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order, idx) => (
                <div key={idx} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                  {/* Order Header */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Order #{order._id}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Amount</p>
                      <p className="text-xl font-black text-brand-600 dark:text-brand-400">${order.totalPrice?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>

                  {/* Order Details: Items & Delivery */}
                  <div className="p-6 sm:p-8 grid lg:grid-cols-[2fr_1fr] gap-8">
                    
                    {/* Items List */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Items Ordered</h3>
                      {order.orderItems?.map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-slate-800" />
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-slate-700 dark:text-slate-300 pr-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Address */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-3">
                          <MapPin size={16} className="text-brand-600" /> Shipping Address
                        </h3>
                        {order.shippingAddress ? (
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                            <p className="font-bold text-slate-900 dark:text-white">{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">No address provided.</p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
