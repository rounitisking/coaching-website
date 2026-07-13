-- Seed script for Academica Coaching Website
-- Paste this script inside Supabase SQL Editor AFTER running schema.sql.

-- 1. Clean existing table data (Cascade handles foreign keys)
TRUNCATE TABLE "users" CASCADE;
TRUNCATE TABLE "categories" CASCADE;
TRUNCATE TABLE "faculty" CASCADE;
TRUNCATE TABLE "courses" CASCADE;
TRUNCATE TABLE "course_modules" CASCADE;
TRUNCATE TABLE "lessons" CASCADE;
TRUNCATE TABLE "faqs" CASCADE;
TRUNCATE TABLE "notices" CASCADE;
TRUNCATE TABLE "popups" CASCADE;
TRUNCATE TABLE "site_settings" CASCADE;
TRUNCATE TABLE "test_series" CASCADE;
TRUNCATE TABLE "testimonials" CASCADE;

-- 2. Insert Users (Bcrypt hashes: Admin@1234 and Student@1234)
INSERT INTO "users" ("id", "name", "email", "password", "role", "phone", "isActive", "createdAt", "updatedAt")
VALUES
('usr_admin', 'Admin Counselor', 'admin@academica.in', '$2b$12$l4NSvI/YjlsbtZhuz8mgWeMMPmug/rfbYCD9dJeumdU5j0lVoenru', 'ADMIN', '+91 83750 60247', true, NOW(), NOW()),
('usr_student', 'Sneha Patel', 'student@academica.in', '$2b$12$nPfpcyFSY0jXFehBDpu56.dOfzVcRKU8wX/pwRNuzwk72LIBlb1M2', 'USER', '+91 98765 43210', true, NOW(), NOW());

-- 3. Insert Categories
INSERT INTO "categories" ("id", "name", "slug", "type", "description", "icon", "color", "order", "isActive", "createdAt", "updatedAt")
VALUES
('cat_commerce', 'Commerce Professional', 'commerce-coaching', 'COMMERCE', 'Specialized batches for CA, CS, and CMA coaching', 'Briefcase', '#2563eb', 1, true, NOW(), NOW()),
('cat_school', 'School Tuition (9-12)', 'school-classes', 'SCHOOL', 'Foundation CBSE classes for commerce and core subjects', 'BookOpen', '#10b981', 2, true, NOW(), NOW());

-- 4. Insert Faculty
INSERT INTO "faculty" ("id", "name", "slug", "designation", "subjects", "photo", "bio", "experience", "featured", "isActive", "order", "createdAt", "updatedAt")
VALUES
('fac_rajesh', 'CA Rajesh Kumar', 'ca-rajesh-kumar', 'Senior Accounts Partner Faculty', ARRAY['Accountancy', 'Financial Management', 'Costing'], null, 'Over 12 years of core teaching experience guiding professional aspirants through difficult taxation and financial concepts.', 12, true, true, 1, NOW(), NOW()),
('fac_meenakshi', 'CS Meenakshi Sharma', 'cs-meenakshi-sharma', 'Corporate Law Specialist Educator', ARRAY['Business Studies', 'Commercial Law', 'Jurisprudence'], null, 'A practicing Company Secretary who teaches legal frameworks with real-world case studies for deep conceptual retention.', 8, true, true, 2, NOW(), NOW());

-- 5. Insert Courses
INSERT INTO "courses" ("id", "title", "slug", "description", "content", "price", "mrp", "thumbnail", "brochure", "videoPreview", "duration", "language", "level", "featured", "isActive", "isPublished", "order", "categoryId", "facultyId", "createdAt", "updatedAt")
VALUES
('crs_ca_found', 'CA Foundation Complete Preparation', 'ca-foundation-prep', 'Comprehensive preparation batch covering Accountancy, Law, Economics, and Quantitative Aptitude.', 'Our CA Foundation program is structured to help students clear their exam in the first attempt. Includes comprehensive lectures, regular mock tests, revision booklets, and doubt sessions.', 18500, 24000, null, null, null, '6 Months', 'Hindi/English', 'Beginner', true, true, true, 1, 'cat_commerce', 'fac_rajesh', NOW(), NOW()),
('crs_class_12_acc', 'Class 12 Accountancy Pro-Batch', 'class-12-accountancy', 'Thorough CBSE Board Syllabus coverage focusing on Partnership, Share Capital, and Financial Analysis.', 'This batch prepares class 12 commerce students for top board marks. Focuses on rigorous numerical problem-solving, weekly assignments, and mock boards.', 9500, 12000, null, null, null, '1 Year', 'Hindi/English', 'Beginner', true, true, true, 2, 'cat_school', 'fac_rajesh', NOW(), NOW());

