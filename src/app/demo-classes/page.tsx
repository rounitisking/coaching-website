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
    title: "CA Foundation — Introduction to Accountancy",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    thumbnailUrl: null,
    subject: "Accountancy",
    duration: "45 min",
    description: "Complete overview of Partnership Accounts for CA Foundation.",
    faculty: null,
    course: null,
  },
  {
    id: "d2",
    title: "Business Economics — Law of Demand Explained",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    thumbnailUrl: null,
    subject: "Economics",
    duration: "35 min",
    description: "Law of Demand with diagrams and real-world examples.",
    faculty: null,
    course: null,
  },
  {
    id: "d3",
    title: "Class 12 Commerce — Ratio Analysis",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    thumbnailUrl: null,
    subject: "Accountancy",
    duration: "50 min",
    description: "Complete Ratio Analysis chapter walkthrough.",
    faculty: null,
    course: null,
  },
  {
    id: "d4",
    title: "CS Foundation — Elements of Company Law",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    thumbnailUrl: null,
    subject: "Company Law",
    duration: "40 min",
    description: "Introduction to Company Law for CS Foundation.",
    faculty: null,
    course: null,
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
