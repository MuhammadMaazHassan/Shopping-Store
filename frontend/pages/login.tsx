import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Hash,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authApiBase = "/api/auth";

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (isReturning) {
        if (!email || !password) {
          throw new Error("Please enter your email and password.");
        }

        const res = await fetch(`${authApiBase}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        let data;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(`Server error: ${text.substring(0, 100)}`);
        }

        if (!res.ok) throw new Error(data.message || "Login failed");

        setSuccessMessage("Signed in successfully. Redirecting you now...");
        login(data);
      } else {
        if (!name || !email || !password || !phone || !address || !areaCode) {
          throw new Error("Please fill in all required fields.");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }

        const res = await fetch(`${authApiBase}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            address,
            areaCode,
          }),
        });

        let data;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(`Server error: ${text.substring(0, 100)}`);
        }

        if (!res.ok) throw new Error(data.message || "Registration failed");

        setSuccessMessage(
          "Account created successfully. Redirecting you now...",
        );
        login(data);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(
        err.message || "There was a problem signing in. Please try again.",
      );
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isReturning ? "Sign In" : "Sign Up"} | TechShed</title>
        <meta
          name="description"
          content="Sign in to your TechShed account or create a new one to enjoy personalized shopping, order tracking, and fast checkout."
        />
      </Head>

      <div className="min-h-screen bg-bg overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side – Illustration / Image */}
            <div className="hidden lg:block animate-fade-in-up [animation-delay:200ms]">
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-accent/10 to-accent-soft shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=800&fit=crop"
                  alt="Shopping illustration"
                  width={800}
                  height={800}
                  className="object-cover w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Your style, delivered
                  </h2>
                  <p className="text-white/90 text-sm">
                    Join thousands of happy shoppers worldwide.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-surface shadow-sm">
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-xs text-muted">Brands</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface shadow-sm">
                  <div className="text-2xl font-bold text-accent">10k+</div>
                  <div className="text-xs text-muted">Happy Customers</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface shadow-sm">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-xs text-muted">Support</div>
                </div>
              </div>
            </div>

            {/* Right Side – Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up">
              <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8 shadow-xl shadow-slate-200/50 transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <Link
                    href="/"
                    className="inline-block text-2xl font-extrabold uppercase tracking-widest text-slate-900 mb-2 dark:text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    TechShed
                  </Link>
                  <h1 className="text-2xl sm:text-3xl font-bold text-text mt-2">
                    {isReturning ? "Welcome back" : "Create account"}
                  </h1>
                  <p className="text-sm text-muted mt-1">
                    {isReturning
                      ? "Sign in to continue shopping"
                      : "Join us for a better shopping experience"}
                  </p>
                </div>

                {/* Toggle Buttons */}
                <div className="grid grid-cols-2 gap-2 rounded-full bg-surface-soft p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsReturning(true);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                      isReturning
                        ? "bg-surface text-text shadow-sm"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsReturning(false);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                      !isReturning
                        ? "bg-surface text-text shadow-sm"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-5 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-600 border border-rose-200 animate-slide-in-left">
                    <AlertCircle size={16} />
                    <p>{error}</p>
                  </div>
                )}
                {successMessage && (
                  <div className="mb-5 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700 animate-fade-in-up">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isReturning && (
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-text">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                        />
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-border bg-surface-soft pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-text">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border bg-surface-soft pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-text">
                        Password
                      </label>
                      {isReturning && (
                        <button
                          type="button"
                          onClick={() =>
                            alert("Reset link sent to your email (demo)")
                          }
                          className="text-xs text-accent hover:underline"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={
                          isReturning ? "Your password" : "Min. 6 characters"
                        }
                        className="w-full rounded-xl border border-border bg-surface-soft pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition"
                      />
                    </div>
                  </div>

                  {!isReturning && (
                    <>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-text">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                          />
                          <input
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full rounded-xl border border-border bg-surface-soft pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-[1fr_100px] gap-3">
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-text">
                            Address
                          </label>
                          <div className="relative">
                            <MapPin
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                            />
                            <input
                              required
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="123 Main St"
                              className="w-full rounded-xl border border-border bg-surface-soft pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-text">
                            Area Code
                          </label>
                          <div className="relative">
                            <Hash
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                            />
                            <input
                              required
                              value={areaCode}
                              onChange={(e) => setAreaCode(e.target.value)}
                              placeholder="ZIP"
                              className="w-full rounded-xl border border-border bg-surface-soft pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 w-full rounded-full px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-70 flex items-center justify-center gap-2 ${
                      error
                        ? "bg-red-500 hover:bg-red-600"
                        : successMessage
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isReturning ? (
                      <>
                        Sign In <ArrowRight size={14} />
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative flex items-center my-6">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="px-3 text-xs text-muted">or</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-full rounded-full bg-surface-soft px-4 py-3 text-sm font-semibold text-text transition hover:bg-surface-strong"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
