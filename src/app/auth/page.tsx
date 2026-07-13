"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, GraduationCap, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/actions/auth";

type Tab = "login" | "register";

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (regPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    startTransition(async () => {
      const result = await registerUser({
        name: regName,
        email: regEmail,
        password: regPassword,
      });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Account created! Please sign in.");
        setTab("login");
        setLoginEmail(regEmail);
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setRegConfirm("");
      }
    });
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setError("");
    setSuccess("");
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}
        >
          <GraduationCap size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
          Academica Institute
        </h1>
        <p className="text-blue-200 text-sm mt-1">Quality Coaching Since 2013</p>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
      >
        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
          {(["login", "register"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className="flex-1 py-4 text-sm font-600 capitalize transition-all duration-200 relative"
              style={{
                color: tab === t ? "var(--brand-secondary)" : "var(--text-muted)",
                fontWeight: tab === t ? 700 : 500,
              }}
            >
              {t === "login" ? "Sign In" : "Create Account"}
              {tab === t && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "var(--gradient-brand)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg mb-4 text-sm"
                style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }}
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg mb-4 text-sm"
                style={{ background: "rgba(34,197,94,0.08)", color: "#16a34a" }}
              >
                <CheckCircle2 size={16} />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {tab === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <button
                  type="button"
                  onClick={() => alert("Google Sign-In integration is coming soon! Please use email & password to sign in.")}
                  className="btn-google mb-4"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5.04c1.67 0 3.2.58 4.38 1.69l3.27-3.27C17.67 1.48 15.02 1 12 1 7.37 1 3.42 3.66 1.5 7.55l3.86 3c.9-2.73 3.44-4.51 6.64-4.51z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.48c-.29 1.48-1.14 2.73-2.43 3.57l3.8 2.94c2.22-2.05 3.64-5.07 3.64-8.67z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.36 14.45c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.5 6.87C.54 8.77 0 10.92 0 13.13s.54 4.36 1.5 6.26l3.86-2.94z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.8-2.94c-1.11.75-2.53 1.19-4.16 1.19-3.2 0-5.74-1.78-6.64-4.51L1.5 16.77C3.42 20.66 7.37 23 12 23z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <div className="relative flex pb-3 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest">Or</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                <div>
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="label mb-0">Password</label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs font-medium"
                      style={{ color: "var(--brand-secondary)" }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input pr-10"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="text-xs font-semibold text-[var(--text-secondary)] cursor-pointer">
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full h-11 text-sm mt-2"
                >
                  {isPending ? (
                    <><Loader2 size={16} className="animate-spin" /> Signing in…</>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchTab("register")}
                    className="font-semibold"
                    style={{ color: "var(--brand-secondary)" }}
                  >
                    Create one
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    minLength={2}
                  />
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input pr-10"
                      placeholder="Min. 8 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Re-enter password"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full h-11 text-sm mt-2"
                >
                  {isPending ? (
                    <><Loader2 size={16} className="animate-spin" /> Creating account…</>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchTab("login")}
                    className="font-semibold"
                    style={{ color: "var(--brand-secondary)" }}
                  >
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-center text-xs mt-6 text-blue-300">
        © {new Date().getFullYear()} Academica Institute. All rights reserved.
      </p>
    </div>
  );
}
