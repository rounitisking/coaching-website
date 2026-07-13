"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { changePassword } from "@/actions/auth";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordInputs = z.infer<typeof passwordSchema>;

export default function DashboardPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordInputs>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordInputs) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const res = await changePassword(data.currentPassword, data.newPassword);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess("Password updated successfully!");
        reset();
      }
    });
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Change Password
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Ensure your account security by updating your password regularly.</p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg text-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 rounded-lg text-sm bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <div>
            <label className="label">Current Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              className="input"
              placeholder="••••••••"
              {...register("currentPassword")}
              disabled={isPending}
            />
            {errors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="label">New Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              className="input"
              placeholder="Min. 8 characters"
              {...register("newPassword")}
              disabled={isPending}
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="label">Confirm New Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              className="input"
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              disabled={isPending}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="text-xs font-semibold hover:underline"
              style={{ color: "var(--brand-secondary)" }}
            >
              {showPasswords ? "Hide Passwords" : "Show Passwords"}
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary h-10 text-sm rounded-xl px-5 flex items-center gap-1.5"
            >
              {isPending ? (
                <><Loader2 size={16} className="animate-spin" /> Updating…</>
              ) : (
                <><KeyRound size={14} /> Update Password</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
