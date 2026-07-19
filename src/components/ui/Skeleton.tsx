import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ""}`} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm">
      <Skeleton className="w-full h-44 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="w-1/3 h-4 rounded" />
        <Skeleton className="w-full h-5 rounded" />
        <Skeleton className="w-5/6 h-5 rounded" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="w-1/4 h-6 rounded" />
        <Skeleton className="w-1/3 h-8 rounded-lg" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm">
      <Skeleton className="w-full h-40 rounded-2xl" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="w-1/4 h-4 rounded" />
          <Skeleton className="w-1/5 h-4 rounded" />
        </div>
        <Skeleton className="w-full h-5 rounded" />
        <Skeleton className="w-4/5 h-4 rounded" />
      </div>
      <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
        <Skeleton className="w-1/3 h-4 rounded" />
        <Skeleton className="w-1/4 h-8 rounded-lg" />
      </div>
    </div>
  );
}

export function DemoCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <Skeleton className="w-full aspect-video" />
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <Skeleton className="w-16 h-4 rounded" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
          <Skeleton className="w-full h-5 rounded" />
          <Skeleton className="w-2/3 h-5 rounded" />
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
        <Skeleton className="w-1/4 h-4 rounded" />
        <Skeleton className="w-1/4 h-4 rounded" />
      </div>
    </div>
  );
}

export function NoteCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="w-1/4 h-4 rounded" />
          <Skeleton className="w-3/4 h-5 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-12 rounded-xl" />
      <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
        <Skeleton className="w-1/4 h-4 rounded" />
        <Skeleton className="w-1/3 h-8 rounded-lg" />
      </div>
    </div>
  );
}
