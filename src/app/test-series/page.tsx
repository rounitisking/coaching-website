import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClipboardList, Lock, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import TestSeriesClient from "@/components/test-series/TestSeriesClient";

export const metadata: Metadata = {
  title: "Test Series | Academica Institute",
  description: "Access comprehensive mock test series for CA, CS, CMA, IIT JEE, NEET and school board exams at Academica Institute.",
};

export default async function TestSeriesPage() {
  const session = await auth();

  let testSeries: any[] = [];
  let userPurchases: string[] = [];

  try {
    testSeries = await db.testSeries.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "asc" },
    });
  } catch {
    testSeries = [];
  }

  if (session?.user?.id) {
    try {
      const purchases = await db.testPurchase.findMany({
        where: { userId: session.user.id, isActive: true },
        select: { testSeriesId: true },
      });
      userPurchases = purchases.map((p: { testSeriesId: string }) => p.testSeriesId);
    } catch {
      userPurchases = [];
    }
  }

  // Fallback data if DB empty
  const FALLBACK: any[] = [
    { id: "1", title: "CA Foundation Full Mock Test", description: "Complete set of 10 full-length mock tests covering all CA Foundation subjects.", price: 999, mrp: 1999, category: { type: "COMMERCE", name: "Commerce" }, fileUrl: null, totalTests: 10, duration: "3 hours" },
    { id: "2", title: "CA Intermediate Mock Series", description: "Comprehensive mock tests for both groups of CA Intermediate.", price: 1499, mrp: 2999, category: { type: "COMMERCE", name: "Commerce" }, fileUrl: null, totalTests: 12, duration: "3 hours" },
    { id: "3", title: "IIT JEE Mains Practice Tests", description: "50 chapter-wise and 10 full-length mock tests for JEE Mains.", price: 1299, mrp: 2499, category: { type: "SCIENCE", name: "Science" }, fileUrl: null, totalTests: 60, duration: "3 hours" },
    { id: "4", title: "NEET Biology Mock Tests", description: "Focused NEET biology section mocks with detailed solutions.", price: 799, mrp: 1499, category: { type: "SCIENCE", name: "Science" }, fileUrl: null, totalTests: 15, duration: "1 hour" },
    { id: "5", title: "Class 12 Commerce Board Mock", description: "Chapter-wise and full-length mocks for Class 12 Commerce.", price: 499, mrp: 999, category: { type: "SCHOOL", name: "School" }, fileUrl: null, totalTests: 8, duration: "2 hours" },
    { id: "6", title: "Class 10 Science Mock Series", description: "CBSE Class 10 Science mock tests with NCERT solutions.", price: 399, mrp: 799, category: { type: "SCHOOL", name: "School" }, fileUrl: null, totalTests: 5, duration: "2 hours" },
  ];

  const displaySeries = testSeries.length ? testSeries : FALLBACK;

  return (
    <div className="section bg-[var(--bg-primary)] py-12 text-left">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Practice & Prepare"
          title="Mock Test"
          titleHighlight="Series"
          subtitle="Sharpen your exam skills with our comprehensive mock test series designed by top educators and exam experts."
          className="mb-8"
        />
        <TestSeriesClient
          testSeries={displaySeries}
          userPurchases={userPurchases}
          isLoggedIn={!!session?.user}
        />
      </div>
    </div>
  );
}
