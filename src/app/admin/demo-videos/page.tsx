import { adminGetAllDemoVideos } from "@/actions/admin";
import { adminGetAllFaculty, adminGetAllCourses } from "@/actions/admin";
import { AdminDemoVideosClient } from "@/components/admin/AdminDemoVideosClient";
import { Video } from "lucide-react";

export const dynamic = "force-dynamic";

// We need faculty and courses for linking
async function getData() {
  const [videos, faculty, courses] = await Promise.all([
    adminGetAllDemoVideos(),
    adminGetAllFaculty(),
    adminGetAllCourses(),
  ]);
  return { videos, faculty, courses };
}

export default async function AdminDemoVideosPage() {
  const { videos, faculty, courses } = await getData();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Video size={24} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-100">Demo Videos</h1>
        </div>
        <p className="text-slate-500 text-sm">Manage YouTube demo class videos. Link them to faculty and courses.</p>
      </div>
      <AdminDemoVideosClient
        initialVideos={videos.map(v => ({
          ...v,
          faculty: v.faculty ?? null,
          course: v.course ?? null,
        }))}
        facultyList={faculty.map(f => ({ id: f.id, name: f.name }))}
        courses={courses.map(c => ({ id: c.id, title: c.title }))}
      />
    </div>
  );
}
