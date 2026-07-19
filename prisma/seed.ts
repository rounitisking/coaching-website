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
  await prisma.category.deleteMany()
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
  await prisma.blog.deleteMany()
  await prisma.blogCategory.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Admin Accounts (both com and in to prevent login issues)
  const hashedAdminPasswordCom = await bcrypt.hash('Admin@123', 12)
  const adminCom = await prisma.user.create({
    data: {
      name: 'Admin Counselor',
      email: 'admin@academica.com',
      password: hashedAdminPasswordCom,
      role: 'ADMIN',
      phone: '+91 83750 60247',
      isActive: true,
    },
  })
  console.log('✅ Created admin account:', adminCom.email)

  const hashedAdminPasswordIn = await bcrypt.hash('Admin@1234', 12)
  const adminIn = await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@academica.in',
      password: hashedAdminPasswordIn,
      role: 'ADMIN',
      phone: '+91 83750 60247',
      isActive: true,
    },
  })
  console.log('✅ Created admin account:', adminIn.email)

  // 2. Create Sample Student Accounts
  const hashedStudentPasswordCom = await bcrypt.hash('Student@123', 12)
  const studentCom = await prisma.user.create({
    data: {
      name: 'Sneha Patel',
      email: 'student@academica.com',
      password: hashedStudentPasswordCom,
      role: 'USER',
      phone: '+91 98765 43210',
      isActive: true,
    },
  })
  console.log('✅ Created sample student account:', studentCom.email)

  const hashedStudentPasswordIn = await bcrypt.hash('Student@1234', 12)
  const studentIn = await prisma.user.create({
    data: {
      name: 'Sample Learner',
      email: 'student@academica.in',
      password: hashedStudentPasswordIn,
      role: 'USER',
      phone: '+91 98765 43210',
      isActive: true,
    },
  })
  console.log('✅ Created sample student account:', studentIn.email)

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
  const scienceCategory = await prisma.category.create({
    data: {
      name: 'Science Coaching',
      slug: 'science-coaching',
      type: 'SCIENCE',
      description: 'IIT-JEE, NEET, and Class 11-12 Board preparations.',
      order: 2,
    },
  })
  const schoolCategory = await prisma.category.create({
    data: {
      name: 'School Classes (9-12)',
      slug: 'school-coaching',
      type: 'SCHOOL',
      description: 'Accountancy, Economics, Business Studies, and Mathematics classes.',
      order: 3,
    },
  })
  console.log('✅ Created default categories')

  // 4. Create Faculty (matching static faculty data catalog exactly)
  const rajesh = await prisma.faculty.create({
    data: {
      name: 'CA Rajesh Kumar',
      slug: 'rajesh-kumar',
      designation: 'Head of Accountancy & CA Program',
      subjects: ['Accountancy', 'CA Foundation', 'Class 11 Commerce', 'Class 12 Commerce'],
      experience: 18,
      featured: true,
      bio: 'CA Rajesh Kumar is a senior Chartered Accountant and one of the most renowned Accountancy teachers in Delhi. With a Ph.D. from the prestigious Delhi School of Economics, he has mentored over 5,000 students preparing for CA Foundation and Board exams.',
      qualification: 'FCA (Fellow Chartered Accountant) | Ph.D. in Commerce, Delhi School of Economics',
      category: 'COMMERCE',
      order: 1,
    },
  })

  const priya = await prisma.faculty.create({
    data: {
      name: 'CS Priya Sharma',
      slug: 'priya-sharma',
      designation: 'Head of Business Law & CS Program',
      subjects: ['Business Studies', 'CS Preparation', 'Commercial Law'],
      experience: 15,
      featured: true,
      bio: 'CS Priya Sharma is a practicing Company Secretary and senior educator specializing in corporate law and business studies. Her interactive teaching methods, visual law chart mappings, and simplified legal explanations have helped hundreds of students pass.',
      qualification: 'FCS (Fellow Company Secretary) | LL.M., Delhi University',
      category: 'COMMERCE',
      order: 2,
    },
  })

  const amit = await prisma.faculty.create({
    data: {
      name: 'CMA Amit Verma',
      slug: 'amit-verma',
      designation: 'Head of Economics & CMA Program',
      subjects: ['Economics', 'CMA Preparation', 'Class 11 Commerce', 'Class 12 Commerce'],
      experience: 14,
      featured: true,
      bio: 'CMA Amit Verma is an eminent economist and Cost Accountant who brings rich analytical insights to the classroom. With an M.Phil from JNU, he specializes in Macroeconomics, Microeconomics, and Costing for professional exams.',
      qualification: 'FCMA (Fellow Cost & Management Accountant) | M.Phil in Economics, JNU',
      category: 'COMMERCE',
      order: 3,
    },
  })

  const sneha = await prisma.faculty.create({
    data: {
      name: 'Dr. Sneha Gupta',
      slug: 'sneha-gupta',
      designation: 'Senior Faculty — Accountancy & CUET',
      subjects: ['Accountancy', 'CUET', 'Class 11 Commerce', 'Class 12 Commerce'],
      experience: 12,
      featured: true,
      bio: 'Dr. Sneha Gupta specializes in Financial Management and advanced accountancy. She is highly passionate about building solid mathematical and accountancy concepts.',
      qualification: 'Ph.D. in Corporate Finance, Delhi University | M.Com',
      category: 'COMMERCE',
      order: 4,
    },
  })

  const vikram = await prisma.faculty.create({
    data: {
      name: 'Mr. Vikram Singh',
      slug: 'vikram-singh',
      designation: 'Senior Educator — Class 9 & 10 Tuition',
      subjects: ['Mathematics', 'Science', 'Class 9 Tuition', 'Class 10 Tuition'],
      experience: 10,
      featured: false,
      bio: 'Mr. Vikram Singh has been teaching Class 9 and 10 students for over a decade. He specializes in building a robust base in Science and Mathematics.',
      qualification: 'M.Sc. in Physics, Delhi University | B.Ed.',
      category: 'SCHOOL',
      order: 5,
    },
  })

  const anita = await prisma.faculty.create({
    data: {
      name: 'Mrs. Anita Mehta',
      slug: 'anita-mehta',
      designation: 'Senior Educator — Class 9 & 10 Social Science & English',
      subjects: ['Social Studies', 'English', 'Class 9 Tuition', 'Class 10 Tuition'],
      experience: 16,
      featured: false,
      bio: 'Mrs. Anita Mehta has a legendary reputation for making humanities and English exciting for junior and secondary level students.',
      qualification: 'M.A. in History, Delhi University | B.Ed.',
      category: 'SCHOOL',
      order: 6,
    },
  })
  console.log('✅ Created 6 default faculty members')

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
      { key: 'contact_phone', value: '+91 83750 60247', label: 'Support Phone', group: 'Contact Info' },
      { key: 'contact_email', value: 'info@academicainstitute.in', label: 'Support Email', group: 'Contact Info' },
      { key: 'contact_address', value: 'Building No. 45, Kalu Sarai, Near Hauz Khas Metro Station, New Delhi — 110016', label: 'Office Address', group: 'Contact Info' },
      { key: 'whatsapp_url', value: 'https://wa.me/918375060247', label: 'WhatsApp direct link', group: 'Integrations' },
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

  // 10. Create Blog Categories & 5 Realistic Blogs
  const examPrepCat = await prisma.blogCategory.create({
    data: { name: 'Exam Preparation', slug: 'exam-prep', description: 'Strategies and tips for CA, CS, and CMA exams.' }
  })
  const studyTipsCat = await prisma.blogCategory.create({
    data: { name: 'Study Techniques', slug: 'study-techniques', description: 'Techniques for better focus and retention.' }
  })
  const careerGuideCat = await prisma.blogCategory.create({
    data: { name: 'Career Guidance', slug: 'career-guidance', description: 'Career pathways for commerce graduates.' }
  })

  await prisma.blog.create({
    data: {
      title: 'How to Clear CA Foundation in First Attempt',
      slug: 'clear-ca-foundation-first-attempt',
      excerpt: 'Struggling with CA Foundation prep? Follow these 5 proven steps to secure a pass in your very first attempt.',
      content: '<p>Clearing the CA Foundation exam on your first attempt is highly achievable with the right strategy. Learn how to structure your study plan, solve mock papers, and master accounting and mercantile law standard concepts.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop',
      readTime: 5,
      isPublished: true,
      featured: true,
      publishedAt: new Date(),
      categoryId: examPrepCat.id,
      authorId: adminCom.id,
    }
  })

  await prisma.blog.create({
    data: {
      title: 'Top 5 Study Techniques for CA Intermediate Candidates',
      slug: 'study-techniques-ca-intermediate',
      excerpt: 'CA Intermediate syllabus is vast. Discover the top study techniques used by rank holders to study smart.',
      content: '<p>CA Intermediate requires a shift in how you study. In this article, we outline effective techniques such as active recall, spaced repetition, summarizing notes in tables, and tackling past board questions.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop',
      readTime: 7,
      isPublished: true,
      featured: true,
      publishedAt: new Date(),
      categoryId: studyTipsCat.id,
      authorId: adminCom.id,
    }
  })

  await prisma.blog.create({
    data: {
      title: 'Career Opportunities After Qualifying Company Secretary (CS)',
      slug: 'career-opportunities-after-cs',
      excerpt: 'Wondering about career pathways after CS? Explore jobs in corporate governance, compliance management, and legal advisory.',
      content: '<p>CS designation opens doors to high-level compliance and leadership roles in public and private corporations. Read on to explore salaries, job roles, and growth prospects in the industry.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      readTime: 6,
      isPublished: true,
      featured: false,
      publishedAt: new Date(),
      categoryId: careerGuideCat.id,
      authorId: adminCom.id,
    }
  })

  await prisma.blog.create({
    data: {
      title: 'How to Manage Time Between Class 12 Boards and CUET',
      slug: 'time-management-boards-cuet',
      excerpt: 'Balancing school boards and competitive college entrance exams can be stressful. Master the balancing act with these tips.',
      content: '<p>With CUET score being the ticket to top universities, Class 12 commerce students need a dual strategy. We map out a weekly schedule to cover CBSE Board syllabus while preparing MCQs for CUET.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop',
      readTime: 8,
      isPublished: true,
      featured: false,
      publishedAt: new Date(),
      categoryId: examPrepCat.id,
      authorId: adminCom.id,
    }
  })

  await prisma.blog.create({
    data: {
      title: 'The Importance of Cost Accounting in CMA Curriculum',
      slug: 'importance-cost-accounting-cma',
      excerpt: 'Cost Accounting is the core of the CMA. Find out why it is critical for business strategy and how to ace this paper.',
      content: '<p>Certified Management Accountants are experts in cost optimization. We review key topics like standard costing, budget controls, and cost audit procedures that are tested in the CMA Intermediate levels.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&auto=format&fit=crop',
      readTime: 6,
      isPublished: true,
      featured: false,
      publishedAt: new Date(),
      categoryId: examPrepCat.id,
      authorId: adminCom.id,
    }
  })
  console.log('✅ Created 5 sample blogs')

  // 11. Create Resources (Notes) — First 3 free, remaining paid
  await prisma.resource.createMany({
    data: [
      {
        id: "r1",
        title: "CA Foundation Law Principles — Complete Study Notes",
        description: "Comprehensive chapter-wise Mercantile Law notes for CA Foundation. Covers Contract Act, Sale of Goods Act, and Companies Act with sample drafts.",
        type: "NOTES",
        subject: "Business Law",
        course: "CA Foundation",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        price: 0,
        mrp: 0,
        isFree: true,
        order: 1,
        categoryId: commerceCategory.id,
      },
      {
        id: "r2",
        title: "Class 12 Accountancy DPP — Partnership Accounts",
        description: "Daily Practice Problems for Partnership and Company Accounts. 300+ numerical questions with detailed ledger solutions.",
        type: "PDF",
        subject: "Accountancy",
        course: "Class 12 Commerce",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        price: 0,
        mrp: 0,
        isFree: true,
        order: 2,
        categoryId: schoolCategory.id,
      },
      {
        id: "r3",
        title: "Class 12 Economics Previous Year Papers (2015-2024)",
        description: "Complete collection of CBSE Class 12 board question papers in Economics with solved model answers and graphs.",
        type: "PDF",
        subject: "Economics",
        course: "Class 12 Commerce",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        price: 0,
        mrp: 0,
        isFree: true,
        order: 3,
        categoryId: schoolCategory.id,
      },
      {
        id: "r4",
        title: "CS Legal Environment Assignment — Chapter 1-5",
        description: "Legal theory and corporate compliance assignments for CS Foundation candidates.",
        type: "OTHER",
        subject: "CS Law",
        course: "CS Prep",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        price: 499,
        mrp: 999,
        isFree: false,
        order: 4,
        categoryId: commerceCategory.id,
      },
      {
        id: "r5",
        title: "CUET Commerce Mock Test Series — 2024 CBT Pattern",
        description: "10 full-length domain mock tests (Accountancy, Economics, BSt) modeled exactly on the NTA CUET CBT pattern.",
        type: "PDF",
        subject: "Commerce Domain",
        course: "CUET Prep",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        price: 799,
        mrp: 1499,
        isFree: false,
        order: 5,
        categoryId: commerceCategory.id,
      },
      {
        id: "r6",
        title: "Class 10 Mathematics Board PYQ Papers (2018-2024)",
        description: "Complete set of CBSE Class 10 Math board exam questions with step-by-step marking scheme answers.",
        type: "PDF",
        subject: "Mathematics",
        course: "Class 10 Tuition",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        previewUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        price: 399,
        mrp: 799,
        isFree: false,
        order: 6,
        categoryId: schoolCategory.id,
      },
    ],
  })
  console.log('✅ Created 6 resources/notes')

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
