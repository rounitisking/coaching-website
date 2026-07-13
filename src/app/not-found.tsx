import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="text-9xl font-black mb-4 gradient-text"
        style={{ fontFamily: "Outfit, sans-serif", lineHeight: 1 }}
      >
        404
      </div>
      <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        Page Not Found
      </h1>
      <p className="text-base mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        <Home size={16} /> Back to Home
      </Link>
    </div>
  );
}
