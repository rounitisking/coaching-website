"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { resetPassword } from "@/actions/auth";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    startTransition(async () => {
      const result = await resetPassword(params.token, password);
      if (result.error) {
        setError(result.error);
      } else {
        setDone(true);
        setTimeout(() => router.push("/auth"), 2500);
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
          <KeyRound size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
          Set New Password
        </h1>
        <p className="text-blue-200 text-sm mt-1">Choose a strong password</p>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--bg-card)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
      >
        {done ? (
          <div className="text-center py-4">
            <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "#16a34a" }} />
            <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Password Updated!
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Redirecting you to sign in…
            </p>
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
              <label className="label">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input pr-10"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full h-11 text-sm"
            >
              {isPending ? (
                <><Loader2 size={16} className="animate-spin" /> Updating…</>
              ) : (
                "Update Password"
              )}
            </button>
            <Link
              href="/auth"
              className="block text-center text-sm font-medium mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              Back to Sign In
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
