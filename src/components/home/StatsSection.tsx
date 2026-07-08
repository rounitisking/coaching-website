"use client";

import { Trophy, Users, Star, Medal } from "lucide-react";
import { stats } from "@/data/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Users,
  Star,
  Medal,
};

export function StatsSection() {
  return (
    <section className="section bg-[var(--bg-primary)] py-12 md:py-16 border-b border-[var(--border)]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Trophy;
            return (
              <ScrollReveal key={stat.id} delay={i * 0.08} direction="up">
                <div className="card p-6 text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <div
                    className="text-3xl md:text-4xl font-black gradient-text mb-1"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
