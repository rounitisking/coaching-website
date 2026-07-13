import { Suspense } from "react";
import Link from "next/link";
import {
  BookOpen, Users, Trophy, Star, ChevronRight, CheckCircle,
  Award, Target, Clock, Phone, ArrowRight, GraduationCap,
  TrendingUp, Shield, Zap, Heart
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
import { ResultsSection } from "@/components/home/ResultsSection";
import { GoogleReviewsSection } from "@/components/home/GoogleReviewsSection";
import { db } from "@/lib/db";

// ─── Fallback Data ──────────────────────────────────────────────────────────
const FALLBACK_COURSES = [
  { id: "1", title: "CA Foundation", slug: "ca-foundation", description: "Complete preparation for CA Foundation exams with concept clarity.", price: 12000, mrp: 18000, thumbnail: null, category: { name: "Commerce", color: "#2563eb" }, faculty: { name: "Expert Faculty" }, duration: "6 months", level: "Beginner" },
  { id: "2", title: "CA Intermediate", slug: "ca-intermediate", description: "Master CA Intermediate with structured modules and mock tests.", price: 18000, mrp: 25000, thumbnail: null, category: { name: "Commerce", color: "#2563eb" }, faculty: { name: "Expert Faculty" }, duration: "12 months", level: "Intermediate" },
  { id: "3", title: "CS Foundation", slug: "cs", description: "Comprehensive CS Foundation coaching with regular assessments.", price: 10000, mrp: 15000, thumbnail: null, category: { name: "Commerce", color: "#2563eb" }, faculty: { name: "Expert Faculty" }, duration: "6 months", level: "Beginner" },
  { id: "4", title: "CMA Foundation", slug: "cma", description: "Expert CMA coaching focusing on cost accounting and management.", price: 10000, mrp: 15000, thumbnail: null, category: { name: "Commerce", color: "#2563eb" }, faculty: { name: "Expert Faculty" }, duration: "6 months", level: "Beginner" },
];

const FALLBACK_FACULTY = [
  { id: "f1", name: "CA Rajesh Kumar", designation: "CA Foundation Expert", subjects: ["Accounts", "Law"], photo: null, experience: 15 },
  { id: "f2", name: "Prof. Priya Sharma", designation: "Economics Specialist", subjects: ["Economics", "Stats"], photo: null, experience: 12 },
  { id: "f3", name: "CA Amit Verma", designation: "Tax & Audit Faculty", subjects: ["Tax", "Audit"], photo: null, experience: 10 },
];

const FALLBACK_RESULTS = [
  { id: "r1", studentName: "Arjun Mehta", exam: "CA Foundation", rank: "AIR 1", year: 2024, photo: null },
  { id: "r2", studentName: "Sneha Patel", exam: "CA Intermediate", rank: "AIR 3", year: 2024, photo: null },
  { id: "r3", studentName: "Rahul Singh", exam: "CS Foundation", rank: "AIR 2", year: 2024, photo: null },
  { id: "r4", studentName: "Pooja Gupta", exam: "CMA Foundation", rank: "AIR 5", year: 2024, photo: null },
  { id: "r5", studentName: "Varun Joshi", exam: "CUET", rank: "99.8 Percentile", year: 2024, photo: null },
  { id: "r6", studentName: "Ananya Sharma", exam: "CA Foundation", rank: "AIR 4", year: 2024, photo: null },
];

const FALLBACK_TESTIMONIALS = [
  { id: "t1", name: "Riya Kapoor", text: "Academica Institute transformed my CA Foundation journey. The structured approach and constant support helped me clear the exam in my first attempt!", rating: 5, course: "CA Foundation", avatar: null },
  { id: "t2", name: "Siddharth Nair", text: "Best decision I made. The faculty here are incredibly experienced and patient. Cleared CS Foundation with distinction!", rating: 5, course: "CS Foundation", avatar: null },
  { id: "t3", name: "Divya Mehra", text: "The economics coaching here is phenomenal. I scored 92% in my Class 12 boards thanks to the concept-based teaching approach.", rating: 5, course: "Class 12 Commerce", avatar: null },
];

const FALLBACK_FAQS = [
  { id: "q1", question: "What courses does Academica Institute offer?", answer: "We offer coaching for CA Foundation, CA Intermediate, CA Final, CS, CMA, CUET, and Class 9–12 Commerce subjects including Accountancy, Economics, and Business Studies." },
  { id: "q2", question: "When were you established?", answer: "Academica Institute was established in 2013 with the aim of providing quality guidance and the right direction to students." },
  { id: "q3", question: "How can I enroll in a course?", answer: "You can create a free account on our website, browse courses, and click Enroll Now. Payment can be made online securely." },
  { id: "q4", question: "Do you provide study materials?", answer: "Yes, we provide comprehensive study materials, notes, and practice papers for all our courses through our Resources section." },
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
  { value: "500+", label: "Top Selections", iconName: "trophy" },
  { value: "12+", label: "Years of Excellence", iconName: "award" },
  { value: "95%+", label: "Success Rate", iconName: "trendingUp" },
];

const heroIconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  users: Users,
  trophy: Trophy,
  award: Award,
  trendingUp: TrendingUp,
};

