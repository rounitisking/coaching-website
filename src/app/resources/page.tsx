import { resources as staticResources, resourceTypes } from "@/data/resources";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResourcesClient } from "@/components/resources/ResourcesClient";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Study Resources | Academica Institute",
  description: "Download revision notes, daily practice problems (DPPs), mock tests, and previous year question papers from Academica Institute.",
};

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const session = await auth();
  let dbResources: any[] = [];
  let purchasedIds: string[] = [];

  try {
    dbResources = await db.resource.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch resources from database:", error);
  }

  if (session?.user?.id) {
    try {
      const purchases = await db.resourcePurchase.findMany({
        where: { userId: session.user.id },
        select: { resourceId: true },
      });
      purchasedIds = purchases.map((p: { resourceId: string }) => p.resourceId);
    } catch {}
  }

  const hasDbResources = dbResources && dbResources.length > 0;

  const displayResources = hasDbResources
    ? dbResources.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description || "Reference notes for revision.",
        type: r.type.toLowerCase(),
        subject: r.subject || "General",
        course: r.category?.name || "All Courses",
        fileUrl: r.fileUrl,
        fileSize: "PDF",
        free: r.isFree,
        price: r.price,
      }))
    : staticResources.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        type: r.type,
        subject: r.subject,
        course: r.course,
        fileUrl: r.fileUrl,
        fileSize: r.fileSize,
        free: r.free,
        price: 0,
      }));

  return (
    <div className="section bg-[var(--bg-primary)] py-12 text-left">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Study Material"
          title="Student"
          titleHighlight="Resources"
          subtitle="Download free notes, DPPs, previous year papers, and test series. Access all study materials to help you succeed."
          className="mb-10"
        />

        <ResourcesClient
          initialResources={displayResources}
          resourceTypes={resourceTypes}
          isLoggedIn={!!session?.user}
          purchasedIds={purchasedIds}
        />
      </div>
    </div>
  );
}
