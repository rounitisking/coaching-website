import type { Faculty } from "@/types";
import { images } from "./images";

export const faculty: Faculty[] = [
  {
    id: "rajesh-kumar",
    slug: "rajesh-kumar",
    name: "CA Rajesh Kumar",
    designation: "Head of Accountancy & CA Program",
    subjects: ["Accountancy", "CA Foundation", "Class 11 Commerce", "Class 12 Commerce"],
    qualification: "FCA (Fellow Chartered Accountant) | Ph.D. in Commerce, Delhi School of Economics",
    experience: "18 Years",
    bio: "CA Rajesh Kumar is a senior Chartered Accountant and one of the most renowned Accountancy teachers in Delhi. With a Ph.D. from the prestigious Delhi School of Economics, he has mentored over 5,000 students preparing for CA Foundation and Board exams. His practical approach to ledger concepts and double-entry book-keeping ensures outstanding success rates.",
    photo: images.faculty.rajeshKumar,
    achievements: [
      "Mentored 500+ successful Chartered Accountants",
      "Author of 'Simplified Corporate Accounting' — India's leading textbook",
      "Achieved a 95% pass percentage in Class 12 Commerce batches for 10 consecutive years",
      "Trained 12 National Subject Toppers in Accountancy",
    ],
    teachingStyle:
      "CA Rajesh Kumar believes in linking theory with real-world corporate balance sheets. He demystifies accounting standards and uses live corporate case studies to make ledger entries intuitive.",
    awards: [
      "Outstanding Educator in Finance — commerce Conclave 2023",
      "Most Trusted CA Mentor Award — Northern India Regional Council of ICAI 2022",
    ],
    reviews: [
      {
        name: "Aman Sen (CA Foundation Topper, Dec 2024)",
        rating: 5,
        comment:
          "Sir's accountancy classes are phenomenal. He explains the debit-credit logic so clearly that you never have to memorize entries.",
        course: "CA Foundation",
      },
      {
        name: "Ria Malhotra (99% in Accountancy, Class 12 Boards)",
        rating: 5,
        comment: "The mock tests and sample paper revisions organized by Rajesh Sir are exactly like the actual board exam.",
        course: "Class 12 Commerce",
      },
    ],
    whatsappNumber: "918375060247",
    featured: true,
  },
  {
    id: "priya-sharma",
    slug: "priya-sharma",
    name: "CS Priya Sharma",
    designation: "Head of Business Law & CS Program",
    subjects: ["Business Studies", "CS Preparation", "Commercial Law"],
    qualification: "FCS (Fellow Company Secretary) | LL.M., Delhi University",
    experience: "15 Years",
    bio: "CS Priya Sharma is a practicing Company Secretary and senior educator specializing in corporate law and business studies. Her interactive teaching methods, visual law chart mappings, and simplified legal explanations have helped hundreds of students pass their CS Foundation and executive levels, and secure 95+ in Board Business Studies.",
    photo: images.faculty.priyaSharma,
    achievements: [
      "Guided 350+ candidates to successful CS qualifying examinations",
      "Created the popular 'Simplified Business Studies' diagram sheets",
      "Specially invited corporate law advisor at top business chambers",
      "Maintained 100% board clearance rate in Business Studies for 5+ years",
    ],
    teachingStyle:
      "CS Priya uses real legal draft reviews and management case studies. Her signature flowchart system helps students memorize complex provisions and corporate structures effortlessly.",
    awards: [
      "Distinguished Law Teacher Award — Delhi Corporate Council 2023",
      "Best Management Faculty — Northern India Education Summit 2022",
    ],
    reviews: [
      {
        name: "Meera Nair (CS Foundation Clear, 2024)",
        rating: 5,
        comment: "Her law classes are incredibly engaging. Business Law went from being dry to my absolute favorite subject.",
        course: "CS Preparation",
      },
    ],
    whatsappNumber: "918375060247",
    featured: true,
  },
  {
    id: "amit-verma",
    slug: "amit-verma",
    name: "CMA Amit Verma",
    designation: "Head of Economics & CMA Program",
    subjects: ["Economics", "CMA Preparation", "Class 11 Commerce", "Class 12 Commerce"],
    qualification: "FCMA (Fellow Cost & Management Accountant) | M.Phil in Economics, JNU",
    experience: "14 Years",
    bio: "CMA Amit Verma is an eminent economist and Cost Accountant who brings rich analytical insights to the classroom. With an M.Phil from JNU, he specializes in Macroeconomics, Microeconomics, and Costing for professional exams. He is well-known for his simple explanations of graphs and quantitative methods.",
    photo: images.faculty.amitVerma,
    achievements: [
      "Mentored over 400 CMA selections and Commerce board students",
      "Developed proprietary costing worksheets that guarantee 20% speed improvement in exams",
      "Regular columnist in economics and finance journals",
    ],
    teachingStyle:
      "CMA Amit focuses on graphs, logic, and analytical problem-solving. He makes Economics extremely engaging by discussing current global economic trends, fiscal policies, and cost-benefit analysis.",
    awards: ["Excellence in Commerce Education Award — National CMA Chapter 2023"],
    reviews: [
      {
        name: "Deepak Rawat (CMA Intermediate Topper)",
        rating: 5,
        comment: "Verma Sir's costing modules are legendary. He makes mathematical accounting calculations look incredibly simple.",
        course: "CMA",
      },
    ],
    whatsappNumber: "918375060247",
    featured: true,
  },
  {
    id: "sneha-gupta",
    slug: "sneha-gupta",
    name: "Dr. Sneha Gupta",
    designation: "Senior Faculty — Accountancy & CUET",
    subjects: ["Accountancy", "CUET", "Class 11 Commerce", "Class 12 Commerce"],
    qualification: "Ph.D. in Corporate Finance, Delhi University | M.Com",
    experience: "12 Years",
    bio: "Dr. Sneha Gupta specializes in Financial Management and advanced accountancy. She is highly passionate about building solid mathematical and accountancy concepts for class 11 and 12 students, ensuring they excel in both school boards and college entrances like CUET.",
    photo: images.faculty.snehaGupta,
    achievements: [
      "Guided 150+ students to 99-100 percentile in CUET Accountancy domain",
      "Published 10+ research papers on corporate reporting and audit standards",
      "Developed special CUET speed-run strategy manuals",
    ],
    teachingStyle:
      "Dr. Sneha uses color-coded accounts, ledger flow diagrams, and active practice sets to make accounting standard concepts visual and intuitive.",
    awards: ["Best Accounting Faculty in NCR — Delhi Education Awards 2022"],
    reviews: [
      {
        name: "Karan Gupta (100 Percentile in CUET Accountancy 2024)",
        rating: 5,
        comment: "Her MCQ practice sessions and speed-solving strategies are the key reasons why I got full marks in my CUET exam.",
        course: "CUET",
      },
    ],
    whatsappNumber: "918375060247",
    featured: true,
  },
  {
    id: "vikram-singh",
    slug: "vikram-singh",
    name: "Mr. Vikram Singh",
    designation: "Senior Educator — Class 9 & 10 Tuition",
    subjects: ["Mathematics", "Science", "Class 9 Tuition", "Class 10 Tuition"],
    qualification: "M.Sc. in Physics, Delhi University | B.Ed.",
    experience: "10 Years",
    bio: "Mr. Vikram Singh has been teaching Class 9 and 10 students for over a decade. He specializes in building a robust base in Science and Mathematics, helping students bridge the gap between middle school and secondary boards with high confidence and grades.",
    photo: images.faculty.vikramSingh,
    achievements: [
      "Instructed over 1,500 students achieving 90%+ in CBSE Class 10 Board exams",
      "Maintained a perfect 100% board clearance rate in secondary school science subjects",
    ],
    teachingStyle:
      "Mr. Vikram focuses on concept-clarity, regular descriptive assessments, and time-management strategies, ensuring students are perfectly prepared for writing board answers.",
    awards: ["Secondary Education Excellence Award — Delhi Teachers Conclave 2023"],
    reviews: [
      {
        name: "Shreya Roy (98% in Class 10 Boards)",
        rating: 5,
        comment: "Vikram Sir's science notes and daily revision sheets are extremely useful. He cleared all my doubts instantly.",
        course: "Class 10 Tuition",
      },
    ],
    whatsappNumber: "918375060247",
    featured: false,
  },
  {
    id: "anita-mehta",
    slug: "anita-mehta",
    name: "Mrs. Anita Mehta",
    designation: "Senior Educator — Class 9 & 10 Social Science & English",
    subjects: ["Social Studies", "English", "Class 9 Tuition", "Class 10 Tuition"],
    qualification: "M.A. in History, Delhi University | B.Ed.",
    experience: "16 Years",
    bio: "Mrs. Anita Mehta has a legendary reputation for making humanities and English exciting for junior and secondary level students. Her structured answer-writing training and memory techniques help students secure top marks in school exams.",
    photo: images.faculty.anitaMehta,
    achievements: [
      "Over 98% of her students score above 90% in CBSE Social Science boards",
      "Created the Academica 'Social Science Map Book' which is highly acclaimed",
      "Board examiner for Social Science for 8 consecutive years",
    ],
    teachingStyle:
      "Mrs. Anita makes history and geography interesting using historical storytelling, timeline maps, and memory mnemonics to retain long details.",
    awards: ["Best Secondary Faculty Award — EDEX Awards 2022"],
    reviews: [
      {
        name: "Rohan Varma (97% in Class 10 Boards)",
        rating: 5,
        comment: "Social Science map practices and Mrs. Anita's history storytelling sessions are incredibly memorable. I went from 60 to 95+ in boards.",
        course: "Class 10 Tuition",
      },
    ],
    whatsappNumber: "918375060247",
    featured: false,
  },
];

export const getFacultyBySlug = (slug: string) =>
  faculty.find((f) => f.slug === slug) || null;

export const getFeaturedFaculty = () => faculty.filter((f) => f.featured);
