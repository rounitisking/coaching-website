import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as bcrypt from 'bcryptjs'

// Load Prisma config & client using connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed script...')

  // Clean existing tables (in order of relations)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.resourcePurchase.deleteMany()
  await prisma.testPurchase.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.courseModule.deleteMany()
  await prisma.course.deleteMany()
  await prisma.faculty.deleteMany()
  await prisma.result.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.resource.deleteMany()
  await prisma.testSeries.deleteMany()
  await prisma.heroBanner.deleteMany()
  await prisma.notice.deleteMany()
  await prisma.fAQ.deleteMany()
  await prisma.popup.deleteMany()
  await prisma.siteSetting.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Admin Account
  const hashedAdminPassword = await bcrypt.hash('Admin@1234', 12)
  const admin = await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@academica.in',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin account:', admin.email)

  // 2. Create Sample Student Account
  const hashedStudentPassword = await bcrypt.hash('Student@1234', 12)
  const student = await prisma.user.create({
    data: {
      name: 'Sample Learner',
      email: 'student@academica.in',
      password: hashedStudentPassword,
      role: 'USER',
    },
  })
  console.log('✅ Created sample student account:', student.email)

  // 3. Create Categories
  const commerceCategory = await prisma.category.create({
    data: {
      name: 'Commerce Coaching',
      slug: 'commerce-coaching',
      type: 'COMMERCE',
      description: 'CA Foundation, CA Intermediate, CS, CMA, and CUET preparations.',
      order: 1,
    },
  })
  const schoolCategory = await prisma.category.create({
    data: {
      name: 'School Classes (9-12)',
      slug: 'school-coaching',
      type: 'SCHOOL',
      description: 'Accountancy, Economics, Business Studies, and Mathematics classes.',
      order: 2,
    },
  })
  console.log('✅ Created default categories')

  // 4. Create Faculty
  const rajesh = await prisma.faculty.create({
    data: {
      name: 'CA Rajesh Kumar',
      slug: 'ca-rajesh-kumar',
      designation: 'CA Foundation Faculty Partner',
      subjects: ['Accountancy', 'Law'],
      experience: 15,
      featured: true,
      bio: 'Chartered Accountant with over 15 years of corporate advisory and coaching experience.',
    },
  })
  console.log('✅ Created default faculty')

  // 5. Create Courses
  const caFoundation = await prisma.course.create({
    data: {
      title: 'CA Foundation Prep Batch',
      slug: 'ca-foundation',
      description: 'All-in-one preparation package covering Accounts, Business Law, Quantitative Aptitude, and Business Economics.',
      price: 12000,
      mrp: 18000,
      categoryId: commerceCategory.id,
      facultyId: rajesh.id,
      duration: '6 Months',
      level: 'CA Foundation',
      featured: true,
    },
  })
  console.log('✅ Created sample course')

  // 6. Create Course Modules & Lessons
  const module1 = await prisma.courseModule.create({
    data: {
      title: 'Module 1: Principles of Accountancy',
      courseId: caFoundation.id,
      order: 1,
    },
  })
  await prisma.lesson.create({
    data: {
      title: 'Lesson 1.1: Introduction to Accounting Principles',
      moduleId: module1.id,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video URL
      duration: 35,
      order: 1,
      isFree: true,
    },
  })
  await prisma.lesson.create({
    data: {
      title: 'Lesson 1.2: General Ledger & Trial Balance',
      moduleId: module1.id,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 45,
      order: 2,
    },
  })
  console.log('✅ Created course curriculum (modules + lessons)')

  // 7. Create Site Settings
  await prisma.siteSetting.createMany({
    data: [
      { key: 'contact_phone', value: '+91 98765 43210', label: 'Support Phone', group: 'Contact Info' },
      { key: 'contact_email', value: 'info@academicainstitute.in', label: 'Support Email', group: 'Contact Info' },
      { key: 'contact_address', value: 'New Delhi, India', label: 'Office Address', group: 'Contact Info' },
      { key: 'whatsapp_url', value: 'https://wa.me/919876543210', label: 'WhatsApp direct link', group: 'Integrations' },
    ],
  })
  console.log('✅ Created default site settings')

  // 8. Create test series
  await prisma.testSeries.create({
    data: {
      title: 'CA Foundation Mock Test Series',
      slug: 'ca-foundation-mock-series',
      description: 'Comprehensive test series for CA Foundation preparation.',
      price: 1999,
      mrp: 3999,
      totalTests: 15,
      duration: '3 hours per test',
      featured: true,
      categoryId: commerceCategory.id,
    },
  })
  console.log('✅ Created sample test series')

  // 9. Create FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: 'What courses does Academica Institute offer?', answer: 'We offer CA Foundation, CA Intermediate, CS, CMA, CUET preparation, and School Commerce batches.', order: 1, isActive: true },
      { question: 'Do you provide study materials?', answer: 'Yes, we provide exhaustive syllabus-aligned notes and reference booklets.', order: 2, isActive: true },
    ],
  })
  console.log('✅ Created sample FAQs')

  console.log('🌱 Seed script successfully finished!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
