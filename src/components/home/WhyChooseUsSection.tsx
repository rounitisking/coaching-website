"use client";

import {
  BookOpen,
  Users,
  Zap,
  BarChart3,
  Globe,
  Clock,
  Award,
  Heart,
} from "lucide-react";
import { ScrollReveal, StaggerContainer } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: Award,
    title: "CA & CS Professional Faculty",
    description:
      "Learn from qualified Chartered Accountants, Company Secretaries, and postgraduates who bring industry insights and legal drafting expertise.",
    color: "var(--gradient-brand)",
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description:
      "Strictly limited to 35-40 students per batch ensures every student gets personalized attention, homework feedback, and doubt clearance.",
    color: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description:
      "Regular descriptive tests, chapter-wise evaluations, and mock exams evaluate understanding and prepare students for exam writing.",
    color: "linear-gradient(135deg, #f97316, #ea580c)",
  },
  {
    icon: BookOpen,
    title: "Proprietary Study Material",
    description:
      "Highly structured notes, ledger worksheets, and legal section flowcharts aligned with the latest CBSE and professional exam bodies.",
    color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  },
  {
    icon: Zap,
    title: "Doubt Clearing 6 Days/Week",
    description:
      "Never stay stuck. Daily offline and online doubt clearing sessions to assist students in solving complex accounting and costing problems.",
    color: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    icon: Globe,
    title: "Portal & Mobile App Access",
    description:
      "All physical lectures are recorded and uploaded within 24 hours. Access materials, schedules, and mock CBT tests on our study portal.",
    color: "linear-gradient(135deg, #06b6d4, #0284c7)",
  },
  {
    icon: Clock,
    title: "Estd. 2013 Success Record",
    description:
      "Proven track record of guiding students to high board percentages, SRCC admissions, and professional CA/CS milestones since 2013.",
    color: "linear-gradient(135deg, #ec4899, #db2777)",
  },
  {
    icon: Heart,
    title: "Holistic Mentoring",
    description:
      "We focus on conceptual depth, discipline, structured writing, and logical analytics to build confidence and lifetime success.",
    color: "linear-gradient(135deg, #ef4444, #dc2626)",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section bg-[var(--bg-primary)]" id="why-us">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Academica"
            title="What Makes Us"
            titleHighlight="Different"
            subtitle="We don't just teach — we guide. Here's why thousands of commerce and school students choose Academica Institute year after year."
          />
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-12"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUpVariant}
                className="card p-4 sm:p-6 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feature.color }}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2 text-[0.95rem] group-hover:text-[var(--brand-600)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
