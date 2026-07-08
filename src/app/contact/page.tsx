import { ContactSection } from "@/components/home/ContactSection";
import { FAQSection } from "@/components/home/FAQSection";
import type { Metadata } from "next";
import { institute } from "@/data/institute";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${institute.name}. Call, WhatsApp, or visit us at ${institute.address}. We're here to help with admissions.`,
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] py-12">
        <div className="container-custom text-center">
          <span className="section-eyebrow block mb-3">Get In Touch</span>
          <h1
            className="section-title mb-3"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            We&apos;d Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p className="section-subtitle max-w-xl mx-auto">
            Have questions about admissions, courses, or scholarships? Our counselors are ready to help Monday–Saturday, 8 AM–7 PM.
          </p>
        </div>
      </div>
      <ContactSection />
      <FAQSection />
    </>
  );
}
