"use client";

import { useState, useTransition } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "@/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await forgotPassword(email);
      if (result.error) {
        setError(result.error);
      } else {
        setDone(true);
      }
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          <Mail size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
          Reset Password
        </h1>
        <p className="text-blue-200 text-sm mt-1">
          Enter your email to receive a reset link
        </p>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--bg-card)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
      >
        {done ? (
          <div className="text-center py-4">
            <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "#16a34a" }} />
            <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Check your inbox (or console)
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              If an account exists for <strong>{email}</strong>, the reset link
              has been logged to the server console. Email delivery will be
              enabled when an SMTP provider is configured.
            </p>
            <Link href="/auth" className="btn-primary w-full justify-center">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="flex items-center gap-2 p-3 rounded-lg text-sm"
                style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }}
              >
                <AlertCircle size={16} /> {error}
              </div>
            )}
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full h-11 text-sm"
            >
              {isPending ? (
                <><Loader2 size={16} className="animate-spin" /> Sending…</>
              ) : (
                "Send Reset Link"
              )}
            </button>
            <Link
              href="/auth"
              className="flex items-center justify-center gap-2 text-sm font-medium mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
