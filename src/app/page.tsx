import { Suspense } from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  GraduationCap, Trophy, Target, Shield, Zap, Heart,
  ChevronRight, Users, Award, TrendingUp
} from "lucide-react";
import { getFeaturedCourses, getCategories } from "@/actions/courses";
import {
  getHeroBanners, getActiveNotices, getActiveFAQs,
  getFeaturedTestSeries, getActivePopup,
} from "@/actions/admin";
import { EnrollPopup } from "@/components/home/EnrollPopup";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { AnimatedStats } from "@/components/home/AnimatedStats";
import { HeroSection } from "@/components/home/HeroSection";
import { GoogleReviewsSection } from "@/components/home/GoogleReviewsSection";
import { ToppersCarousel } from "@/components/home/ToppersCarousel";
import { FacultyMarquee } from "@/components/home/FacultyMarquee";
import { AdmissionCarousel } from "@/components/home/AdmissionCarousel";
import { db } from "@/lib/db";

// ─── Fallback Data ──────────────────────────────────────────────────────────

const FALLBACK_TESTIMONIALS = [
  { id: "t1", name: "Riya Kapoor", text: "Academica Institute transformed my CA Foundation journey. The structured approach and constant support helped me clear the exam in my first attempt!", rating: 5, course: "CA Foundation", avatar: null },
  { id: "t2", name: "Siddharth Nair", text: "Best decision I made. The faculty here are incredibly experienced and patient. Cleared CS Foundation with distinction!", rating: 5, course: "CS Foundation", avatar: null },
  { id: "t3", name: "Divya Mehra", text: "The economics coaching here is phenomenal. I scored 92% in my Class 12 boards thanks to the concept-based teaching approach.", rating: 5, course: "Class 12 Commerce", avatar: null },
];

const FALLBACK_FAQS = [
  { id: "q1", question: "What courses does Academica Institute offer?", answer: "We offer coaching for CA Foundation, CA Intermediate, CA Final, CS, CMA, CUET, and Class 9–12 Commerce subjects including Accountancy, Economics, and Business Studies." },
  { id: "q2", question: "When were you established?", answer: "Academica Institute was established in 2013 with the aim of providing quality guidance and the right direction to students." },
  { id: "q3", question: "How can I enroll in a course?", answer: "You can create a free account on our website, browse courses, and click Enroll Now. Payment can be made online securely." },
  { id: "q4", question: "Do you provide study materials?", answer: "Yes, we provide comprehensive study materials, notes, and practice papers for all our courses through our Notes section." },
  { id: "q5", question: "Are online classes available?", answer: "Yes, we offer both online and offline classes. Online classes include recorded lectures you can watch anytime." },
];

const WHY_CHOOSE_US = [
  { icon: GraduationCap, title: "Expert Faculty", desc: "Learn from CA, CS, and CMA professionals with 10+ years of teaching experience." },
  { icon: Trophy, title: "Proven Results", desc: "Our students consistently achieve top ranks including AIR 1 in national exams." },
  { icon: Target, title: "Structured Learning", desc: "Carefully designed curriculum that builds concepts systematically from basics." },
  { icon: Shield, title: "Personalized Attention", desc: "Small batch sizes ensure every student gets individual attention and guidance." },
  { icon: Zap, title: "Regular Assessments", desc: "Weekly tests and mock exams to track progress and identify improvement areas." },
  { icon: Heart, title: "Supportive Community", desc: "A motivating environment where students inspire and support each other." },
];

const STATS = [
  { value: "10,000+", label: "Students Enrolled", iconName: "users" },
  { value: "500+",   label: "Top Selections",   iconName: "trophy" },
  { value: "12+",    label: "Years of Excellence", iconName: "award" },
  { value: "95%+",   label: "Success Rate",     iconName: "trendingUp" },
];

