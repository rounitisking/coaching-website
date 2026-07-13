"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, CheckCircle, Loader2, Shield, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createMockOrder } from "@/actions/payments";

type Item = {
  id: string;
  title: string;
  price: number;
  mrp: number;
  type: string;
};

export default function CheckoutClient({ item, userId }: { item: Item; userId: string }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const discount = item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;

  const handleMockCheckout = () => {
    setError("");
    startTransition(async () => {
      const result = await createMockOrder({ itemId: item.id, itemType: item.type, userId });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 2000);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)", letterSpacing: "-0.02em" }}>
          Complete Your Purchase
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Review your order and confirm payment</p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="checkout-card text-center py-12"
          >
            <CheckCircle size={60} className="mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>Payment Successful!</h2>
            <p className="text-[var(--text-muted)] mb-6">Your access has been activated. Redirecting to dashboard...</p>
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
              <Loader2 size={14} className="animate-spin text-blue-600" /> Connecting to dashboard...
            </div>
          </motion.div>
        ) : (
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Order summary */}
            <div className="checkout-card">
              <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <ShoppingCart size={18} className="text-blue-600" /> Order Summary
              </h3>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-sm text-[var(--text-muted)] capitalize mt-0.5">{item.type.replace("-", " ")}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-xl text-[var(--brand-secondary)]" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>₹{item.price.toLocaleString("en-IN")}</p>
                  {discount > 0 && (
                    <p className="text-xs text-[var(--text-muted)] line-through">₹{item.mrp.toLocaleString("en-IN")}</p>
                  )}
                </div>
              </div>
              {discount > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--border)] flex justify-between text-sm">
                  <span className="text-green-600 font-semibold">You save</span>
                  <span className="text-green-600 font-bold">₹{(item.mrp - item.price).toLocaleString("en-IN")} ({discount}%)</span>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex justify-between font-bold">
                <span className="text-[var(--text-primary)]">Total</span>
                <span className="text-[var(--brand-secondary)] text-lg" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>₹{item.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl text-sm text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                {error}
              </div>
            )}

            {/* Payment - Mock mode */}
            <div className="checkout-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/30 rounded-lg flex items-center justify-center">
                  <CreditCard size={16} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-sm">Payment Gateway</h3>
                  <p className="text-xs text-[var(--text-muted)]">Razorpay integration — pending setup</p>
                </div>
                <span className="ml-auto text-xs bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full font-semibold">Sandbox Mode</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-5">
                Payment gateway will be enabled once Razorpay credentials are configured.
                For now, use the sandbox checkout to test the enrollment flow.
              </p>
              <button
                onClick={handleMockCheckout}
                disabled={isPending}
                className="btn-primary w-full justify-center text-base py-3.5 font-bold flex items-center gap-2"
              >
                {isPending ? (
                  <><Loader2 size={18} className="animate-spin" /> Processing...</>
                ) : (
                  <><Shield size={18} /> Complete Enrollment (Sandbox)</>
                )}
              </button>
            </div>

            <p className="text-xs text-center text-[var(--text-muted)]">
              🔒 Secured by industry-standard encryption. Your data is safe.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
