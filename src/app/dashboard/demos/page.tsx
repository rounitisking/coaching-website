import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Video, ArrowRight, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function DemoHistoryPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  const history = await db.videoHistory.findMany({
    where: { userId: session.user.id },
    include: {
      demoVideo: {
        include: {
          faculty: { select: { name: true } },
          course: { select: { title: true } },
        },
      },
    },
    orderBy: { watchedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          Demo Watch History
        </h1>
        <p className="text-slate-555 dark:text-slate-400 text-sm mt-1">
          Demo lectures and classes you have watched.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto mt-8">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
            <Video size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No watched lectures</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
            Watch free demo classes from our expert faculty to build concepts and see our training style.
          </p>
          <Link href="/demo-classes" className="btn-primary btn-sm inline-flex items-center gap-1">
            Explore Demo Classes <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {history.map(({ id, watchedAt, demoVideo }) => {
            if (!demoVideo) return null;
            const watchedTimeAgo = formatDistanceToNow(new Date(watchedAt), {
              addSuffix: true,
            });

            return (
              <div
                key={id}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    {demoVideo.thumbnailUrl ? (
                      <Image
                        src={demoVideo.thumbnailUrl}
                        alt={demoVideo.title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                        <Video size={48} />
                      </div>
                    )}
                    <a
                      href={`/api/videos/watch?id=${demoVideo.id}&url=${encodeURIComponent(
                        demoVideo.youtubeUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                        <Play size={18} className="text-blue-600 ml-0.5" fill="currentColor" />
                      </div>
                    </a>
                    {demoVideo.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Clock size={10} /> {demoVideo.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex gap-1.5 flex-wrap mb-1.5">
                      {demoVideo.subject && (
                        <span className="badge text-[9px] font-bold uppercase tracking-wider">
                          {demoVideo.subject}
                        </span>
                      )}
                      {demoVideo.course && (
                        <span className="badge text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-350">
                          {demoVideo.course.title}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-snug line-clamp-2">
                      {demoVideo.title}
                    </h3>
                    {demoVideo.faculty && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                        Teacher: <span className="font-semibold text-slate-705 dark:text-slate-300">{demoVideo.faculty.name}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-405 dark:text-slate-500 flex items-center gap-1">
                    <Calendar size={12} /> Watched {watchedTimeAgo}
                  </span>
                  <a
                    href={`/api/videos/watch?id=${demoVideo.id}&url=${encodeURIComponent(
                      demoVideo.youtubeUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Watch Again →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
