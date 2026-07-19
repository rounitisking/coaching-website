-- ============================================================
-- Academica Institute — Schema Migration (Phase 1 Additions)
-- Run this in Supabase SQL Editor AFTER existing schema.sql
-- Safe to run on existing database — uses IF NOT EXISTS
-- ============================================================

-- ─── New Enums ───────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "FacultyCategory" AS ENUM ('COMMERCE', 'SCIENCE', 'SCHOOL');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── Extend Faculty Table ─────────────────────────────────────────────────────

ALTER TABLE "faculty"
  ADD COLUMN IF NOT EXISTS "qualification" TEXT,
  ADD COLUMN IF NOT EXISTS "achievements" TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "specialization" TEXT,
  ADD COLUMN IF NOT EXISTS "languages" TEXT[] DEFAULT ARRAY['Hindi','English'],
  ADD COLUMN IF NOT EXISTS "socialLinkedIn" TEXT,
  ADD COLUMN IF NOT EXISTS "socialYoutube" TEXT,
  ADD COLUMN IF NOT EXISTS "resumeUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "category" "FacultyCategory" NOT NULL DEFAULT 'COMMERCE';

CREATE INDEX IF NOT EXISTS "faculty_category_idx" ON "faculty"("category");

-- ─── Extend Result Table ─────────────────────────────────────────────────────

ALTER TABLE "results"
  ADD COLUMN IF NOT EXISTS "course" TEXT,
  ADD COLUMN IF NOT EXISTS "batch" TEXT,
  ADD COLUMN IF NOT EXISTS "achievement" TEXT,
  ADD COLUMN IF NOT EXISTS "quote" TEXT,
  ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS "results_featured_idx" ON "results"("featured");

-- ─── Extend Course Table ─────────────────────────────────────────────────────

ALTER TABLE "courses"
  ADD COLUMN IF NOT EXISTS "overview" TEXT,
  ADD COLUMN IF NOT EXISTS "eligibility" TEXT,
  ADD COLUMN IF NOT EXISTS "mentorship" TEXT,
  ADD COLUMN IF NOT EXISTS "admissionCta" TEXT;

-- ─── Extend Resource Table ───────────────────────────────────────────────────

ALTER TABLE "resources"
  ADD COLUMN IF NOT EXISTS "previewUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "course" TEXT;

-- ─── Course Faculty Join Table (Many-to-Many) ─────────────────────────────────

CREATE TABLE IF NOT EXISTS "course_faculty" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "courseId" TEXT NOT NULL,
  "facultyId" TEXT NOT NULL,
  CONSTRAINT "course_faculty_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "course_faculty_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE,
  CONSTRAINT "course_faculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE CASCADE,
  CONSTRAINT "course_faculty_courseId_facultyId_key" UNIQUE ("courseId", "facultyId")
);

-- Backfill existing faculty assignments
INSERT INTO "course_faculty" ("courseId", "facultyId")
SELECT c."id", c."facultyId"
FROM "courses" c
WHERE c."facultyId" IS NOT NULL
ON CONFLICT DO NOTHING;

-- ─── Blog Categories ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "blog_categories" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "blog_categories_slug_key" UNIQUE ("slug")
);

-- ─── Blogs ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "blogs" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" TEXT NOT NULL DEFAULT '',
  "featuredImage" TEXT,
  "tags" TEXT[] DEFAULT '{}',
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "readTime" INTEGER NOT NULL DEFAULT 5,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "featured" BOOLEAN NOT NULL DEFAULT FALSE,
  "isPublished" BOOLEAN NOT NULL DEFAULT FALSE,
  "publishedAt" TIMESTAMP(3),
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0,
  "categoryId" TEXT,
  "authorId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "blogs_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "blogs_slug_key" UNIQUE ("slug"),
  CONSTRAINT "blogs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "blog_categories"("id"),
  CONSTRAINT "blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id")
);

CREATE INDEX IF NOT EXISTS "blogs_slug_idx" ON "blogs"("slug");
CREATE INDEX IF NOT EXISTS "blogs_isPublished_idx" ON "blogs"("isPublished");
CREATE INDEX IF NOT EXISTS "blogs_featured_idx" ON "blogs"("featured");
CREATE INDEX IF NOT EXISTS "blogs_categoryId_idx" ON "blogs"("categoryId");

-- ─── Demo Videos ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "demo_videos" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "youtubeUrl" TEXT NOT NULL,
  "youtubeVideoId" TEXT NOT NULL,
  "thumbnailUrl" TEXT,
  "subject" TEXT,
  "duration" TEXT,
  "description" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT FALSE,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "facultyId" TEXT,
  "courseId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "demo_videos_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "demo_videos_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id"),
  CONSTRAINT "demo_videos_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id")
);

CREATE INDEX IF NOT EXISTS "demo_videos_facultyId_idx" ON "demo_videos"("facultyId");
CREATE INDEX IF NOT EXISTS "demo_videos_courseId_idx" ON "demo_videos"("courseId");
CREATE INDEX IF NOT EXISTS "demo_videos_featured_idx" ON "demo_videos"("featured");

