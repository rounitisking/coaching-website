"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Shield, Sparkles } from "lucide-react";
import { hero } from "@/data/hero";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e1b4b 100%)",
        }}
      />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
          animate={{ scale: [1.15, 1, 1.15], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #4f46e5 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
          >
            <Sparkles size={14} className="text-yellow-300" />
            {hero.badge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {hero.headline.split(" ").slice(0, -2).join(" ")}{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #a5b4fc, #f0abfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {hero.headline.split(" ").slice(-2).join(" ")}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mb-8 leading-relaxed"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href={hero.cta1.href}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                color: "white",
                boxShadow: "0 15px 40px -10px rgba(99,102,241,0.6)",
              }}
            >
              {hero.cta1.label}
              <ArrowRight size={18} />
            </Link>

            <a
              href={buildWhatsAppUrl("Hi, I would like to know more about Academica Institute.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              <Play size={18} className="fill-current" />
              {hero.cta2.label}
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-6 md:gap-10"
          >
            {hero.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-3xl md:text-4xl font-black text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm text-white/60 font-medium mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 mt-10 text-white/50 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-green-400" />
              <span>Trusted by 10,000+ families</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span>Est. 2004</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span>New Delhi</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="var(--bg-primary)"
          />
        </svg>
      </div>
    </section>
  );
}
