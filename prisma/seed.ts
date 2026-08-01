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
  const vijay = await prisma.faculty.create({
    data: {
      name: 'Vijay Sir',
      slug: 'vijay-sharma',
      designation: 'Senior Lead Faculty & Academic Director',
      subjects: ['Accountancy', 'Business Law', 'Economics', 'Class 11 Commerce', 'Class 12 Commerce'],
      experience: 10,
      featured: true,
      bio: 'Vijay Sir is a highly experienced Chartered Accountant who has been leading professional CA, CS, and CMA coaching programs for over a decade. His simplified approach to accounting concepts, double-entry ledger methods, and legal frameworks has helped thousands of students secure top board scores and national ranks.',
      qualification: 'FCA (Fellow Chartered Accountant) | B.Com (Hons), SRCC',
      category: 'COMMERCE',
      order: 1,
      photo: '/faculty/vijay sharma.webp'
    },
  })
  console.log('✅ Created default faculty member Vijay Sir')

  // 5. Create Courses
  const caFoundation = await prisma.course.create({
    data: {
      title: 'CA Foundation Prep Batch',
      slug: 'ca-foundation',
      description: 'All-in-one preparation package covering Accounts, Business Law, Quantitative Aptitude, and Business Economics.',
      price: 5499,
      mrp: 9499,
      categoryId: commerceCategory.id,
      facultyId: vijay.id,
      duration: '6 Months',
      level: 'CA Foundation',
      featured: true,
    },
  })
  console.log('✅ Created sample course linked to Vijay Sharma')

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

  // 12. Create Results
  await prisma.result.createMany({
    data: [
      {
        id: "anshul-cseet",
        studentName: "Anshul",
        photo: "/result/Anshul CSEET.webp",
        exam: "CSEET",
        rank: "Distinction",
        score: "172/200",
        year: 2025,
        course: "CS Executive Entrance Test (CSEET)",
        quote: "Academica's law modules are outstanding and helped me build absolute conceptual clarity in legal aptitude.",
        achievement: "Passed CSEET",
        featured: true,
        order: 1,
      },
      {
        id: "deepanshi-cseet",
        studentName: "Deepanshi",
        photo: "/result/Deepanshi CSEET.webp",
        exam: "CSEET",
        rank: "Distinction",
        score: "168/200",
        year: 2025,
        course: "CS Executive Entrance Test (CSEET)",
        quote: "I got complete clarity on logical reasoning and business communication, thanks to regular mock series.",
        achievement: "Passed CSEET",
        featured: true,
        order: 2,
      },
      {
        id: "mahi-cma-found",
        studentName: "Mahi",
        photo: "/result/Mahi CMA FOUNDATION.webp",
        exam: "CMA Foundation",
        rank: "AIR 23",
        score: "348/400",
        year: 2025,
        course: "CMA Foundation Prep",
        quote: "Regular mock tests and feedback sessions from Vijay Sir helped me manage my exam time effectively.",
        achievement: "CMA Foundation Ranker",
        featured: true,
        order: 3,
      },
      {
        id: "rohit-ca-found",
        studentName: "Rohit Sharma",
        photo: "/result/Rohit Sharma CA FOUNDATION.webp",
        exam: "CA Foundation",
        rank: "AIR 15",
        score: "352/400",
        year: 2025,
        course: "CA Foundation Program",
        quote: "Thanks to Academica's structured coaching for accounts and law, I secured AIR 15 in my first attempt.",
        achievement: "CA Foundation Topper",
        featured: true,
        order: 4,
      },
      {
        id: "shivani-cseet",
        studentName: "Shivani",
        photo: "/result/Shivani CSEET.webp",
        exam: "CSEET",
        rank: "Cleared",
        score: "155/200",
        year: 2025,
        course: "CS Executive Entrance Test (CSEET)",
        quote: "Very good concept lectures, detailed study guides, and daily practice papers helped me pass.",
        achievement: "Passed CSEET",
        featured: true,
        order: 5,
      },
      {
        id: "shreya-ca-found",
        studentName: "Shreya",
        photo: "/result/Shreya CA FOUNDATION.webp",
        exam: "CA Foundation",
        rank: "Cleared",
        score: "312/400",
        year: 2025,
        course: "CA Foundation Program",
        quote: "Conceptual learning was key to clearing CA Foundation, and the faculty here simplifies everything.",
        achievement: "Cleared CA Foundation",
        featured: true,
        order: 6,
      },
      {
        id: "tanishaka-cseet",
        studentName: "Tanishaka",
        photo: "/result/Tanishaka CSEET.webp",
        exam: "CSEET",
        rank: "Distinction",
        score: "174/200",
        year: 2025,
        course: "CS Executive Entrance Test (CSEET)",
        quote: "Academica is the best institute for law. Flowcharts and memory keys made law sections easy to remember.",
        achievement: "Passed CSEET",
        featured: true,
        order: 7,
      },
      {
        id: "vidhi-cma-found",
        studentName: "Vidhi",
        photo: "/result/Vidhi CMA FOUNDATION.webp",
        exam: "CMA Foundation",
        rank: "AIR 18",
        score: "344/400",
        year: 2025,
        course: "CMA Foundation Prep",
        quote: "The mock exam portal replicates the actual computer-based test perfectly, boosting my confidence.",
        achievement: "CMA Foundation Ranker",
        featured: true,
        order: 8,
      },
      {
        id: "priya-cseet",
        studentName: "Priya",
        photo: "/result/Priya CSEET.webp",
        exam: "CSEET",
        rank: "Cleared",
        score: "158/200",
        year: 2025,
        course: "CS Executive Entrance Test (CSEET)",
        quote: "The teachers are extremely supportive and clarify every single doubt, no matter how small.",
        achievement: "Passed CSEET",
        featured: true,
        order: 9,
      },
      {
        id: "ritesh-cma-found",
        studentName: "Ritesh",
        photo: "/result/Ritesh CMA FOUNDATION.webp",
        exam: "CMA Foundation",
        rank: "AIR 9",
        score: "360/400",
        year: 2025,
        course: "CMA Foundation Prep",
        quote: "I highly recommend Academica for Costing and Law. The doubt resolution is fast and very helpful.",
        achievement: "CMA Foundation Top 10",
        featured: true,
        order: 10,
      },
      {
        id: "sudhiksha-cma-inter",
        studentName: "Sudhiksha",
        photo: "/result/Sudhiksha CMA INTERN.webp",
        exam: "CMA Intermediate",
        rank: "AIR 12",
        score: "576/800",
        year: 2025,
        course: "CMA Intermediate Prep",
        quote: "The best environment for professional commerce studies in Delhi. The support system is exceptional.",
        achievement: "CMA Intermediate Topper",
        featured: true,
        order: 11,
      },
      {
        id: "vidhi-sharma-cma-found",
        studentName: "Vidhi Sharma",
        photo: "/result/Vidhi Sharma CMA FOUNDATION.webp",
        exam: "CMA Foundation",
        rank: "Cleared",
        score: "310/400",
        year: 2025,
        course: "CMA Foundation Prep",
        quote: "Daily revision sheets and mock tests prepared me to handle all cost accountancy models.",
        achievement: "Cleared CMA Foundation",
        featured: true,
        order: 12,
      },
    ]
  })
  console.log('✅ Created 12 default student results')

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
