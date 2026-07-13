"use client";

import { useState, useTransition } from "react";
import { Search, Loader2, Ban, ShieldCheck, ChevronLeft, ChevronRight, User } from "lucide-react";
import { adminToggleUserStatus } from "@/actions/admin";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  isActive: boolean;
  createdAt: Date;
  _count: {
    enrollments: number;
    orders: number;
  };
}

interface AdminStudentsClientProps {
  initialData: {
    students: Student[];
    totalPages: number;
    total: number;
  };
  page: number;
}

export function AdminStudentsClient({ initialData, page }: AdminStudentsClientProps) {
  const [students, setStudents] = useState<Student[]>(initialData.students);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleStatus = (id: string) => {
    startTransition(async () => {
      const res = await adminToggleUserStatus(id);
      if (res.success) {
        setStudents((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
        );
      }
    });
  };

  const handlePageChange = (p: number) => {
    router.push(`/admin/students?page=${p}`);
  };

  const filtered = students.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex gap-3 items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            className="input pl-10 py-2.5"
            placeholder="Search email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Students list table */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Phone</th>
                <th>Enrollments</th>
                <th>Registered On</th>
                <th>Access Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">
                    No learners registered yet.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                          <User size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{s.name || "Student"}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{s.phone || "-"}</td>
                    <td className="font-bold">{s._count.enrollments} Courses</td>
                    <td>{new Date(s.createdAt).toLocaleDateString("en-IN")}</td>
                    <td>
                      <span className={`badge text-xs ${s.isActive ? "badge-success" : "badge-error"}`}>
                        {s.isActive ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(s.id)}
                        disabled={isPending}
                        className={`p-1.5 rounded-lg border flex items-center gap-1 text-[10px] font-bold ${
                          s.isActive
                            ? "border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                            : "border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                        }`}
                      >
                        {s.isActive ? (
                          <><Ban size={12} /> Suspend</>
                        ) : (
                          <><ShieldCheck size={12} /> Re-activate</>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination control footer */}
      {initialData.totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <p className="text-xs text-slate-500">
            Page {page} of {initialData.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="btn-secondary btn-sm rounded-lg"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= initialData.totalPages}
              className="btn-secondary btn-sm rounded-lg"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