export default async function HomePage() {
  // Parallel data fetches with fallbacks
  const [notices, faqs, popup, dbResults, faculty, testimonials] = await Promise.all([
    getActiveNotices().catch(() => []),
    getActiveFAQs().catch(() => []),
    getActivePopup().catch(() => null),
    db.result.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }).catch(() => []),
    db.faculty.findMany({
      where: { featured: true, isActive: true },
      orderBy: { order: "asc" },
      take: 12,
    }).catch(() => []),
    db.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: 6,
    }).catch(() => []),
  ]);

  // Construct toppers list dynamically from public/result folder
  let dynamicToppers: any[] = [];
  try {
    const resultDir = path.join(process.cwd(), "public", "result");
    if (fs.existsSync(resultDir)) {
      const files = fs.readdirSync(resultDir);
      
      const { results: staticResults } = await import("@/data/results");
      
      const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
      
      let parsedIndex = 0;
      for (const file of files) {
        const fileLower = file.toLowerCase();
        // Ignore DS_Store, files starting with WhatsApp, and non-image formats
        if (fileLower.startsWith("whatsapp") || fileLower.startsWith(".") || !/\.(webp|png|jpg|jpeg)$/i.test(fileLower)) {
          continue;
        }
        
        // Parse details from filename
        const baseName = file.replace(/\.[^/.]+$/, "").trim();
        const coursesToMatch = [
          "ca foundation",
          "ca intermediate",
          "ca inter",
          "ca final",
          "cs foundation",
          "cs executive",
          "cs professional",
          "cseet",
          "cma foundation",
          "cma intermediate",
          "cma inter",
          "cma final"
        ];
        
        let matchedCourse = "";
        let matchedIndex = -1;
        
        for (const c of coursesToMatch) {
          const idx = baseName.toLowerCase().indexOf(c);
          if (idx !== -1) {
            matchedCourse = baseName.substring(idx, idx + c.length);
            matchedIndex = idx;
            break;
          }
        }
        
        if (matchedIndex === -1) {
          const fallbackKeywords = ["ca", "cs", "cma", "jee", "neet", "class"];
          for (const kw of fallbackKeywords) {
            const idx = baseName.toLowerCase().indexOf(kw);
            if (idx !== -1) {
              matchedCourse = baseName.substring(idx);
              matchedIndex = idx;
              break;
            }
          }
        }
        
        if (matchedIndex === -1) {
          const lastSpace = baseName.lastIndexOf(" ");
          if (lastSpace !== -1) {
            matchedIndex = lastSpace;
            matchedCourse = baseName.substring(lastSpace + 1);
          }
        }
        
        let parsedStudentName = baseName;
        let parsedCourseName = "Coaching";
        
        if (matchedIndex !== -1) {
          parsedStudentName = baseName.substring(0, matchedIndex).trim().replace(/[\s\.\-_]+$/, "").trim();
          parsedCourseName = matchedCourse.trim();
        }
        
        // Formatting course name nicely
        const lowerFC = parsedCourseName.toLowerCase();
        if (lowerFC === "cseet") parsedCourseName = "CS CSEET";
        else if (lowerFC === "ca foundation") parsedCourseName = "CA Foundation";
        else if (lowerFC === "ca intermediate" || lowerFC === "ca inter") parsedCourseName = "CA Intermediate";
        else if (lowerFC === "ca final") parsedCourseName = "CA Final";
        else if (lowerFC === "cs foundation") parsedCourseName = "CS Foundation";
        else if (lowerFC === "cs executive") parsedCourseName = "CS Executive";
        else if (lowerFC === "cs professional") parsedCourseName = "CS Professional";
        else if (lowerFC === "cma foundation") parsedCourseName = "CMA Foundation";
        else if (lowerFC === "cma intermediate" || lowerFC === "cma inter") parsedCourseName = "CMA Intermediate";
        else if (lowerFC === "cma final") parsedCourseName = "CMA Final";
        
        const normParsed = normalize(parsedStudentName);
        
        // Find match in DB first, then static fallback data
        const dbMatch = dbResults.find((r) => normalize(r.studentName) === normParsed);
        const staticMatch = staticResults.find((r) => normalize(r.name) === normParsed);
        
        const match = dbMatch || staticMatch;
        
        if (match) {
          dynamicToppers.push({
            id: (match as any).id || `dynamic-${parsedIndex}`,
            studentName: (match as any).studentName || (match as any).name || parsedStudentName,
            photo: `/result/${file}`,
            exam: parsedCourseName || (match as any).exam || "Topper",
            rank: (match as any).rank || null,
            score: (match as any).score || null,
            course: (match as any).course || parsedCourseName,
            batch: (match as any).batch || null,
            year: (match as any).year || 2024,
            achievement: (match as any).achievement || (match as any).selectionBadge || null,
            quote: (match as any).quote || (match as any).successStory || null,
          });
        } else {
          dynamicToppers.push({
            id: `dynamic-${parsedIndex}`,
            studentName: parsedStudentName,
            photo: `/result/${file}`,
            exam: parsedCourseName,
            rank: null,
            score: null,
            course: parsedCourseName,
            batch: null,
            year: 2026,
            achievement: null,
            quote: null,
          });
        }
        parsedIndex++;
      }
    }
  } catch (err) {
    console.error("Failed to generate dynamic toppers list:", err);
  }

  const displayTestimonials = testimonials.length ? testimonials : FALLBACK_TESTIMONIALS;
  const displayFAQs = faqs.length ? faqs : FALLBACK_FAQS;

  return (
    <>
      {/* Enrollment Popup */}
      {popup && <EnrollPopup popup={popup} />}

      {/* ── Notice Bar ─────────────────────────────────────────────────── */}
      {notices.length > 0 && (
        <div
          className="py-2 px-4 text-sm text-center font-medium overflow-hidden"
          style={{ background: "var(--gradient-accent)", color: "#fff" }}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold">📢 Notice:</span>
            <span>{notices[0].title}</span>
            {notices[0].link && (
              <Link href={notices[0].link} className="underline font-bold">
                Learn More →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 1. Results Slider */}
      <ToppersCarousel toppers={dynamicToppers} />

      {/* 2. Shape Your Future Hero */}
      <HeroSection />

      {/* Admissions Open 2026 */}
      <AdmissionCarousel />

      {/* 4. Stats */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <AnimatedStats stats={STATS} />
        </div>
      </section>

      {/* 5. Academica Advantage (Why Choose Us) */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Why Academica</p>
            <h2 className="section-title">The Academica Advantage</h2>
            <p className="section-subtitle mx-auto mt-3">
              We don&apos;t just teach &mdash; we build confidence, clarity, and the competitive edge needed to succeed.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="card-flat p-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,99,235,0.08)" }}
                >
                  <item.icon size={20} style={{ color: "var(--brand-secondary)" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Faculty Marquee */}
      <FacultyMarquee faculty={faculty} />

      {/* 7. Testimonials */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Student Stories</p>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <TestimonialsSlider testimonials={displayTestimonials} />
        </div>
      </section>

      {/* 8. Google Reviews */}
      <GoogleReviewsSection />

      {/* 9. FAQs */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Have Questions?</p>
            <h2 className="section-title">Frequently Asked</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <FAQAccordion faqs={displayFAQs} />
          </div>
        </div>
      </section>
    </>
  );
}
