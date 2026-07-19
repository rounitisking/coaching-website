import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FileText, Download, Lock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardDownloadsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const userId = session.user.id;
  
  let purchasedResources: any[] = [];
  let freeResources: any[] = [];

  try {
    const purchases = await db.resourcePurchase.findMany({
      where: { userId },
      include: {
        resource: {
          include: { category: true },
        },
      },
      orderBy: { purchasedAt: "desc" },
    });
    purchasedResources = purchases.map((p) => p.resource);

    freeResources = await db.resource.findMany({
      where: { isFree: true, isActive: true },
      include: { category: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Dashboard downloads query error:", error);
  }

  // Combine & de-duplicate resources
  const allAvailable = [
    ...purchasedResources,
    ...freeResources.filter((fr) => !purchasedResources.some((pr) => pr.id === fr.id)),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          My Downloads
        </h1>
        <p className="text-slate-550 dark:text-slate-400 text-sm mt-1">
          Access all your purchased and free downloadable notes, DPPs, and reference guides.
        </p>
      </div>

      {allAvailable.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <FileText className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={56} />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No downloads available</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            You don't have any free or premium downloads yet. Browse our Notes section to get started.
          </p>
          <Link href="/notes" className="btn-primary">
            Browse Study Material
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAvailable.map((res) => (
            <div
              key={res.id}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600 mb-4">
                  <FileText size={20} />
                </div>
                
                <span className="badge text-[10px] font-bold uppercase tracking-wider mb-2">
                  {res.type}
                </span>

                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 mt-2 line-clamp-2">
                  {res.description || "Comprehensive syllabus notes prepared by expert faculty."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md">
                  {res.isFree ? "Free Access" : "Purchased"}
                </span>

                {res.fileUrl ? (
                  <a
                    href={res.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-xs rounded-lg flex items-center gap-1.5 no-underline py-2 px-3 text-xs"
                  >
                    Download <Download size={14} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn-secondary btn-xs opacity-60 flex items-center gap-1.5 cursor-not-allowed py-2 px-3 text-xs"
                  >
                    Unavailable <Lock size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
