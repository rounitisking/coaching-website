"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, CheckCircle, Loader2, Shield, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createMockOrder, createOrderAction, verifyPaymentAction } from "@/actions/payments";

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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

  const handleRazorpayCheckout = async () => {
    setError("");
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      setError("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    startTransition(async () => {
      // 1. Map item type to CartItem type (capitalized enum)
      const mappedType =
        item.type === "resource"
          ? "RESOURCE"
          : item.type === "course"
          ? "COURSE"
          : "TEST_SERIES";

      const cartItem = {
        id: item.id,
        type: mappedType as any,
        title: item.title,
        price: item.price,
      };

      // 2. Create Order Action (on server)
      const orderResult = await createOrderAction([cartItem]);
      if (orderResult.error) {
        setError(orderResult.error);
        return;
      }

      // 3. Open Razorpay Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: Math.round(item.price * 100),
        currency: "INR",
        name: "Academica Institute",
        description: item.title,
        order_id: orderResult.razorpayOrderId,
        handler: async function (response: any) {
          // 4. Verify signature on server
          startTransition(async () => {
            const verifyResult = await verifyPaymentAction({
              orderId: orderResult.orderId!,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResult.error) {
              setError(verifyResult.error);
            } else {
              setSuccess(true);
              setTimeout(() => {
                router.push("/dashboard");
                router.refresh();
              }, 2000);
            }
          });
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setError("Payment window was closed.");
          },
        },
      };

      try {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err: any) {
        setError(`Razorpay Widget Error: ${err.message || err}. (Note: You are likely using placeholder credentials. Please configure real keys in .env.local to test the live checkout. Fallback Mock checkout is available below.)`);
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

            {/* Payment - Razorpay + Fallback Mock */}
            <div className="checkout-card space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                  <CreditCard size={16} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-sm">Payment Gateway</h3>
                  <p className="text-xs text-[var(--text-muted)]">Secured by Razorpay</p>
                </div>
                <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-semibold">Online Payment</span>
              </div>

              <p className="text-xs text-[var(--text-muted)]">
                Click below to pay via Razorpay (UPI, Card, Netbanking, Wallets).
              </p>

              <button
                onClick={handleRazorpayCheckout}
                disabled={isPending}
                className="btn-primary w-full justify-center text-base py-3.5 font-bold flex items-center gap-2"
              >
                {isPending ? (
                  <><Loader2 size={18} className="animate-spin" /> Processing...</>
                ) : (
                  <><Shield size={18} /> Pay Now (Razorpay)</>
                )}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[var(--border)]"></div>
                <span className="flex-shrink mx-4 text-[10px] text-[var(--text-muted)] uppercase font-semibold">or test sandbox</span>
                <div className="flex-grow border-t border-[var(--border)]"></div>
              </div>

              <button
                onClick={handleMockCheckout}
                disabled={isPending}
                className="btn-secondary w-full justify-center text-xs py-2.5 font-bold flex items-center gap-1.5"
                style={{ borderColor: "var(--border)" }}
              >
                <Shield size={14} /> Test Mock Checkout (Sandbox)
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
