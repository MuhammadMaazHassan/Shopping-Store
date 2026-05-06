import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Lock, Phone, MapPin, Hash, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [isReturning, setIsReturning] = useState(true);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [areaCode, setAreaCode] = useState("");
  
  // UI State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isReturning) {
        // Login Flow
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        
        login(data);
      } else {
        // Registration Flow
        if (!name || !email || !password || !phone || !address || !areaCode) {
          throw new Error("Please fill in all required fields.");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }

        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone, address, areaCode }),
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");
        
        login(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isReturning ? "Sign In" : "Sign Up"} | WonderCart</title>
      </Head>

      <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none mb-20 animate-fadeInUp">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-brand-600 dark:text-brand-400 mb-2">
            {isReturning ? "Welcome back" : "Join us"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {isReturning ? "Sign in to WonderCart" : "Create your account"}
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium">
            {isReturning ? "Access your orders, cart, and profile." : "Sign up to track orders and save your delivery details."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 mb-8">
          <button
            type="button"
            onClick={() => { setIsReturning(true); setError(""); }}
            className={`rounded-full px-5 py-3 text-sm font-bold transition-all ${
              isReturning
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsReturning(false); setError(""); }}
            className={`rounded-full px-5 py-3 text-sm font-bold transition-all ${
              !isReturning
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 dark:bg-red-500/10 p-4 text-sm font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 animate-slideInLeft">
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isReturning && (
            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</span>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                />
              </div>
            </label>
          )}

          <label className="block space-y-2">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</span>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              />
            </div>
          </label>

          <label className="block space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</span>
              {isReturning && (
                <button type="button" onClick={() => alert('Password reset link sent to your email!')} className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isReturning ? "Enter your password" : "Min. 6 characters"}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              />
            </div>
          </label>

          {!isReturning && (
            <>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</span>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>
              </label>

              <div className="grid grid-cols-[1fr_120px] gap-4">
                <label className="block space-y-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Address</span>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, City"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Area Code</span>
                  <div className="relative">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      value={areaCode}
                      onChange={(e) => setAreaCode(e.target.value)}
                      placeholder="ZIP"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>
                </label>
              </div>
            </>
          )}

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-brand-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700 shadow-lg shadow-brand-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isReturning ? (
                "Sign In Securely"
              ) : (
                "Create Account"
              )}
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink-0 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">or</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
