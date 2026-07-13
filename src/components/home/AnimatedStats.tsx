"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Trophy, Award, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  iconName: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  users: Users,
  trophy: Trophy,
  award: Award,
  trendingUp: TrendingUp,
};

export function AnimatedStats({ stats }: { stats: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, i) => {
        const IconComponent = iconMap[stat.iconName] || Trophy;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(37,99,235,0.08)" }}>
              <IconComponent size={22} style={{ color: "var(--brand-secondary)" }} />
            </div>
            <Counter value={stat.value} trigger={isInView} />
            <p className="text-xs md:text-sm font-medium mt-2" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function Counter({ value, trigger }: { value: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 2000; // ms
    const increment = Math.ceil(numericValue / (duration / 16));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [trigger, numericValue]);

  return (
    <span className="stat-number">
      {trigger ? count.toLocaleString("en-IN") : 0}
      {suffix}
    </span>
  );
}
