import type { Testimonial } from "@/types";
import { images } from "./images";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sunita Sen",
    photo: images.testimonials.parent1,
    role: "Parent of Aman Sen (AIR 1, CA Foundation 2024)",
    rating: 5,
    text: "Academica Institute transformed my son's professional journey. From starting accounts basics in Class 11 to scoring AIR 1 in CA Foundation — this is amazing. The Chartered Accountant faculty's teaching and the regular mock papers are highly effective. We are extremely grateful.",
    course: "CA Foundation Program",
    year: 2024,
    platform: "google",
  },
  {
    id: "t2",
    name: "Dr. Ramesh Malhotra",
    photo: images.testimonials.parent2,
    role: "Parent of Ria Malhotra (99.2% in Commerce Boards 2024)",
    rating: 5,
    text: "We chose Academica for my daughter's Class 12 Commerce preparation, and it was the best decision. CA Rajesh Kumar's teaching is exceptional — he made balance sheet logic so easy. The personalized doubt sessions build high confidence in students.",
    course: "Class 12 Board Commerce Masterclass",
    year: 2024,
    platform: "google",
  },
  {
    id: "t3",
    name: "Karan Gupta",
    photo: images.testimonials.student1,
    role: "100 Percentile, CUET 2024 | SRCC, DU",
    rating: 5,
    text: "If you are serious about getting into SRCC, Delhi University, Academica Institute is the place. The domain subject coverage (Accountancy, Economics, BSt) is incredibly detailed. The online NTA-interface mock series was key to my perfect score.",
    course: "CUET Prep Program (Commerce)",
    year: 2024,
    platform: "website",
  },
  {
    id: "t4",
    name: "Shreya Roy",
    photo: images.testimonials.student2,
    role: "98.6% in CBSE Class 10 Boards | School Topper",
    rating: 5,
    text: "I was extremely nervous about Science and Math boards. Vikram Sir at Academica made everything easy. The daily practice problems, personal doubt clearing, and continuous writing practices helped me score 99 in Mathematics.",
    course: "Class 10 Board Excellence Tuition",
    year: 2024,
    platform: "google",
  },
];
