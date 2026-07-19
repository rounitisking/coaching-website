"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Shield, Sparkles, BookOpen, Trophy, Users, Award,
  GraduationCap, Play
} from "lucide-react";

const STATS = [
  { value: "10,000+", label: "Students" },
  { value: "500+", label: "Selections" },
  { value: "12+", label: "Years" },
  { value: "95%+", label: "Success Rate" },
];

const TRUST = ["AIR 1 Achievers", "CA • CS • CMA", "Est. 2013", "Delhi NCR"];

// Image wall placeholder tiles
const COL_A = [
  { icon: GraduationCap, label: "CA Foundation", color: "#1e40af", bg: "rgba(30,64,175,0.15)" },
  { icon: Trophy, label: "AIR 1", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  { icon: BookOpen, label: "CA Intermediate", color: "#6366f1", bg: "rgba(99,102,241,0.15)" },
  { icon: Users, label: "10K Students", color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  { icon: Award, label: "Certified", color: "#ec4899", bg: "rgba(236,72,153,0.15)" },
  { icon: GraduationCap, label: "CS • CMA", color: "#8b5cf6", bg: "rgba(139,92,246,0.15)" },
];
const COL_B = [
  { icon: Trophy, label: "Toppers 2024", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  { icon: BookOpen, label: "CUET Prep", color: "#2563eb", bg: "rgba(37,99,235,0.15)" },
  { icon: GraduationCap, label: "IIT JEE", color: "#7c3aed", bg: "rgba(124,58,237,0.15)" },
  { icon: Users, label: "Parents Trust", color: "#059669", bg: "rgba(5,150,105,0.15)" },
  { icon: Award, label: "NEET", color: "#dc2626", bg: "rgba(220,38,38,0.15)" },
  { icon: BookOpen, label: "Class 12", color: "#0891b2", bg: "rgba(8,145,178,0.15)" },
];
const COL_C = [
  { icon: Award, label: "Results 2024", color: "#16a34a", bg: "rgba(22,163,74,0.15)" },
  { icon: GraduationCap, label: "Commerce", color: "#1e40af", bg: "rgba(30,64,175,0.15)" },
  { icon: Users, label: "Faculty", color: "#d97706", bg: "rgba(217,119,6,0.15)" },
  { icon: Trophy, label: "Rank Holders", color: "#7c3aed", bg: "rgba(124,58,237,0.15)" },
  { icon: BookOpen, label: "Study Material", color: "#0e7490", bg: "rgba(14,116,144,0.15)" },
  { icon: GraduationCap, label: "Mentorship", color: "#be185d", bg: "rgba(190,24,93,0.15)" },
];

function ImageTile({ icon: Icon, label, color, bg }: { icon: React.ComponentType<{size?: number; style?: React.CSSProperties}>; label: string; color: string; bg: string }) {
  return (
    <div
      className="w-36 h-32 rounded-2xl flex flex-col items-center justify-center gap-2 flex-shrink-0 border border-white/10"
      style={{ background: bg, backdropFilter: "blur(10px)" }}
    >
      <Icon size={28} style={{ color }} />
      <span className="text-xs font-bold text-white/80">{label}</span>
    </div>
  );
}

export function HeroSection() {
  const doubledA = [...COL_A, ...COL_A];
  const doubledB = [...COL_B, ...COL_B];
  const doubledC = [...COL_C, ...COL_C];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1e40af 100%)",
        minHeight: "92vh",
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-white border border-white/20 bg-white/10 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-yellow-300 animate-pulse" />
              Trusted Since 2013 · 10,000+ Students
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)", letterSpacing: "-0.03em" }}
            >
              Shape Your Future{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                with Expert
              </span>{" "}
              Coaching
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg"
            >
              Academica Institute provides structured coaching for CA, CS, CMA, IIT JEE, NEET &amp; School Boards.
              Join thousands of successful students with our proven methodology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  boxShadow: "0 12px 32px -8px rgba(245,158,11,0.5)",
                }}
              >
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link
                href="/demo-classes"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all hover:-translate-y-1 backdrop-blur-sm"
              >
                <Play size={16} className="fill-current animate-bounce" /> Try Demo
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-8"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>{s.value}</span>
                  <span className="text-xs text-white/60 font-medium mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              {TRUST.map((t, i) => (
                <div key={t} className="flex items-center gap-2 text-white/50 text-sm">
                  {i === 0 ? <Shield size={13} className="text-green-400" /> : <span className="w-1 h-1 rounded-full bg-white/30" />}
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Scrolling Image Wall */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center gap-3 h-[520px] overflow-hidden relative marquee-mask-vertical"
          >
            {/* Column A - scroll up */}
            <div className="flex flex-col gap-3 marquee-track-up">
              {doubledA.map((tile, i) => (
                <ImageTile key={i} {...tile} />
              ))}
            </div>

            {/* Column B - scroll down */}
            <div className="flex flex-col gap-3 marquee-track-down">
              {doubledB.map((tile, i) => (
                <ImageTile key={i} {...tile} />
              ))}
            </div>

            {/* Column C - scroll up (slower) */}
            <div className="flex flex-col gap-3" style={{ animation: "marquee-up 28s linear infinite" }}>
              {doubledC.map((tile, i) => (
                <ImageTile key={i} {...tile} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg-primary)" />
        </svg>
      </div>
    </section>
  );
}