export default async function HomePage() {
  // Fetch DB data with fallbacks
  const [banners, notices, courses, categories, faqs, testSeries, popup] = await Promise.all([
    getHeroBanners().catch(() => []),
    getActiveNotices().catch(() => []),
    getFeaturedCourses().catch(() => []),
    getCategories().catch(() => []),
    getActiveFAQs().catch(() => []),
    getFeaturedTestSeries ? getFeaturedTestSeries().catch(() => []) : Promise.resolve([]),
    getActivePopup().catch(() => null),
  ]);

  // Fetch additional data
  const [faculty, results, testimonials] = await Promise.all([
    db.faculty.findMany({ where: { featured: true, isActive: true }, orderBy: { order: "asc" }, take: 4 }).catch(() => []),
    db.result.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 }).catch(() => []),
    db.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 }).catch(() => []),
  ]);

  const displayCourses = courses.length ? courses : FALLBACK_COURSES;
  const displayFaculty = faculty.length ? faculty : FALLBACK_FACULTY;
  const displayResults = results.length ? results : FALLBACK_RESULTS;
  const displayTestimonials = testimonials.length ? testimonials : FALLBACK_TESTIMONIALS;
  const displayFAQs = faqs.length ? faqs : FALLBACK_FAQS;
  const heroBanner = banners[0];

  return (
    <>
      {/* Enrollment Popup */}
      {popup && <EnrollPopup popup={popup} />}

      {/* ── Notice Bar ─────────────────────────────────────────────────── */}
      {notices.length > 0 && (
        <div className="py-2 px-4 text-sm text-center font-medium overflow-hidden" style={{ background: "var(--gradient-accent)", color: "#fff" }}>
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold">📢 Notice:</span>
            <span>{notices[0].title}</span>
            {notices[0].link && (
              <Link href={notices[0].link} className="underline font-bold">Learn More →</Link>
            )}
          </div>
        </div>
      )}

      <HeroSection />
      <ResultsSection />

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <AnimatedStats stats={STATS} />
        </div>
      </section>

      {/* ── Course Categories ───────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Explore Our Programs</p>
            <h2 className="section-title">Courses for Every Goal</h2>
            <p className="section-subtitle mx-auto mt-3">
              Choose from our comprehensive range of professional and academic coaching programs designed to help you succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Commerce", slug: "COMMERCE", icon: BookOpen, color: "#2563eb", bg: "rgba(37,99,235,0.08)", count: categories.filter(c => c.type === "COMMERCE").length || 7, courses: ["CA Foundation", "CA Intermediate", "CS", "CMA", "B.Com"] },
              { label: "Science", slug: "SCIENCE", icon: Target, color: "#7c3aed", bg: "rgba(124,58,237,0.08)", count: categories.filter(c => c.type === "SCIENCE").length || 3, courses: ["IIT JEE", "NEET", "Foundation"] },
              { label: "School Coaching", slug: "SCHOOL", icon: GraduationCap, color: "#059669", bg: "rgba(5,150,105,0.08)", count: categories.filter(c => c.type === "SCHOOL").length || 4, courses: ["Class 9", "Class 10", "Class 11", "Class 12"] },
            ].map((cat) => (
              <Link key={cat.label} href={`/courses?type=${cat.slug}`} className="card p-6 group cursor-pointer no-underline">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: cat.bg }}>
                  <cat.icon size={22} style={{ color: cat.color }} />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>{cat.label}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{cat.count} courses available</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cat.courses.map((c) => (
                    <span key={c} className="badge badge-muted text-xs">{c}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: cat.color }}>
                  View Courses <ChevronRight size={15} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-eyebrow">Most Popular</p>
              <h2 className="section-title">Featured Courses</h2>
            </div>
            <Link href="/courses" className="btn-secondary btn-sm hidden sm:flex">
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCourses.slice(0, 4).map((course: any) => (
              <div key={course.id} className="card overflow-hidden flex flex-col">
                {/* Thumbnail */}
                <div className="h-40 relative flex items-center justify-center" style={{ background: "var(--bg-muted)" }}>
                  <BookOpen size={40} style={{ color: "var(--brand-secondary)", opacity: 0.3 }} />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-brand text-xs">{course.category?.name}</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-sm mb-1 leading-snug" style={{ color: "var(--text-primary)" }}>
                    {course.title}
                  </h3>
                  <p className="text-xs mb-3 line-clamp-2 flex-1" style={{ color: "var(--text-muted)" }}>
                    {course.description}
                  </p>
                  {course.faculty && (
                    <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                      👨‍🏫 {course.faculty.name}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="price-tag text-lg">₹{(course.price as number).toLocaleString("en-IN")}</span>
                      {(course.mrp as number) > (course.price as number) && (
                        <span className="price-original ml-1.5">₹{(course.mrp as number).toLocaleString("en-IN")}</span>
                      )}
                    </div>
                    <Link href={`/courses/${course.slug}`} className="btn-primary btn-sm">
                      Enroll
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/courses" className="btn-secondary">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Why Academica</p>
            <h2 className="section-title">The Academica Advantage</h2>
            <p className="section-subtitle mx-auto mt-3">
              We don't just teach — we build confidence, clarity, and the competitive edge needed to succeed.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="card-flat p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,99,235,0.08)" }}>
                  <item.icon size={20} style={{ color: "var(--brand-secondary)" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Faculty ─────────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-eyebrow">Meet Our Team</p>
              <h2 className="section-title">Expert Faculty</h2>
            </div>
            <Link href="/faculty" className="btn-secondary btn-sm hidden sm:flex">
              All Faculty <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayFaculty.map((f: any) => (
              <div key={f.id} className="card p-6 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white" style={{ background: "var(--gradient-brand)" }}>
                  {f.name.charAt(0)}
                </div>
                <h3 className="font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>{f.name}</h3>
                <p className="text-sm mb-3" style={{ color: "var(--brand-secondary)" }}>{f.designation}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {(f.subjects as string[]).slice(0, 3).map((s) => (
                    <span key={s} className="badge badge-muted text-xs">{s}</span>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>{f.experience}+ years experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Our Pride</p>
            <h2 className="section-title">Top Selections</h2>
            <p className="section-subtitle mx-auto mt-3">
              Hundreds of students have achieved top ranks and selections under our guidance.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayResults.map((r: any) => (
              <div key={r.id} className="card p-4 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-black text-white" style={{ background: "var(--gradient-brand)" }}>
                  {r.studentName.charAt(0)}
                </div>
                <h4 className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>{r.studentName}</h4>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{r.exam}</p>
                <span className="badge badge-accent text-xs">{r.rank}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/results" className="btn-secondary">View All Results</Link>
          </div>
        </div>
      </section>

      {/* ── Test Series ─────────────────────────────────────────────────── */}
      {testSeries && (testSeries as unknown[]).length > 0 && (
        <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
          <div className="container-custom">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-eyebrow">Practice Makes Perfect</p>
                <h2 className="section-title">Test Series</h2>
              </div>
              <Link href="/test-series" className="btn-secondary btn-sm hidden sm:flex">
                View All <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(testSeries as Record<string, unknown>[]).slice(0, 4).map((ts) => (
                <div key={ts.id as string} className="card p-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,99,235,0.08)" }}>
                    <BookOpen size={18} style={{ color: "var(--brand-secondary)" }} />
                  </div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{ts.title as string}</h3>
                  <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{ts.totalTests as number} tests included</p>
                  <div className="flex items-center justify-between">
                    <span className="price-tag text-base">₹{(ts.price as number).toLocaleString("en-IN")}</span>
                    <Link href={`/test-series`} className="btn-primary btn-sm">Buy</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Student Stories</p>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <TestimonialsSlider testimonials={displayTestimonials} />
        </div>
      </section>

      <GoogleReviewsSection />

      {/* ── FAQs ────────────────────────────────────────────────────────── */}
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

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Ready to Begin Your Journey?
          </h2>
          <p className="text-blue-200 mb-8 max-w-lg mx-auto">
            Join thousands of students who have transformed their futures with Academica Institute.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth" className="btn-accent btn-lg">
              Get Started Today
            </Link>
            <Link href="/contact" className="btn-lg rounded-xl font-semibold" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)" }}>
              <Phone size={18} /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
