import type { Result } from "@/types";
import { images } from "./images";

export const results: Result[] = [
  {
    id: "aman-ca-top",
    name: "Aman Sen",
    photo: images.students.arjunSharma,
    exam: "CA",
    rank: "AIR 1",
    score: "365/400",
    year: 2024,
    course: "CA Foundation Program",
    successStory:
      "I joined Academica Institute in Class 12 and continued for CA Foundation. The structured lectures by CA Rajesh Kumar and regular mock tests build absolute conceptual clarity. Scoring AIR 1 is a dream come true, and the credit goes entirely to the dedication of Academica's faculty.",
    selectionBadge: "CA Foundation National Topper",
    featured: true,
  },
  {
    id: "ria-boards-top",
    name: "Ria Malhotra",
    photo: images.students.priyaMehta,
    exam: "Boards",
    rank: "99.2%",
    score: "496/500",
    year: 2024,
    course: "Class 12 Board Commerce Masterclass",
    successStory:
      "Academica Institute provides the best board exam preparation in Delhi. The chapter-wise answer-writing checks, mock boards, and doubt clearing sessions helped me secure 100/100 in Accountancy and Business Studies. Extremely grateful to Rajesh Sir and Priya Ma'am!",
    selectionBadge: "CBSE Class 12 Commerce State Topper",
    featured: true,
  },
  {
    id: "meera-cs-top",
    name: "Meera Nair",
    photo: images.students.ankitaSingh,
    exam: "CS",
    rank: "AIR 12",
    score: "348/400",
    year: 2024,
    course: "CS Preparation Program",
    successStory:
      "CS Priya Sharma Ma'am's law notes are highly structured and precise. Legal sections and provisions which seemed tough became extremely interesting. The mock papers perfectly aligned with the ICSI pattern.",
    selectionBadge: "CS Foundation Rank Holder",
    featured: true,
  },
  {
    id: "deepak-cma-top",
    name: "Deepak Rawat",
    photo: images.students.deepakVerma,
    exam: "CMA",
    rank: "AIR 8",
    score: "358/400",
    year: 2024,
    course: "CMA Preparation Program",
    successStory:
      "Under the guidance of CMA Amit Verma Sir, my costing skills improved significantly. The intensive calculations workshops and daily worksheets gave me the speed and accuracy required to clear the examination with a single-digit national rank.",
    selectionBadge: "CMA Intermediate Rank Holder",
    featured: true,
  },
  {
    id: "karan-cuet-top",
    name: "Karan Gupta",
    photo: images.students.rohitKumar,
    exam: "CUET",
    rank: "100 %ile",
    score: "800/800",
    year: 2024,
    course: "CUET Prep Program (Commerce)",
    successStory:
      "Academica's CUET portal and CBT mock series gave me real-time exam practice. Achieving a perfect 800/800 score got me admission to SRCC, Delhi University. Thank you, Academica!",
    selectionBadge: "SRCC, DU — B.Com (Hons)",
    featured: true,
  },
  {
    id: "shreya-class10-top",
    name: "Shreya Roy",
    photo: images.students.kavyaReddy,
    exam: "Boards",
    rank: "98.6%",
    score: "493/500",
    year: 2024,
    course: "Class 10 Board Excellence Tuition",
    successStory:
      "The secondary foundation classes at Academica built strong scientific and mathematical concepts. Vikram Sir's regular tests and personal guidance helped me overcome my exam anxiety and score 98% in CBSE boards.",
    selectionBadge: "CBSE Class 10 School Topper",
    featured: true,
  },
  {
    id: "rahul-ca-top",
    name: "Rahul Varma",
    photo: images.students.rahulGupta,
    exam: "CA",
    rank: "AIR 24",
    score: "340/400",
    year: 2023,
    course: "CA Foundation Program",
    successStory:
      "Academica's study materials and revision schedules are highly effective. The ICAI exam pattern mock tests prepared me to handle tough questions easily.",
    selectionBadge: "CA Foundation Rank Holder",
    featured: true,
  },
  {
    id: "simran-cuet-top2",
    name: "Simran Kaur",
    photo: images.students.simranKaur,
    exam: "CUET",
    rank: "99.8 %ile",
    score: "792/800",
    year: 2023,
    course: "CUET Prep Program (Commerce)",
    successStory:
      "My target was Lady Shri Ram College. With domain prep, general test worksheets, and constant guidance from Vikram Sir, I cleared CUET with flying colors.",
    selectionBadge: "LSR College, DU — Economics (Hons)",
    featured: true,
  },
];

export const getFeaturedResults = () => results.filter((r) => r.featured);
export const getResultsByExam = (exam: string) =>
  results.filter((r) => r.exam === exam);
export const getResultsByYear = (year: number) =>
  results.filter((r) => r.year === year);
