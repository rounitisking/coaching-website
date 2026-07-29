import type { Faculty } from "@/types";

export const faculty: Faculty[] = [
  {
    id: "vijay-sharma",
    slug: "vijay-sharma",
    name: "Vijay Sharma",
    designation: "Senior Lead Faculty & Academic Director",
    subjects: ["Accountancy", "Business Law", "Economics", "Class 11 Commerce", "Class 12 Commerce"],
    qualification: "FCA (Fellow Chartered Accountant) | B.Com (Hons), SRCC",
    experience: "10+ Years Experience",
    bio: "Vijay Sharma is a highly experienced Chartered Accountant who has been leading professional CA, CS, and CMA coaching programs for over a decade. His simplified approach to accounting concepts, double-entry ledger methods, and legal frameworks has helped thousands of students secure top board scores and national ranks.",
    photo: "/faculty/vijay sharma.webp",
    achievements: [
      "Mentored 2,000+ CA, CS, and CMA aspirants",
      "Achieved outstanding Board pass percentage for commerce students",
      "Recipient of National Commerce Educator Excellence Award",
    ],
    teachingStyle:
      "He focuses on conceptual clarity using flowcharts, real-world finance examples, and interactive live workshops.",
    awards: ["Outstanding Commerce Educator Award 2024"],
    reviews: [
      {
        name: "Aman Sen (CA Foundation Topper)",
        rating: 5,
        comment: "Vijay Sir's notes are highly structured and make complex law and costing concepts easy to understand.",
        course: "CA Foundation",
      },
    ],
    whatsappNumber: "918375060247",
    featured: true,
  },
];

export const getFacultyBySlug = (slug: string): Faculty | undefined => faculty.find((f) => f.slug === slug);
export const getFeaturedFaculty = (): Faculty[] => faculty.filter((f) => f.featured);

