// ============================================================
// SHARED TYPESCRIPT TYPES FOR COACHING INSTITUTE WEBSITE
// ============================================================

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  category: "commerce" | "academic" | "subject";
  eligibility: string;
  duration: string;
  batchTimings: string[];
  fee: string;
  highlights: string[];
  syllabus: SyllabusSection[];
  facultyIds: string[];
  faqs: FAQ[];
  successStories: string[]; // result IDs
  relatedCourseIds: string[];
  featured: boolean;
  whatsappMessage: string;
}

export interface SyllabusSection {
  title: string;
  topics: string[];
}

export interface Faculty {
  id: string;
  slug: string;
  name: string;
  designation: string;
  subjects: string[];
  qualification: string;
  experience: string;
  bio: string;
  photo: string;
  achievements: string[];
  teachingStyle: string;
  awards: string[];
  reviews: StudentReview[];
  whatsappNumber: string;
  featured: boolean;
}

export interface StudentReview {
  name: string;
  rating: number;
  comment: string;
  course: string;
}

export interface Result {
  id: string;
  name: string;
  photo: string;
  exam: "CA" | "CS" | "CMA" | "CUET" | "Boards";
  rank?: string;
  score: string;
  year: number;
  course: string;
  successStory?: string;
  selectionBadge: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  role: string;
  rating: number;
  text: string;
  course: string;
  year: number;
  platform: "google" | "website";
}

export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  src: string;
  thumbnail: string;
  caption: string;
  category: string;
  year: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "admission" | "result" | "event" | "general";
  urgent: boolean;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  category: string;
  featured: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "notes" | "dpp" | "assignment" | "pyq" | "test";
  subject: string;
  course: string;
  fileUrl: string;
  fileSize: string;
  free: boolean;
}

export interface InstituteInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  founded: string;
  city: string;
  address: string;
  phone: string[];
  email: string;
  whatsapp: string;
  mapEmbedUrl: string;
  social: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    telegram?: string;
  };
}

export interface HeroData {
  headline: string;
  subheadline: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
  badge: string;
  stats: { value: string; label: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}