-- ─── Faculty Applications ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "faculty_applications" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "qualification" TEXT NOT NULL,
  "experience" INTEGER NOT NULL DEFAULT 0,
  "subjects" TEXT[] DEFAULT '{}',
  "resumeUrl" TEXT,
  "message" TEXT,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "faculty_applications_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "faculty_applications_status_idx" ON "faculty_applications"("status");

-- ─── Wishlists ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "wishlists" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "itemType" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "title" TEXT NOT NULL DEFAULT '',
  "thumbnail" TEXT,
  "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "wishlists_userId_itemType_itemId_key" UNIQUE ("userId", "itemType", "itemId")
);

CREATE INDEX IF NOT EXISTS "wishlists_userId_idx" ON "wishlists"("userId");

-- ─── Bookmarks ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "bookmarks" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "blogId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "bookmarks_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE,
  CONSTRAINT "bookmarks_userId_blogId_key" UNIQUE ("userId", "blogId")
);

CREATE INDEX IF NOT EXISTS "bookmarks_userId_idx" ON "bookmarks"("userId");

-- ─── Video History ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "video_history" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "demoVideoId" TEXT NOT NULL,
  "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "video_history_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "video_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "video_history_demoVideoId_fkey" FOREIGN KEY ("demoVideoId") REFERENCES "demo_videos"("id") ON DELETE CASCADE,
  CONSTRAINT "video_history_userId_demoVideoId_key" UNIQUE ("userId", "demoVideoId")
);

CREATE INDEX IF NOT EXISTS "video_history_userId_idx" ON "video_history"("userId");

-- ─── Notifications ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "notifications" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "type" TEXT NOT NULL DEFAULT 'INFO',
  "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
  "link" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "notifications_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "notifications_userId_idx" ON "notifications"("userId");
CREATE INDEX IF NOT EXISTS "notifications_isRead_idx" ON "notifications"("isRead");

-- ─── Seed: Blog Categories ────────────────────────────────────────────────────

INSERT INTO "blog_categories" ("id", "name", "slug", "description", "isActive", "order")
VALUES
  ('blogcat-1', 'Career Guidance', 'career-guidance', 'Articles on professional career planning and advice', true, 1),
  ('blogcat-2', 'CA Exam Tips', 'ca-exam-tips', 'Preparation strategies for CA Foundation, Intermediate and Final', true, 2),
  ('blogcat-3', 'Study Skills', 'study-skills', 'Effective study techniques and time management', true, 3),
  ('blogcat-4', 'Institute Updates', 'institute-updates', 'Latest news from Academica Institute', true, 4)
ON CONFLICT (slug) DO NOTHING;

-- ─── Seed: Sample Blogs ───────────────────────────────────────────────────────

INSERT INTO "blogs" ("id", "title", "slug", "excerpt", "content", "featuredImage", "readTime", "featured", "isPublished", "publishedAt", "categoryId", "createdAt", "updatedAt")
VALUES
  ('blog-1', 'How to Crack CA Foundation in First Attempt', 'crack-ca-foundation-first-attempt',
   'A complete strategy guide for CA Foundation aspirants covering subject-wise preparation and time management.',
   '# How to Crack CA Foundation in First Attempt

CA Foundation is the entry point to one of the most prestigious professional qualifications in India. With the right strategy and consistent effort, clearing it in the first attempt is absolutely achievable.

## Understanding the Exam Pattern

CA Foundation consists of 4 papers:
- **Paper 1**: Principles and Practices of Accounting (100 marks)
- **Paper 2**: Business Laws & Business Correspondence (100 marks)
- **Paper 3**: Business Mathematics and Logical Reasoning & Statistics (100 marks)
- **Paper 4**: Business Economics & Business and Commercial Knowledge (100 marks)

## Subject-wise Strategy

### Accountancy (Paper 1)
Start with the basics. Build a strong foundation in journal entries, ledger posting, and trial balance before moving to final accounts.

### Business Laws (Paper 2)
Focus on understanding concepts rather than rote memorization. Use case studies to remember legal provisions.

### Business Mathematics (Paper 3)
Practice at least 20 problems daily. This paper is purely practice-based.

### Business Economics (Paper 4)
Read NCERT Class 11-12 Economics first, then move to ICAI study material.

## Time Management Tips
1. Create a 6-month study plan
2. Dedicate 8-10 hours daily
3. Revise every weekend
4. Attempt mock tests monthly

## Final Words
Consistency beats intensity. Study every day, take breaks, and stay positive. Academica Institute''s structured coaching covers all these aspects systematically.',
   null, 8, true, true, NOW() - INTERVAL '5 days', 'blogcat-2', NOW() - INTERVAL '5 days', NOW()),

  ('blog-2', 'Top 5 Career Options After Class 12 Commerce', 'career-options-after-class-12-commerce',
   'Explore the most promising career paths available to commerce students after completing Class 12.',
   '# Top 5 Career Options After Class 12 Commerce

Commerce stream opens doors to some of the most lucrative and respected careers in India. Here are the top 5 paths to consider.

## 1. Chartered Accountancy (CA)
The most prestigious commerce qualification. CAs are in high demand across industries with average packages of ₹7-25 LPA for freshers.

## 2. Company Secretary (CS)
CS professionals handle corporate governance and legal compliance. CS Foundation can be started alongside Class 12.

## 3. Cost and Management Accountancy (CMA)
CMA focuses on cost management in businesses. Excellent career in manufacturing and service industries.

## 4. CUET and B.Com
CUET (Common University Entrance Test) opens admission to top central universities for B.Com and related programs.

## 5. Chartered Financial Analyst (CFA)
For those interested in investment banking and finance, CFA is globally recognized.

## Making the Right Choice
Consider your interests, aptitude, and long-term goals. Academica Institute offers guidance sessions to help you choose the right path.',
   null, 6, false, true, NOW() - INTERVAL '10 days', 'blogcat-1', NOW() - INTERVAL '10 days', NOW()),

  ('blog-3', '5 Study Techniques That Actually Work', 'study-techniques-that-work',
   'Science-backed study methods proven to improve retention and understanding for professional exam preparation.',
   '# 5 Study Techniques That Actually Work

Studying hard is not enough — studying smart makes all the difference. Here are 5 proven techniques.

## 1. The Pomodoro Technique
Study for 25 minutes, take a 5-minute break. After 4 cycles, take a 30-minute break. This maintains focus and prevents burnout.

## 2. Active Recall
Instead of re-reading notes, close them and try to recall information. This is proven to be 3x more effective than passive reading.

## 3. Spaced Repetition
Review material at increasing intervals: 1 day, 3 days, 7 days, 21 days. Use apps like Anki for flashcards.

## 4. The Feynman Technique
Explain the concept in simple terms as if teaching a child. If you can explain it simply, you truly understand it.

## 5. Mind Mapping
Create visual maps connecting concepts. Particularly useful for law and theory-heavy subjects.

## Conclusion
Combine these techniques based on the subject. Practice problems for numerical subjects, active recall for theory.',
   null, 5, false, true, NOW() - INTERVAL '15 days', 'blogcat-3', NOW() - INTERVAL '15 days', NOW())
