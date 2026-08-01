export interface FallbackBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  readTime: number;
  publishedAt: Date;
  category: { name: string; slug: string };
  author: { name: string };
  tags: string[];
  featured: boolean;
  content: string;
}

export const FALLBACK_BLOGS: FallbackBlog[] = [
  {
    id: "fb1",
    title: "How to Prepare for CA Foundation Effectively",
    slug: "how-to-prepare-for-ca-foundation-effectively",
    excerpt: "A complete step-by-step guide for commerce and science aspirants to clear the CA Foundation exam on their first attempt with concept clarity and structured mock practice.",
    featuredImage: "/bg/ca foundation.png",
    readTime: 6,
    publishedAt: new Date("2026-07-25T10:00:00Z"),
    category: { name: "Exam Prep", slug: "exam-prep" },
    author: { name: "CA Rajesh Kumar" },
    tags: ["CA Foundation", "ICAI", "Study Guide", "Accounting"],
    featured: true,
    content: `# How to Prepare for CA Foundation Effectively

The Chartered Accountancy (CA) Foundation course is the gateway to one of the most prestigious professions in India. Clearing it on the first attempt requires a balanced blend of hard work, conceptual understanding, and strategic preparation.

## 1. Understand the Exam Pattern & Syllabus
The CA Foundation exam consists of four papers:
- **Paper 1:** Accounting (100 Marks)
- **Paper 2:** Business Laws (100 Marks)
- **Paper 3:** Quantitative Aptitude (100 Marks)
- **Paper 4:** Business Economics (100 Marks)

Papers 1 and 2 are subjective, while Papers 3 and 4 are objective-type (with negative marking).

## 2. Devise a Structured Study Plan
A disciplined study timetable is crucial. Allocate at least 6–8 hours daily, dividing time equally between subjective law concepts and objective aptitude practice.

## 3. Practice Mock Test Series regularly
Mock tests are the secret weapon of CA toppers. Attempt at least 5-10 mock papers under real exam constraints to master time management and writing presentation.

At Academica Institute, we offer structured CA preparation batches with extensive revision notes and regular mock tests to ensure our students excel. Good luck!`,
  },
  {
    id: "fb2",
    title: "CS vs CMA vs CA – Which Course is Right for You?",
    slug: "cs-vs-cma-vs-ca-which-course-is-right-for-you",
    excerpt: "Confused between CA, CS, and CMA? We break down the differences in syllabus, career scope, passing percentages, and job profiles to help you make the right choice.",
    featuredImage: "/bg/cma foundation.png",
    readTime: 8,
    publishedAt: new Date("2026-07-20T10:00:00Z"),
    category: { name: "Career Guide", slug: "career-guide" },
    author: { name: "CA Amit Verma" },
    tags: ["CA", "CS", "CMA", "Career Advice", "Commerce"],
    featured: false,
    content: `# CS vs CMA vs CA – Which Course is Right for You?

Choosing a professional path after Class 12 in Commerce can be daunting. The three premier certifications in India—Chartered Accountancy (CA), Company Secretary (CS), and Cost and Management Accountancy (CMA)—each offer distinct specializations.

## 1. Chartered Accountancy (CA)
- **Primary Focus:** Auditing, taxation, financial accounting, and advisory services.
- **Governing Body:** ICAI
- **Ideal For:** Students who enjoy number-crunching, auditing, and corporate finance.

## 2. Company Secretary (CS)
- **Primary Focus:** Corporate governance, legal compliance, and company law.
- **Governing Body:** ICSI
- **Ideal For:** Students with strong communication skills and an interest in corporate law and compliance.

## 3. Cost and Management Accountancy (CMA)
- **Primary Focus:** Cost management, costing methodologies, budgeting, and pricing strategies.
- **Governing Body:** ICMAI
- **Ideal For:** Students interested in industrial cost audits, manufacturing management, and operational efficiency.

Evaluate your interest areas—be it auditing, corporate law, or cost management—and pick the stream that matches your career aspirations.`,
  },
  {
    id: "fb3",
    title: "Top Study Strategies to Score Higher in Commerce Exams",
    slug: "top-study-strategies-to-score-higher-in-commerce-exams",
    excerpt: "Unlock the top revision strategies, time management methods, and answer writing formats used by CBSE and CMA toppers to score above 95% in boards.",
    featuredImage: "/bg/cs foundation.png",
    readTime: 5,
    publishedAt: new Date("2026-07-15T10:00:00Z"),
    category: { name: "Study Tips", slug: "study-tips" },
    author: { name: "Prof. Priya Sharma" },
    tags: ["Commerce", "Board Exams", "Study Strategies", "Revision"],
    featured: false,
    content: `# Top Study Strategies to Score Higher in Commerce Exams

Scoring high marks in commerce board and professional examinations is not just about memorization. It requires a strategic and structured approach to concepts, formulas, and presentations.

## 1. Master Conceptual Clarity
Whether it is double-entry bookkeeping in Accountancy or elasticity curves in Economics, understanding the underlying principles is essential. Memorization alone will fail during application-based questions.

## 2. Refine Your Answer Writing Presentation
In exams like Business Studies and Accountancy, presentation is half the battle:
- Use bullet points instead of long paragraphs.
- Highlight key definitions and formulas.
- Draw clear format tables for journal entries and ledgers.

## 3. Focus on Time Management
Divide your exam paper duration based on mark weights. Never spend more than 1.5 minutes per mark. Practice with previous year question papers regularly to build writing speed.

Stay consistent, study systematically, and practice regularly!`,
  },
];
