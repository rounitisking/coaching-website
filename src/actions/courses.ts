'use server'
import { db } from '@/lib/db'

export async function getFeaturedCourses() {
  try {
    return await db.course.findMany({
      where: { featured: true, isActive: true, isPublished: true },
      include: { category: true, faculty: true },
      orderBy: { order: 'asc' },
      take: 6,
    })
  } catch {
    return []
  }
}

export async function getCourses(params?: {
  categoryId?: string
  search?: string
  page?: number
  pageSize?: number
}) {
  const { categoryId, search, page = 1, pageSize = 12 } = params || {}
  const where = {
    isActive: true,
    isPublished: true,
    ...(categoryId && { categoryId }),
    ...(search && { title: { contains: search, mode: 'insensitive' as const } }),
  }
  const [courses, total] = await Promise.all([
    db.course.findMany({
      where,
      include: { category: true, faculty: true },
      orderBy: { order: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.course.count({ where }),
  ])
  return { courses, total, totalPages: Math.ceil(total / pageSize) }
}

export async function getCourseBySlug(slug: string) {
  return db.course.findUnique({
    where: { slug },
    include: {
      category: true,
      faculty: true,
      modules: {
        include: { lessons: { orderBy: { order: 'asc' } } },
        orderBy: { order: 'asc' },
      },
    },
  })
}

export async function getCategories() {
  try {
    return await db.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { courses: true } } },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}

export async function isEnrolled(
  userId: string,
  courseId: string
): Promise<boolean> {
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  })
  return !!enrollment?.isActive
}

export async function getEnrolledCourses(userId: string) {
  return db.enrollment.findMany({
    where: { userId, isActive: true },
    include: { course: { include: { category: true } } },
    orderBy: { enrolledAt: 'desc' },
  })
}
