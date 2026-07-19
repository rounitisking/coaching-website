"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Play, Clock, User, BookOpen } from "lucide-react";
import { YouTubeThumbnail } from "@/components/home/YouTubeThumbnail";

interface Faculty {
  name: string;
  slug: string;
}

interface Course {
  title: string;
  slug: string;
}

interface DemoVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnailUrl: string | null;
  subject: string | null;
  duration: string | null;
  description: string | null;
  faculty: Faculty | null;
  course: Course | null;
}

function DemoVideoCard({ video }: { video: DemoVideo }) {
  return (
    <a
      href={`/api/videos/watch?id=${video.id}&url=${encodeURIComponent(video.youtubeUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group card overflow-hidden flex flex-col no-underline hover:border-[var(--brand-secondary)] transition-all duration-300"
      aria-label={`Watch demo: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[var(--bg-muted)] overflow-hidden">
        <YouTubeThumbnail
          youtubeVideoId={video.youtubeVideoId}
          title={video.title}
          initialThumbnailUrl={video.thumbnailUrl}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
            <Play size={22} className="text-[var(--brand-secondary)] ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock size={10} />
            {video.duration}
          </div>
        )}
        {/* Subject badge */}
        {video.subject && (
          <div className="absolute top-2 left-2">
            <span className="badge badge-accent text-xs font-bold uppercase tracking-wider">
              {video.subject}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        <h3
          className="font-bold text-sm leading-snug line-clamp-2 flex-1 group-hover:text-[var(--brand-secondary)] transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 mt-auto">
          {video.faculty && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
              <User size={12} />
              <span className="truncate max-w-[120px]">{video.faculty.name}</span>
            </div>
          )}
          {video.course && (
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <BookOpen size={12} />
              <span className="truncate max-w-[100px]">{video.course.title}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export function DemoVideosClient({ videos }: { videos: DemoVideo[] }) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Extract unique filters
  const courses = useMemo(() => {
    const set = new Set(videos.map((v) => v.course?.title).filter(Boolean) as string[]);
    return ["all", ...Array.from(set).sort()];
  }, [videos]);

  const subjects = useMemo(() => {
    const set = new Set(videos.map((v) => v.subject).filter(Boolean) as string[]);
    return ["all", ...Array.from(set).sort()];
  }, [videos]);

  const faculties = useMemo(() => {
    const set = new Set(videos.map((v) => v.faculty?.name).filter(Boolean) as string[]);
    return ["all", ...Array.from(set).sort()];
  }, [videos]);

  // Filter videos
  const filtered = useMemo(() => {
    setVisibleCount(6); // Reset pagination count on filter change
    return videos.filter((v) => {
      const matchSearch =
        !search ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.subject?.toLowerCase().includes(search.toLowerCase()) ||
        v.description?.toLowerCase().includes(search.toLowerCase());

      const matchCourse = courseFilter === "all" || v.course?.title === courseFilter;
      const matchSubject = subjectFilter === "all" || v.subject === subjectFilter;
      const matchFaculty = facultyFilter === "all" || v.faculty?.name === facultyFilter;

      return matchSearch && matchCourse && matchSubject && matchFaculty;
    });
  }, [videos, search, courseFilter, subjectFilter, facultyFilter]);

  const paginated = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search demo classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
          />
        </div>

        {/* Course Filter */}
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
          aria-label="Filter by course"
        >
          <option value="all">All Courses</option>
          {courses.filter(c => c !== "all").map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Subject Filter */}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
          aria-label="Filter by subject"
        >
          <option value="all">All Subjects</option>
          {subjects.filter(s => s !== "all").map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Faculty Filter */}
        <select
          value={facultyFilter}
          onChange={(e) => setFacultyFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
          aria-label="Filter by faculty"
        >
          <option value="all">All Faculty</option>
          {faculties.filter(f => f !== "all").map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((video) => (
            <DemoVideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Filter size={32} className="mx-auto mb-4 text-[var(--text-muted)]" />
          <p className="text-[var(--text-muted)]">No demo lectures match your filters.</p>
        </div>
      )}

      {/* Load More Button */}
      {filtered.length > visibleCount && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="btn-primary py-2.5 px-6 text-sm font-semibold rounded-xl"
          >
            Load More Lectures
          </button>
        </div>
      )}
    </div>
  );
}
