import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ courses: [], faculty: [], notes: [], blogs: [] });
  }

  try {
    const [courses, faculty, notes, blogs] = await Promise.all([
      // Search courses
      db.course.findMany({
        where: {
          isActive: true,
          isPublished: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          category: { select: { name: true } },
        },
        take: 4,
        orderBy: { featured: "desc" },
      }),

      // Search faculty
      db.faculty.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { designation: { contains: q, mode: "insensitive" } },
            { specialization: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, name: true, slug: true, designation: true },
        take: 4,
        orderBy: { featured: "desc" },
      }),

      // Search notes (Resource table)
      db.resource.findMany({
        where: {
          isActive: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { subject: { contains: q, mode: "insensitive" } },
            { course: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, title: true, subject: true, isFree: true },
        take: 4,
        orderBy: { order: "asc" },
      }),

      // Search blogs
      db.blog.findMany({
        where: {
          isActive: true,
          isPublished: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, title: true, slug: true, excerpt: true },
        take: 4,
        orderBy: { featured: "desc" },
      }),
    ]);

    return NextResponse.json({
      courses: courses.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        category: c.category.name,
      })),
      faculty: faculty.map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        designation: f.designation,
      })),
      notes: notes.map((n) => ({
        id: n.id,
        title: n.title,
        subject: n.subject,
      })),
      blogs: blogs.map((b) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
      })),
    });
  } catch (error) {
    console.error("[Search API]", error);
    return NextResponse.json(
      { courses: [], faculty: [], notes: [], blogs: [] },
      { status: 500 }
    );
  }
}
