import { results as staticResults } from "@/data/results";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResultsClient } from "@/components/results/ResultsClient";
import { ResultsSection } from "@/components/home/ResultsSection";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Top Selections & Academic Results | Academica Institute",
  description: "Explore the achievements of Academica Institute students clearing CA, CS, CMA, and school board exams with top ranks.",
};

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  let dbResults: any[] = [];
  try {
    dbResults = await db.result.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch results from database:", error);
  }

  const hasDbResults = dbResults && dbResults.length > 0;

  const displayResults = hasDbResults
    ? dbResults.map((r) => ({
        id: r.id,
        name: r.studentName,
        photo: r.photo,
        exam: r.exam,
        rank: r.rank,
        score: r.score,
        year: r.year,
      }))
    : staticResults.map((r) => ({
        id: r.id,
        name: r.name,
        photo: r.photo,
        exam: r.exam,
        rank: r.rank,
        score: r.score,
        year: r.year,
      }));

  return (
    <div className="bg-[var(--bg-primary)] text-left">
      {/* Ticker on top */}
      <ResultsSection />

      <div className="section py-12">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Student Achievements"
            title="Our All-Time"
            titleHighlight="Rankers"
            subtitle="Every result here represents a dream fulfilled. Filter through selections across CA, CS, CMA, CUET, and school boards."
            className="mb-10"
          />

          <ResultsClient initialResults={displayResults} />
        </div>
      </div>
    </div>
  );
}
