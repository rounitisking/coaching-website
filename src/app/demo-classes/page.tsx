import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { DemoVideosClient } from "@/components/demo/DemoVideosClient";
import { DemoCardSkeleton } from "@/components/ui/Skeleton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demo Classes — Academica Institute",
  description:
    "Watch free demo lectures from our expert faculty for CA, CS, CMA, IIT JEE, NEET and School Coaching. Get a feel for our teaching style before enrolling.",
};

const FALLBACK_VIDEOS = [
  {
    id: "d1",
    title: "CA Foundation Complete Course Guidance — Navin Classes",
    youtubeUrl: "https://www.youtube.com/watch?v=R9jYV7vU96I",
    youtubeVideoId: "R9jYV7vU96I",
    thumbnailUrl: null,
    subject: "CA Foundation",
    duration: "52 min",
    description: "Complete preparation strategy and syllabus overview for CA Foundation batch.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "1", title: "CA Foundation", slug: "ca-foundation" },
  },
  {
    id: "d2",
    title: "CA Inter Introduction & Advanced Accounts Guidance — Anoop Institute",
    youtubeUrl: "https://www.youtube.com/watch?v=Z8_P9L1V9gU",
    youtubeVideoId: "Z8_P9L1V9gU",
    thumbnailUrl: null,
    subject: "CA Intermediate",
    duration: "48 min",
    description: "Introduction to CA Intermediate subjects, group planning, and study roadmap.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "2", title: "CA Intermediate", slug: "ca-intermediate" },
  },
  {
    id: "d3",
    title: "CSEET Free Demo Class — Legal Aptitude & Logical Reasoning — YES Academy",
    youtubeUrl: "https://www.youtube.com/watch?v=kQW_6q5q1xU",
    youtubeVideoId: "kQW_6q5q1xU",
    thumbnailUrl: null,
    subject: "CS",
    duration: "60 min",
    description: "First demo class for CS Executive Entrance Test covering key legal aptitude concepts.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "3", title: "CS (CSEET)", slug: "cs-foundation" },
  },
  {
    id: "d4",
    title: "CS Executive Demo Lecture — Company Law & Practice — YES Academy",
    youtubeUrl: "https://www.youtube.com/watch?v=K_Yq9g1y0fQ",
    youtubeVideoId: "K_Yq9g1y0fQ",
    thumbnailUrl: null,
    subject: "CS Executive",
    duration: "55 min",
    description: "Mastering Company Law fundamentals, corporate bodies, and directors' duties.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "4", title: "CS Executive", slug: "cs-executive" },
  },
  {
    id: "d5",
    title: "CMA Foundation Accounting Basics & Quantitative Aptitude — Navin Classes",
    youtubeUrl: "https://www.youtube.com/watch?v=g_J-Bv_g8sQ",
    youtubeVideoId: "g_J-Bv_g8sQ",
    thumbnailUrl: null,
    subject: "CMA Foundation",
    duration: "40 min",
    description: "Foundational accounting principles, double entry system, and costing concepts.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "5", title: "CMA Foundation", slug: "cma-foundation" },
  },
  {
    id: "d6",
    title: "CMA Intermediate Introduction to Cost Accounting — Gyan Sagar Classes",
    youtubeUrl: "https://www.youtube.com/watch?v=tH1Y9r1gJtE",
    youtubeVideoId: "tH1Y9r1gJtE",
    thumbnailUrl: null,
    subject: "CMA Intermediate",
    duration: "50 min",
    description: "In-depth overview of Material Costing, Labour Costing, and Overhead allocation.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "6", title: "CMA Intermediate", slug: "cma-intermediate" },
  },
  {
    id: "d7",
    title: "Class 11 Commerce Demo Class — Basics of Ledger & Journal Entries — Only Lectures",
    youtubeUrl: "https://www.youtube.com/watch?v=LzY_vH3gRiw",
    youtubeVideoId: "LzY_vH3gRiw",
    thumbnailUrl: null,
    subject: "Class 11",
    duration: "45 min",
    description: "Learn ledger rules, modern classification of accounts, and debit-credit formulas.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "7", title: "Class 11 Commerce", slug: "class-11-commerce" },
  },
  {
    id: "d8",
    title: "Class 12 Commerce Board Preparation Demo Class — Partnership Accounting — Only Lectures",
    youtubeUrl: "https://www.youtube.com/watch?v=Z8_P9L1V9gU",
    youtubeVideoId: "Z8_P9L1V9gU",
    thumbnailUrl: null,
    subject: "Class 12",
    duration: "50 min",
    description: "Comprehensive board syllabus walkthrough and Partnership Valuation methods.",
    faculty: { id: "vijay-sharma", name: "Vijay Sir", slug: "vijay-sharma" },
    course: { id: "8", title: "Class 12 Commerce", slug: "class-12-commerce" },
  },
];

async function DemoLecturesGrid() {
  const videos = await db.demoVideo
    .findMany({
      where: { isActive: true },
      include: {
        faculty: { select: { name: true, slug: true } },
        course: { select: { title: true, slug: true } },
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    })
    .catch(() => []);

  const displayVideos = videos.length > 0 ? videos : FALLBACK_VIDEOS;

  return <DemoVideosClient videos={displayVideos as any} />;
}

export default function DemoClassesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
            Free Preview Lectures
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Demo Classes
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-8">
            Watch free sample lectures from our expert faculty before enrolling. Get a feel for our
            teaching style and subject depth.
          </p>
          <Link href="/auth" className="btn-accent btn-lg font-bold" id="demo-enroll-cta">
            Enroll After Watching
          </Link>
        </div>
      </section>

      {/* Videos Section */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="mb-10">
            <p className="section-eyebrow">Free Lectures</p>
            <h2 className="section-title">Watch Demo Classes</h2>
          </div>

          <Suspense
            fallback={
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <DemoCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <DemoLecturesGrid />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Ready to Enroll?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Join our structured batches and get access to full recorded lectures, study material,
            and personal mentorship.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses" className="btn-primary btn-lg font-bold">
              Browse Courses
            </Link>
            <Link href="/contact" className="btn-secondary btn-lg">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
