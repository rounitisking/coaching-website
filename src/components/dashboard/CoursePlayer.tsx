"use client";

import { useState } from "react";
import { Play, FileText, CheckCircle2, ChevronDown, ChevronUp, Video, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  duration: number | null;
  order: number;
  isFree: boolean;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface CoursePlayerProps {
  course: {
    id: string;
    title: string;
    description: string;
    modules: Module[];
  };
}

export function CoursePlayer({ course }: CoursePlayerProps) {
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    allLessons.length > 0 ? allLessons[0] : null
  );
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    course.modules.reduce((acc, m, idx) => ({ ...acc, [m.id]: idx === 0 }), {})
  );

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Video / Player Area */}
      <div className="lg:col-span-2 space-y-4">
        {activeLesson ? (
          <div className="space-y-4">
            {/* Video Box */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center">
              {activeLesson.videoUrl ? (
                <iframe
                  src={activeLesson.videoUrl}
                  className="absolute inset-0 w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8">
                  <Video size={48} className="mx-auto text-slate-600 mb-3 animate-pulse" />
                  <p className="text-sm font-bold text-slate-300">No video URL provided for this lesson.</p>
                  <p className="text-xs text-slate-500 mt-1">Please contact your administrator or teacher.</p>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{activeLesson.title}</h2>
              {activeLesson.duration && (
                <span className="inline-block mt-2 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded-lg">
                  ⏱ {activeLesson.duration} Minutes
                </span>
              )}
              {activeLesson.description && (
                <p className="text-sm text-[var(--text-muted)] mt-4 leading-relaxed border-t border-[var(--border)] pt-4">
                  {activeLesson.description}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] text-center">
            <GraduationCap className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={56} />
            <h3 className="font-bold text-[var(--text-primary)]">No modules or lessons</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">Check back later for uploaded course videos.</p>
          </div>
        )}
      </div>

      {/* Playlist sidebar */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Course Syllabus</h2>

        <div className="space-y-3">
          {course.modules.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)]">No syllabus loaded.</p>
          ) : (
            course.modules.map((mod) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  className="rounded-2xl border bg-[var(--bg-card)] overflow-hidden"
                  style={{ borderColor: "var(--border)" }}
                >
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center justify-between p-4 font-bold text-sm text-left text-[var(--text-primary)]"
                  >
                    <span>{mod.title}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-[var(--border)] divide-y divide-slate-100 dark:divide-slate-800"
                      >
                        {mod.lessons.length === 0 ? (
                          <div className="p-3 text-xs text-[var(--text-muted)] italic">No lessons in this module.</div>
                        ) : (
                          mod.lessons.map((les) => {
                            const isActive = activeLesson?.id === les.id;
                            return (
                              <button
                                key={les.id}
                                onClick={() => setActiveLesson(les)}
                                className={`w-full flex items-center gap-3 p-3.5 text-left text-xs transition-colors ${
                                  isActive
                                    ? "bg-blue-50/50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 font-bold"
                                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] dark:hover:bg-[var(--bg-secondary)]"
                                }`}
                              >
                                <Play
                                  size={14}
                                  className={isActive ? "fill-blue-600 dark:fill-blue-400" : ""}
                                />
                                <span className="flex-1 line-clamp-1">{les.title}</span>
                                {les.duration && (
                                  <span className="text-[10px] text-[var(--text-muted)]">{les.duration}m</span>
                                )}
                              </button>
                            );
                          })
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
