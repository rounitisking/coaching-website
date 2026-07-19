'use server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/types'

async function requireAdmin() {
  const session = await auth()
  if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
  return session!
}

export async function getAdminStats() {
  await requireAdmin()
  const [
    totalStudents,
    totalCourses,
    totalOrders,
    revenueData,
    recentOrders,
    recentStudents,
    totalFaculty,
    totalBlogs,
    totalDemoVideos,
    totalNotes,
    pendingApplications
  ] = await Promise.all([
    db.user.count({ where: { role: 'USER' } }),
    db.course.count(),
    db.order.count(),
    db.order.aggregate({ _sum: { amount: true }, where: { status: 'PAID' } }),
    db.order.findMany({
      take: 5,
      include: { user: true, items: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.user.findMany({
      take: 5,
      where: { role: 'USER' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    db.faculty.count(),
    db.blog.count(),
    db.demoVideo.count(),
    db.resource.count(),
    db.facultyApplication.count({ where: { status: 'PENDING' } }),
  ])
  return {
    totalStudents,
    totalCourses,
    totalOrders,
    totalRevenue: revenueData._sum.amount ?? 0,
    recentOrders,
    recentStudents,
    totalFaculty,
    totalBlogs,
    totalDemoVideos,
    totalNotes,
    pendingApplications,
  }
}

// ─── HERO BANNERS ────────────────────────────────────────────────────────────
export async function getHeroBanners() {
  return db.heroBanner.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } })
}
export async function getAllHeroBanners() {
  await requireAdmin()
  return db.heroBanner.findMany({ orderBy: { order: 'asc' } })
}
export async function createHeroBanner(data: {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaUrl?: string
  image?: string
  badgeText?: string
  order?: number
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.heroBanner.create({ data })
    revalidatePath('/')
    revalidatePath('/admin/banners')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function updateHeroBanner(
  id: string,
  data: Partial<{
    title: string
    subtitle: string
    description: string
    ctaText: string
    ctaUrl: string
    image: string
    badgeText: string
    isActive: boolean
    order: number
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.heroBanner.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/admin/banners')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function deleteHeroBanner(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.heroBanner.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/banners')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export async function createCategory(data: {
  name: string
  slug: string
  type: 'COMMERCE' | 'SCIENCE' | 'SCHOOL'
  description?: string
  icon?: string
  color?: string
  order?: number
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.category.create({ data })
    revalidatePath('/courses')
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function updateCategory(
  id: string,
  data: Partial<{
    name: string
    slug: string
    type: 'COMMERCE' | 'SCIENCE' | 'SCHOOL'
    description: string
    icon: string
    color: string
    order: number
    isActive: boolean
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.category.update({ where: { id }, data })
    revalidatePath('/courses')
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function deleteCategory(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.category.delete({ where: { id } })
    revalidatePath('/courses')
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── COURSES ─────────────────────────────────────────────────────────────────
export async function adminGetAllCourses() {
  await requireAdmin()
  return db.course.findMany({
    include: { category: true, faculty: true },
    orderBy: { createdAt: 'desc' },
  })
}
export async function adminCreateCourse(data: {
  title: string
  slug: string
  description: string
  categoryId: string
  price?: number
  mrp?: number
  thumbnail?: string
  featured?: boolean
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.course.create({ data })
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateCourse(
  id: string,
  data: Partial<{
    title: string
    slug: string
    description: string
    content: string
    price: number
    mrp: number
    thumbnail: string
    brochure: string
    videoPreview: string
    duration: string
    language: string
    level: string
    featured: boolean
    isActive: boolean
    isPublished: boolean
    order: number
    categoryId: string
    facultyId: string
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.course.update({ where: { id }, data })
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteCourse(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.course.delete({ where: { id } })
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── FACULTY ─────────────────────────────────────────────────────────────────
export async function adminGetAllFaculty() {
  await requireAdmin()
  return db.faculty.findMany({
    include: { courses: true },
    orderBy: { order: 'asc' },
  })
}
export async function adminCreateFaculty(data: {
  name: string
  slug: string
  designation: string
  subjects?: string[]
  photo?: string
  bio?: string
  qualification?: string
  achievements?: string[]
  specialization?: string
  languages?: string[]
  socialLinkedIn?: string
  socialYoutube?: string
  resumeUrl?: string
  category?: 'COMMERCE' | 'SCIENCE' | 'SCHOOL'
  experience?: number
  featured?: boolean
  courseIds?: string[]
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    const { courseIds, ...facultyData } = data
    await db.faculty.create({
      data: {
        ...facultyData,
        courses: courseIds && courseIds.length > 0 ? {
          create: courseIds.map(cId => ({ courseId: cId }))
        } : undefined
      }
    })
    revalidatePath('/faculty')
    revalidatePath('/admin/faculty')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateFaculty(
  id: string,
  data: Partial<{
    name: string
    slug: string
    designation: string
    subjects: string[]
    photo: string
    bio: string
    qualification: string
    achievements: string[]
    specialization: string
    languages: string[]
    socialLinkedIn: string
    socialYoutube: string
    resumeUrl: string
    category: 'COMMERCE' | 'SCIENCE' | 'SCHOOL'
    experience: number
    featured: boolean
    isActive: boolean
    order: number
    courseIds: string[]
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    const { courseIds, ...facultyData } = data
    
    // Perform updates in transaction
    await db.$transaction(async (tx) => {
      // 1. Update basic fields
      await tx.faculty.update({
        where: { id },
        data: facultyData
      })
      
      // 2. If courseIds provided, update many-to-many relation
      if (courseIds !== undefined) {
        await tx.courseFaculty.deleteMany({
          where: { facultyId: id }
        })
        if (courseIds.length > 0) {
          await tx.courseFaculty.createMany({
            data: courseIds.map(cId => ({
              facultyId: id,
              courseId: cId
            }))
          })
        }
      }
    })
    
    revalidatePath('/faculty')
    revalidatePath('/admin/faculty')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteFaculty(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.faculty.delete({ where: { id } })
    revalidatePath('/faculty')
    revalidatePath('/admin/faculty')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
export async function adminGetAllResults() {
  await requireAdmin()
  return db.result.findMany({ include: { category: true }, orderBy: { order: 'asc' } })
}
export async function adminCreateResult(data: {
  studentName: string
  exam: string
  photo?: string
  score?: string
  rank?: string
  year?: number
  categoryId?: string
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.result.create({ data })
    revalidatePath('/results')
    revalidatePath('/admin/results')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateResult(
  id: string,
  data: Partial<{
    studentName: string
    exam: string
    photo: string
    score: string
    rank: string
    year: number
    categoryId: string
    isActive: boolean
    order: number
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.result.update({ where: { id }, data })
    revalidatePath('/results')
    revalidatePath('/admin/results')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteResult(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.result.delete({ where: { id } })
    revalidatePath('/results')
    revalidatePath('/admin/results')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export async function adminGetAllTestimonials() {
  await requireAdmin()
  return db.testimonial.findMany({ orderBy: { order: 'asc' } })
}
export async function adminCreateTestimonial(data: {
  name: string
  text: string
  avatar?: string
  rating?: number
  course?: string
  year?: number
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.testimonial.create({ data })
    revalidatePath('/')
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateTestimonial(
  id: string,
  data: Partial<{
    name: string
    text: string
    avatar: string
    rating: number
    course: string
    year: number
    isActive: boolean
    order: number
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.testimonial.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteTestimonial(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.testimonial.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export async function getActiveFAQs() {
  try {
    return await db.fAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } })
  } catch {
    return []
  }
}
export async function adminGetAllFAQs() {
  await requireAdmin()
  return db.fAQ.findMany({ orderBy: { order: 'asc' } })
}
export async function adminCreateFAQ(data: {
  question: string
  answer: string
  category?: string
  order?: number
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.fAQ.create({ data })
    revalidatePath('/')
    revalidatePath('/admin/faqs')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateFAQ(
  id: string,
  data: Partial<{
    question: string
    answer: string
    category: string
    order: number
    isActive: boolean
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.fAQ.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/admin/faqs')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteFAQ(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.fAQ.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/faqs')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── NOTICES ─────────────────────────────────────────────────────────────────
export async function getActiveNotices() {
  try {
    return await db.notice.findMany({
      where: {
        isActive: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}
export async function adminCreateNotice(data: {
  title: string
  content?: string
  link?: string
  isUrgent?: boolean
  expiresAt?: Date
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.notice.create({ data })
    revalidatePath('/')
    revalidatePath('/admin/notices')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateNotice(
  id: string,
  data: Partial<{
    title: string
    content: string
    link: string
    isUrgent: boolean
    isActive: boolean
    expiresAt: Date
    order: number
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.notice.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/admin/notices')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteNotice(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.notice.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/notices')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── POPUP ────────────────────────────────────────────────────────────────────
export async function getActivePopup() {
  try {
    return await db.popup.findFirst({ where: { isActive: true } })
  } catch {
    return null
  }
}
export async function adminUpdatePopup(
  id: string,
  data: Partial<{
    title: string
    content: string
    ctaText: string
    ctaUrl: string
    image: string
    isActive: boolean
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.popup.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/admin/popup')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── SITE SETTINGS ───────────────────────────────────────────────────────────
export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const s = await db.siteSetting.findUnique({ where: { key } })
    return s?.value ?? null
  } catch {
    return null
  }
}
export async function getSiteSettings(group?: string) {
  try {
    return await db.siteSetting.findMany({ where: group ? { group } : {} })
  } catch {
    return []
  }
}
export async function upsertSiteSetting(
  key: string,
  value: string,
  label?: string,
  group?: string
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.siteSetting.upsert({
      where: { key },
      update: { value, label, group },
      create: { key, value, label, group },
    })
    revalidatePath('/')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── STUDENTS / USERS ────────────────────────────────────────────────────────
export async function adminGetAllStudents(page = 1, pageSize = 20) {
  await requireAdmin()
  const [students, total] = await Promise.all([
    db.user.findMany({
      where: { role: 'USER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        _count: { select: { enrollments: true, orders: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.user.count({ where: { role: 'USER' } }),
  ])
  return { students, total, totalPages: Math.ceil(total / pageSize) }
}
export async function adminToggleUserStatus(userId: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) return { error: 'User not found' }
    await db.user.update({ where: { id: userId }, data: { isActive: !user.isActive } })
    revalidatePath('/admin/students')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export async function adminGetAllOrders(page = 1, pageSize = 20) {
  await requireAdmin()
  const [orders, total] = await Promise.all([
    db.order.findMany({
      include: { user: { select: { name: true, email: true } }, items: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.order.count(),
  ])
  return { orders, total, totalPages: Math.ceil(total / pageSize) }
}

// ─── RESOURCES ───────────────────────────────────────────────────────────────
export async function getPublicResources() {
  try {
    return await db.resource.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}
export async function adminGetAllResources() {
  await requireAdmin()
  return db.resource.findMany({ include: { category: true }, orderBy: { order: 'asc' } })
}
export async function adminCreateResource(data: {
  title: string
  description?: string
  type?: 'PDF' | 'VIDEO' | 'NOTES' | 'BROCHURE' | 'OTHER'
  fileUrl?: string
  previewUrl?: string
  thumbnail?: string
  subject?: string
  price?: number
  mrp?: number
  isFree?: boolean
  categoryId?: string
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.resource.create({ data })
    revalidatePath('/resources')
    revalidatePath('/admin/resources')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateResource(
  id: string,
  data: Partial<{
    title: string
    description: string
    type: 'PDF' | 'VIDEO' | 'NOTES' | 'BROCHURE' | 'OTHER'
    fileUrl: string
    previewUrl: string
    thumbnail: string
    subject: string
    price: number
    mrp: number
    isFree: boolean
    isActive: boolean
    featured: boolean
    order: number
    categoryId: string
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.resource.update({ where: { id }, data })
    revalidatePath('/resources')
    revalidatePath('/admin/resources')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteResource(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.resource.delete({ where: { id } })
    revalidatePath('/resources')
    revalidatePath('/admin/resources')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── TEST SERIES ─────────────────────────────────────────────────────────────
export async function getFeaturedTestSeries() {
  try {
    return await db.testSeries.findMany({
      where: { featured: true, isActive: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    })
  } catch {
    return []
  }
}
export async function adminGetAllTestSeries() {
  await requireAdmin()
  return db.testSeries.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } })
}
export async function adminCreateTestSeries(data: {
  title: string
  slug: string
  description?: string
  price?: number
  mrp?: number
  thumbnail?: string
  totalTests?: number
  duration?: string
  featured?: boolean
  categoryId?: string
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.testSeries.create({ data })
    revalidatePath('/test-series')
    revalidatePath('/admin/test-series')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminUpdateTestSeries(
  id: string,
  data: Partial<{
    title: string
    slug: string
    description: string
    price: number
    mrp: number
    thumbnail: string
    totalTests: number
    duration: string
    featured: boolean
    isActive: boolean
    categoryId: string
  }>
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.testSeries.update({ where: { id }, data })
    revalidatePath('/test-series')
    revalidatePath('/admin/test-series')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
export async function adminDeleteTestSeries(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.testSeries.delete({ where: { id } })
    revalidatePath('/test-series')
    revalidatePath('/admin/test-series')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ─── BLOG CRUD ────────────────────────────────────────────────────────────────
export async function adminGetAllBlogs() {
  await requireAdmin()
  return db.blog.findMany({
    include: { category: { select: { id: true, name: true } }, author: { select: { id: true, name: true } } },
    orderBy: [{ isPublished: 'desc' }, { createdAt: 'desc' }],
  })
}
export async function adminGetAllBlogCategories() {
  await requireAdmin()
  return db.blogCategory.findMany({ orderBy: { order: 'asc' } })
}
export async function adminCreateBlog(data: {
  title: string; slug: string; excerpt?: string; content: string
  featuredImage?: string; categoryId?: string; tags?: string[]
  metaTitle?: string; metaDescription?: string; readTime?: number
  featured?: boolean; isPublished?: boolean
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    const session = await auth()
    await db.blog.create({
      data: {
        title: data.title, slug: data.slug, excerpt: data.excerpt ?? null,
        content: data.content, featuredImage: data.featuredImage ?? null,
        categoryId: data.categoryId || null, tags: data.tags ?? [],
        metaTitle: data.metaTitle ?? null, metaDescription: data.metaDescription ?? null,
        readTime: data.readTime ?? 5, featured: data.featured ?? false,
        isPublished: data.isPublished ?? false,
        publishedAt: data.isPublished ? new Date() : null,
        authorId: session?.user?.id ?? null,
      }
    })
    revalidatePath('/blog'); revalidatePath('/admin/blogs')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminUpdateBlog(id: string, data: Partial<{
  title: string; slug: string; excerpt: string; content: string
  featuredImage: string; categoryId: string; tags: string[]
  metaTitle: string; metaDescription: string; readTime: number
  featured: boolean; isPublished: boolean; isActive: boolean
}>): Promise<ActionResult> {
  try {
    await requireAdmin()
    const updateData: Record<string, unknown> = { ...data }
    if (data.isPublished !== undefined) {
      updateData.publishedAt = data.isPublished ? new Date() : null
    }
    await db.blog.update({ where: { id }, data: updateData })
    revalidatePath('/blog'); revalidatePath('/admin/blogs')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminDeleteBlog(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.blog.delete({ where: { id } })
    revalidatePath('/blog'); revalidatePath('/admin/blogs')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}

// ─── DEMO VIDEOS CRUD ────────────────────────────────────────────────────────
export async function adminGetAllDemoVideos() {
  await requireAdmin()
  return db.demoVideo.findMany({
    include: {
      faculty: { select: { id: true, name: true } },
      course: { select: { id: true, title: true } },
    },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }],
  })
}
export async function adminCreateDemoVideo(data: {
  title: string; youtubeUrl: string; youtubeVideoId: string; thumbnailUrl?: string
  subject?: string; duration?: string; description?: string
  facultyId?: string; courseId?: string; featured?: boolean; order?: number
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.demoVideo.create({
      data: {
        title: data.title, youtubeUrl: data.youtubeUrl,
        youtubeVideoId: data.youtubeVideoId,
        thumbnailUrl: data.thumbnailUrl ?? `https://img.youtube.com/vi/${data.youtubeVideoId}/maxresdefault.jpg`,
        subject: data.subject ?? null, duration: data.duration ?? null,
        description: data.description ?? null,
        facultyId: data.facultyId || null, courseId: data.courseId || null,
        featured: data.featured ?? false, order: data.order ?? 0,
      }
    })
    revalidatePath('/demo-classes'); revalidatePath('/admin/demo-videos')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminUpdateDemoVideo(id: string, data: Partial<{
  title: string; youtubeUrl: string; youtubeVideoId: string; thumbnailUrl: string
  subject: string; duration: string; description: string
  facultyId: string; courseId: string; featured: boolean; isActive: boolean; order: number
}>): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.demoVideo.update({ where: { id }, data })
    revalidatePath('/demo-classes'); revalidatePath('/admin/demo-videos')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminDeleteDemoVideo(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.demoVideo.delete({ where: { id } })
    revalidatePath('/demo-classes'); revalidatePath('/admin/demo-videos')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}

// ─── FACULTY APPLICATIONS ─────────────────────────────────────────────────────
export async function adminGetAllApplications() {
  await requireAdmin()
  return db.facultyApplication.findMany({ orderBy: { createdAt: 'desc' } })
}
export async function adminUpdateApplicationStatus(
  id: string, status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'
): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.facultyApplication.update({ where: { id }, data: { status } })
    revalidatePath('/admin/applications')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminDeleteApplication(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.facultyApplication.delete({ where: { id } })
    revalidatePath('/admin/applications')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}

// ─── GALLERY CRUD ─────────────────────────────────────────────────────────────
export async function adminGetAllGalleryImages() {
  await requireAdmin()
  return db.galleryImage.findMany({ orderBy: { order: 'asc' } })
}
export async function adminCreateGalleryImage(data: {
  url: string; caption?: string; category?: string; order?: number
}): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.galleryImage.create({
      data: { url: data.url, caption: data.caption ?? null, category: data.category ?? null, order: data.order ?? 0 }
    })
    revalidatePath('/gallery'); revalidatePath('/admin/gallery')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminUpdateGalleryImage(id: string, data: Partial<{
  url: string; caption: string; category: string; order: number; isActive: boolean
}>): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.galleryImage.update({ where: { id }, data })
    revalidatePath('/gallery'); revalidatePath('/admin/gallery')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}
export async function adminDeleteGalleryImage(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.galleryImage.delete({ where: { id } })
    revalidatePath('/gallery'); revalidatePath('/admin/gallery')
    return { success: true }
  } catch (e: unknown) { return { error: e instanceof Error ? e.message : String(e) } }
}

// ─── EXTENDED STATS ───────────────────────────────────────────────────────────
export async function getExtendedAdminStats() {
  await requireAdmin()
  const [
    totalFaculty, totalBlogs, totalDemoVideos, totalNotes,
    pendingApplications
  ] = await Promise.all([
    db.faculty.count({ where: { isActive: true } }),
    db.blog.count({ where: { isActive: true } }),
    db.demoVideo.count({ where: { isActive: true } }),
    db.resource.count({ where: { isActive: true } }),
    db.facultyApplication.count({ where: { status: 'PENDING' } }),
  ])
  return { totalFaculty, totalBlogs, totalDemoVideos, totalNotes, pendingApplications }
}

