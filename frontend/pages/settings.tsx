import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  User,
  Settings,
  Mail,
  Phone,
  Hash,
  MapPin,
  Lock,
  Bell,
  Globe,
  Trash2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Shield,
  Sliders,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../contexts/AuthContext";

type NotificationKey = "orderUpdates" | "promotions" | "security" | "digest";

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<"notifications" | "personal" | "preferences" | "security">("notifications");
  const [isProcessing, setIsProcessing] = useState(false);

  // Edit Profile State (Tab 2)
  const [editForm, setEditForm] = useState({
    phone: "",
    address: "",
    areaCode: "",
  });
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState("");

  // Security Modification States (Tab 4)
  const [securityName, setSecurityName] = useState("");
  const [securityEmail, setSecurityEmail] = useState("");
  const [securityPassword, setSecurityPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [securitySuccess, setSecuritySuccess] = useState("");
  const [securityError, setSecurityError] = useState("");

  // Lockout State variables
  const [nameLockoutDays, setNameLockoutDays] = useState(0);
  const [nameNextChangeDate, setNameNextChangeDate] = useState("");

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

  const checkNameLockout = () => {
    if (!user) return;
    const lastChange = localStorage.getItem(`lastNameChangeDate_${user._id}`);
    if (lastChange) {
      const elapsedMs = new Date().getTime() - new Date(lastChange).getTime();
      const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
      if (elapsedDays < 40) {
        setNameLockoutDays(40 - elapsedDays);
        const nextDate = new Date(new Date(lastChange).getTime() + 40 * 24 * 60 * 60 * 1000);
        setNameNextChangeDate(nextDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }));
        return;
      }
    }
    setNameLockoutDays(0);
  };

  useEffect(() => {
    if (user) {
      setEditForm({
        phone: user.phone || "",
        address: user.address || "",
        areaCode: user.areaCode || "",
      });
      setSecurityName(user.name || "");
      setSecurityEmail(user.email || "");
      checkNameLockout();

      if (user.notificationSettings) {
        setNotificationSettings(user.notificationSettings);
      } else {
        const savedNotes = localStorage.getItem("notificationSettings");
        if (savedNotes) {
          try {
            setNotificationSettings(JSON.parse(savedNotes));
          } catch (e) {
            console.error(e);
          }
        }
      }

      if (user.preferences) {
        setPreferences(user.preferences);
      } else {
        const savedPrefs = localStorage.getItem("userPreferences");
        if (savedPrefs) {
          try {
            setPreferences(JSON.parse(savedPrefs));
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }, [user]);

  // Handle Tab 2 Personal changes (address, phone, zip)
  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess(false);
    setIsProcessing(true);
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
        setEditSuccess(false);
      }, 3000);
    } catch (err: any) {
      setEditError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Tab 4: Security Update Name (with strict 40 day limit check)
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError("");
    setSecuritySuccess("");

    if (nameLockoutDays > 0) {
      setSecurityError(`Spam lock active! Name can only be updated once in 40 days. Try again in ${nameLockoutDays} days.`);
      return;
    }
    if (!securityName.trim()) {
      setSecurityError("Account name parameter cannot be empty.");
      return;
    }
    if (securityName.trim() === user?.name) {
      setSecurityError("Requested profile name is identical to current index.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ name: securityName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to modify public name");

      updateUser({ ...user, ...data, token: user?.token });
      
      // Save lock date timestamp in localStorage
      localStorage.setItem(`lastNameChangeDate_${user?._id}`, new Date().toISOString());
      checkNameLockout();

      setSecuritySuccess("Profile name successfully updated and written to MongoDB!");
    } catch (err: any) {
      setSecurityError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Tab 4: Security Update Email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError("");
    setSecuritySuccess("");

    if (!securityEmail.trim()) {
      setSecurityError("Authorization email index cannot be empty.");
      return;
    }
    if (securityEmail.trim() === user?.email) {
      setSecurityError("Email is identical to your current email index.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ email: securityEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update email record");

      updateUser({ ...user, ...data, token: user?.token });
      setSecuritySuccess("Login authorization email successfully updated!");
    } catch (err: any) {
      setSecurityError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Tab 4: Security Update Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError("");
    setSecuritySuccess("");

    if (!securityPassword.currentPassword || !securityPassword.newPassword || !securityPassword.confirmPassword) {
      setSecurityError("Please populate all credential input fields.");
      return;
    }
    if (securityPassword.newPassword !== securityPassword.confirmPassword) {
      setSecurityError("Combinations do not match. Review new password inputs.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ password: securityPassword.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to synchronize credentials");

      updateUser({ ...user, ...data, token: user?.token });
      setSecuritySuccess("Secure account credentials changed successfully!");
      setSecurityPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setSecurityError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleNotification = async (key: NotificationKey) => {
    const updated = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    };
    setNotificationSettings(updated);
    localStorage.setItem("notificationSettings", JSON.stringify(updated));

    if (user) {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ notificationSettings: updated }),
        });
        const data = await res.json();
        if (res.ok) {
          updateUser({ ...user, ...data, token: user.token });
        }
      } catch (err) {
        console.error("Failed to sync notifications to MongoDB:", err);
      }
    }
  };

  const handlePreferenceChange = async (key: string, value: any) => {
    const updated = {
      ...preferences,
      [key]: value,
    };
    setPreferences(updated);
    localStorage.setItem("userPreferences", JSON.stringify(updated));
    
    if (key === "darkMode") {
      if (value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    if (user) {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ preferences: updated }),
        });
        const data = await res.json();
        if (res.ok) {
          updateUser({ ...user, ...data, token: user.token });
        }
      } catch (err) {
        console.error("Failed to sync preferences to MongoDB:", err);
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
            Please sign in to configure account and notification settings.
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
        <title>Account Settings | TechShed</title>
        <meta
          name="description"
          content="Manage notification schedules, personal information parameters, language selections, and security options."
        />
      </Head>

      <div className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="p-2.5 bg-surface hover:bg-surface-soft border border-border rounded-full transition-all text-text shadow-sm"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-3xl font-extrabold text-text flex items-center gap-2">
                  <Settings size={28} className="text-brand-600 animate-spin-slow" /> Store Control Center
                </h1>
                <p className="text-sm text-muted mt-1">Configure your personal info, custom notification preferences, and platform choices.</p>
              </div>
            </div>
            <Link
              href="/profile"
              className="text-xs font-bold uppercase tracking-wider bg-surface-soft hover:bg-surface border border-border text-slate-700 dark:text-slate-300 rounded-full px-5 py-2.5 transition"
            >
              View Profile Dashboard
            </Link>
          </div>

          {/* Settings Shell Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* Control Sidebar */}
            <aside className="bg-surface rounded-3xl border border-border p-6 shadow-sm space-y-2">
              <div className="px-3 py-2 text-xs font-bold text-muted uppercase tracking-widest border-b border-border mb-3">
                Settings Modules
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab("notifications")}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeSubTab === "notifications"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <Bell size={18} />
                <span>Notification Settings</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab("personal")}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeSubTab === "personal"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <User size={18} />
                <span>Personal Details</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab("preferences")}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeSubTab === "preferences"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <Globe size={18} />
                <span>Store Preferences</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab("security")}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  activeSubTab === "security"
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-surface-soft hover:translate-x-1"
                }`}
              >
                <Shield size={18} />
                <span>Security & Account</span>
              </button>
            </aside>

            {/* Content Portal */}
            <main className="bg-surface rounded-3xl border border-border p-8 shadow-sm min-h-[500px]">
              
              {/* Option Module 1: Notification Settings */}
              {activeSubTab === "notifications" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-border pb-4">
                    <h2 className="text-xl font-bold text-text flex items-center gap-2">
                      <Bell size={22} className="text-brand-600" /> Notifications Manager
                    </h2>
                    <p className="text-xs text-muted mt-1">Designate trigger settings for promotional newsletter campaigns, security listings, and delivery dispatch alerts.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Toggle Option 1 */}
                    <div className="flex items-center justify-between p-4.5 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                      <div className="max-w-[80%]">
                        <h4 className="text-sm font-bold text-text">Order Progress & Dispatch updates</h4>
                        <p className="text-xs text-muted mt-0.5">Receive immediate SMS notifications and transaction receipt files when shipping logs transition.</p>
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

                    {/* Toggle Option 2 */}
                    <div className="flex items-center justify-between p-4.5 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                      <div className="max-w-[80%]">
                        <h4 className="text-sm font-bold text-text">Marketing Offers & Promotional Deals</h4>
                        <p className="text-xs text-muted mt-0.5">Be the first to participate in early holiday coupon distributions and seasonal highlights collections.</p>
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

                    {/* Toggle Option 3 */}
                    <div className="flex items-center justify-between p-4.5 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                      <div className="max-w-[80%]">
                        <h4 className="text-sm font-bold text-text">Security Records & Authorization Alerts</h4>
                        <p className="text-xs text-muted mt-0.5">Protect credentials with warnings regarding active MERN session tokens, IP changes, and password modifications.</p>
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

                    {/* Toggle Option 4 */}
                    <div className="flex items-center justify-between p-4.5 bg-surface-soft rounded-2xl border border-border hover:shadow-sm transition">
                      <div className="max-w-[80%]">
                        <h4 className="text-sm font-bold text-text">Weekly Spring Spotlight Digest</h4>
                        <p className="text-xs text-muted mt-0.5">A curated bulletin detailing fresh arrivals, popular footwear drops, and brand highlights.</p>
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
              )}

              {/* Option Module 2: Personal Info settings */}
              {activeSubTab === "personal" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-border pb-4">
                    <h2 className="text-xl font-bold text-text flex items-center gap-2">
                      <User size={22} className="text-brand-600" /> Shipping & Delivery Information
                    </h2>
                    <p className="text-xs text-muted mt-1">Synchronize your delivery zip codes, active phone indexes, and shipping directions securely with the database.</p>
                  </div>

                  {editSuccess && (
                    <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center gap-2 animate-scale-in">
                      <CheckCircle size={18} /> Profile parameters written back to MongoDB cluster successfully!
                    </div>
                  )}
                  {editError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2 animate-scale-in">
                      <AlertCircle size={18} /> {editError}
                    </div>
                  )}

                  <form onSubmit={handleEditProfile} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Contact Phone Number
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
                          Area Code / ZIP Info
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
                          Street Address for Default Delivery
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
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-brand-500/20 disabled:opacity-50"
                      >
                        {isProcessing ? "Saving to Mongo..." : "Save Delivery Settings"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Option Module 3: Store Preferences */}
              {activeSubTab === "preferences" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-border pb-4">
                    <h2 className="text-xl font-bold text-text flex items-center gap-2">
                      <Globe size={22} className="text-brand-600" /> Store Preferences
                    </h2>
                    <p className="text-xs text-muted mt-1">Configure your default currencies, local languages, and layout color schemes.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Currency Preferences */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                        Default Store Currency
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
                        Store Interface Language
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
                        <h4 className="text-sm font-bold text-text">Enable Dark Mode</h4>
                        <p className="text-xs text-muted mt-1">Switch storefront theme options to dark screen panels.</p>
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
              )}

              {/* Option Module 4: Security & Credentials */}
              {activeSubTab === "security" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Tab Title */}
                  <div className="border-b border-border pb-4">
                    <h2 className="text-xl font-bold text-text flex items-center gap-2">
                      <Shield size={22} className="text-brand-600" /> Account Security & Settings
                    </h2>
                    <p className="text-xs text-muted mt-1">Manage passwords, primary login email endpoints, and public identity identifiers.</p>
                  </div>

                  {securitySuccess && (
                    <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center gap-2 animate-scale-in">
                      <CheckCircle size={18} /> {securitySuccess}
                    </div>
                  )}
                  {securityError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2 animate-scale-in">
                      <AlertCircle size={18} /> {securityError}
                    </div>
                  )}

                  {/* 1. Change Name (Strict 40 day limit) */}
                  <div className="bg-surface-soft rounded-2xl p-6 border border-border space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-text">Change Profile Name</h3>
                      <p className="text-xs text-muted mt-0.5">Modify your registered public identity. Note: To prevent platform spam, name changes are strictly limited to once every 40 days.</p>
                    </div>

                    {nameLockoutDays > 0 ? (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2.5 animate-scale-in">
                        <Lock size={15} /> Locked: You recently updated your profile name. Next edit allowed in <span className="font-bold text-amber-900">{nameLockoutDays} days</span> (on {nameNextChangeDate}).
                      </div>
                    ) : null}

                    <form onSubmit={handleUpdateName} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <User className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={securityName}
                          disabled={nameLockoutDays > 0}
                          onChange={(e) => setSecurityName(e.target.value)}
                          placeholder="Enter new public name"
                          className="w-full rounded-2xl border border-border bg-surface pl-12 pr-4 py-2.5 text-sm text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={nameLockoutDays > 0 || isProcessing}
                        className="px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Update Name
                      </button>
                    </form>
                  </div>

                  {/* 2. Change Email */}
                  <div className="bg-surface-soft rounded-2xl p-6 border border-border space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-text">Change Authorization Email</h3>
                      <p className="text-xs text-muted mt-0.5">Modify the primary email used for order confirmations, newsletters, and MERN login authorizations.</p>
                    </div>

                    <form onSubmit={handleUpdateEmail} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                        <input
                          type="email"
                          value={securityEmail}
                          onChange={(e) => setSecurityEmail(e.target.value)}
                          placeholder="Enter new authorization email"
                          className="w-full rounded-2xl border border-border bg-surface pl-12 pr-4 py-2.5 text-sm text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        Update Email
                      </button>
                    </form>
                  </div>

                  {/* 3. Change Password */}
                  <div className="bg-surface-soft rounded-2xl p-6 border border-border space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-text">Change Account Password</h3>
                      <p className="text-xs text-muted mt-0.5">Regularly refresh passwords to protect your saved shipping cards and transaction lists.</p>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="relative">
                          <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                          <input
                            type="password"
                            value={securityPassword.currentPassword}
                            onChange={(e) => setSecurityPassword({ ...securityPassword, currentPassword: e.target.value })}
                            placeholder="Current Password"
                            className="w-full rounded-2xl border border-border bg-surface pl-12 pr-4 py-2.5 text-sm text-text focus:border-brand-500 focus:outline-none transition"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                          <input
                            type="password"
                            value={securityPassword.newPassword}
                            onChange={(e) => setSecurityPassword({ ...securityPassword, newPassword: e.target.value })}
                            placeholder="New Password"
                            className="w-full rounded-2xl border border-border bg-surface pl-12 pr-4 py-2.5 text-sm text-text focus:border-brand-500 focus:outline-none transition"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                          <input
                            type="password"
                            value={securityPassword.confirmPassword}
                            onChange={(e) => setSecurityPassword({ ...securityPassword, confirmPassword: e.target.value })}
                            placeholder="Confirm New Password"
                            className="w-full rounded-2xl border border-border bg-surface pl-12 pr-4 py-2.5 text-sm text-text focus:border-brand-500 focus:outline-none transition"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* 4. Danger Zone Deactivation Area */}
                  <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-rose-900">Danger Zone Operations</h3>
                      <p className="text-xs text-rose-700 mt-0.5">Archive or deactivate account access logs permanently.</p>
                    </div>

                    {!deactivateConfirm ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs text-rose-600 max-w-[80%]">Archive your active profile details. You can reactive your settings later by completing a new secure sign-in.</p>
                        <button
                          type="button"
                          onClick={() => setDeactivateConfirm(true)}
                          className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Request Archive
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-4 animate-scale-in">
                        <p className="text-xs font-semibold text-rose-900">Proceed with deactivation? All current active carts will be emptied.</p>
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => setDeactivateConfirm(false)}
                            className="px-4 py-2 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => alert("Simulation complete. Profile archived.")}
                            className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition"
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
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