ON CONFLICT (slug) DO NOTHING;

-- ─── Seed: Sample Demo Videos ────────────────────────────────────────────────

INSERT INTO "demo_videos" ("id", "title", "youtubeUrl", "youtubeVideoId", "thumbnailUrl", "subject", "duration", "description", "featured", "isActive", "order")
VALUES
  ('demo-1', 'CA Foundation Accounts — Introduction to Partnership', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 'Accountancy', '45 min', 'Complete introduction to Partnership Accounts for CA Foundation students', true, true, 1),
  ('demo-2', 'Business Economics — Law of Demand', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 'Economics', '35 min', 'Detailed explanation of Law of Demand with diagrams and examples', true, true, 2),
  ('demo-3', 'Class 12 Commerce — Ratio Analysis', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 'Accountancy', '50 min', 'Complete Ratio Analysis chapter for Class 12 Commerce students', false, true, 3),
  ('demo-4', 'CS Foundation — Elements of Company Law', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 'Company Law', '40 min', 'Introduction to Elements of Company Law for CS Foundation', false, true, 4),
  ('demo-5', 'Business Mathematics — Simple & Compound Interest', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 'Mathematics', '30 min', 'Simple and Compound Interest problems solved step by step', false, true, 5)
ON CONFLICT ("id") DO NOTHING;

-- ─── Seed: Featured Results for Toppers Carousel ─────────────────────────────

UPDATE "results"
SET
  "featured" = TRUE,
  "course" = CASE
    WHEN "exam" ILIKE '%CA Foundation%' THEN 'CA Foundation'
    WHEN "exam" ILIKE '%CA Intermediate%' THEN 'CA Intermediate'
    WHEN "exam" ILIKE '%CS%' THEN 'CS Foundation'
    WHEN "exam" ILIKE '%CMA%' THEN 'CMA Foundation'
    ELSE "exam"
  END,
  "achievement" = CASE
    WHEN "rank" ILIKE '%AIR 1%' THEN 'All India Rank 1 — Top performer in the entire country'
    WHEN "rank" ILIKE '%AIR 2%' THEN 'All India Rank 2 — Among the best performers nationwide'
    WHEN "rank" ILIKE '%AIR 3%' THEN 'All India Rank 3 — Exceptional performance at national level'
    ELSE 'Top performer with outstanding results'
  END,
  "quote" = 'Academica Institute gave me the structured guidance and motivation I needed to achieve this rank.'
WHERE "isActive" = TRUE
LIMIT 6;

-- ─── Seed: Sample Faculty Updates ────────────────────────────────────────────

UPDATE "faculty"
SET
  "category" = 'COMMERCE',
  "qualification" = 'Chartered Accountant (CA)',
  "achievements" = ARRAY['AIR 1 student produced', '10+ years teaching experience', '500+ students cleared CA Foundation'],
  "specialization" = 'Financial Accounting and Taxation',
  "languages" = ARRAY['Hindi', 'English']
WHERE "isActive" = TRUE;

DO $$ BEGIN
  RAISE NOTICE 'Phase 1 migration completed successfully.';
END $$;