-- 6. Insert Course Modules
INSERT INTO "course_modules" ("id", "title", "order", "courseId", "createdAt")
VALUES
('mod_ca_acc', 'Accounting Principles & Concepts', 1, 'crs_ca_found', NOW()),
('mod_board_partner', 'Partnership Accounts fundamentals', 1, 'crs_class_12_acc', NOW());

-- 7. Insert Lessons
INSERT INTO "lessons" ("id", "title", "description", "videoUrl", "duration", "order", "isFree", "moduleId", "createdAt")
VALUES
('les_ca_1', 'Introduction to Accounting Standard & Policies', 'Understand GAAP, business entity assumptions, and fundamental standards.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 45, 1, true, 'mod_ca_acc', NOW()),
('les_ca_2', 'Trial Balance & Rectification of Errors', 'Master standard adjustments and journal entry rectifications.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 60, 2, false, 'mod_ca_acc', NOW()),
('les_board_1', 'Partnership Deed Rules & Provisions', 'Core legal provisions in the absence of a partnership agreement.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 40, 1, true, 'mod_board_partner', NOW());

-- 8. Insert FAQs
INSERT INTO "faqs" ("id", "question", "answer", "category", "order", "isActive", "createdAt")
VALUES
('faq_1', 'What are the office counsel timings for admissions inquiry?', 'Counselors are available in-person and on call Monday to Saturday, 8:00 AM to 7:00 PM.', 'General', 1, true, NOW()),
('faq_2', 'Are backup recorded video lectures available for missed classes?', 'Yes! Students get premium access to our portal where backup video modules are available for 100% revision.', 'Academics', 2, true, NOW());

-- 9. Insert Notices
INSERT INTO "notices" ("id", "title", "content", "link", "isUrgent", "isActive", "order", "createdAt")
VALUES
('not_1', 'CA Foundation revision test starts this Sunday at 10 AM. Attendance mandatory.', null, null, true, true, 1, NOW()),
('not_2', 'Enrollments for Class 12 CBSE Board intensive crash course are closing soon.', null, '/courses/class-12-accountancy', false, true, 2, NOW());

-- 10. Insert Popups
INSERT INTO "popups" ("id", "title", "content", "ctaText", "ctaUrl", "image", "isActive", "createdAt", "updatedAt")
VALUES
('pop_1', 'Admissions Open 2025-26!', 'Early batch registrations lock in 20% discount on all tuition and CA foundation packages.', 'Register Now', '/auth', null, true, NOW(), NOW());

-- 11. Insert Site Settings
INSERT INTO "site_settings" ("id", "key", "value", "label", "group", "updatedAt")
VALUES
('set_phone', 'contact_phone', '"+91 83750 60247"', 'Contact Phone', 'General', NOW()),
('set_email', 'contact_email', '"info@academicainstitute.in"', 'Contact Email', 'General', NOW()),
('set_address', 'contact_address', '"Building No. 45, Kalu Sarai, Near Hauz Khas Metro Station, New Delhi — 110016"', 'Office Address', 'General', NOW());

-- 12. Insert Testimonials
INSERT INTO "testimonials" ("id", "name", "avatar", "text", "rating", "course", "year", "isActive", "order", "createdAt")
VALUES
('tst_1', 'Sneha Patel', null, 'Academica helped me build solid concepts in Accountancy. CA Foundation felt very structured and achievable.', 5, 'CA Foundation Prep', 2024, true, 1, NOW());
