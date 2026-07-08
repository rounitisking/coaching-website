import { HeroSection } from "@/components/home/HeroSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedVideoSection } from "@/components/home/FeaturedVideoSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { FacultySection } from "@/components/home/FacultySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { GoogleReviewsSection } from "@/components/home/GoogleReviewsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";
import { institute } from "@/data/institute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${institute.name} — ${institute.tagline}`,
  description: institute.description,
  alternates: { canonical: "https://academicainstitute.in" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ResultsSection />
      <StatsSection />
      <FeaturedVideoSection />
      <CoursesSection />
      <WhyChooseUsSection />
      <FacultySection />
      <TestimonialsSection />
      <GallerySection />
      <GoogleReviewsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
