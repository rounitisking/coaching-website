"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(239,68,68,0.1)" }}
      >
        <RefreshCw size={28} style={{ color: "#dc2626" }} />
      </div>
      <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        Something went wrong
      </h1>
      <p className="text-sm mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn-primary">
          <RefreshCw size={16} /> Try Again
        </button>
        <Link href="/" className="btn-secondary">
          <Home size={16} /> Go Home
        </Link>
      </div>
    </div>
  );
}
