import type { Course } from "@/types";
import { images } from "./images";

export const courses: Course[] = [
  // ─── CA COURSES ────────────────────────────────────────────────────────────
  {
    id: "ca-foundation",
    slug: "ca-foundation",
    title: "CA Foundation Program",
    shortTitle: "CA Foundation",
    tagline: "Comprehensive preparation for CA Foundation exams with experienced Chartered Accountants",
    description:
      "Our CA Foundation course is designed to build a solid groundwork in Accounting, Mercantile Law, Quantitative Aptitude, and Business Economics. Mentored by senior Chartered Accountants and economists, this program provides extensive concept coverage, structured study material, and regular mock tests to ensure success in your first attempt.",
    image: images.courses.caFoundation,
    category: "commerce",
    eligibility: "Class 12 appeared or passed students",
    duration: "6 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 11:30 AM",
      "Evening Batch: 4:00 PM – 7:30 PM",
    ],
    fee: "₹45,000",
    highlights: [
      "Mentoring by experienced CA & FCA faculty",
      "Regular chapter-wise tests & full mock exams",
      "Mercantile law flowchart sheets & key sections study",
      "Special quantitative aptitude speed-building classes",
      "Up-to-date printed study material following ICAI guidelines",
      "Special doubt-clearing sessions 6 days a week",
    ],
    syllabus: [
      {
        title: "Paper 1 & 2: Accounting & Mercantile Law",
        topics: [
          "Accounting Principles & Frameworks",
          "Preparation of Final Accounts & Partnership",
          "Indian Contract Act, 1872",
          "Sale of Goods Act, 1930",
          "Companies Act, 2013",
        ],
      },
      {
        title: "Paper 3 & 4: Quantitative Aptitude & Economics",
        topics: [
          "Business Mathematics & Algebra",
          "Logical Reasoning & Statistics",
          "Microeconomics & Macroeconomics Basics",
          "Business & Commercial Knowledge",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "priya-sharma", "amit-verma"],
    faqs: [
      {
        question: "Is this course aligned with the latest ICAI syllabus?",
        answer: "Yes, our course material is fully updated as per the latest guidelines and exam patterns specified by ICAI.",
      },
      {
        question: "Do you offer mock test feedback?",
        answer: "Yes, every mock test is evaluated, and student-wise performance analytics are shared along with individual feedback sessions.",
      },
    ],
    successStories: ["aman-ca-top"],
    relatedCourseIds: ["ca-intermediate", "class-12-commerce"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CA Foundation course. Please share complete details.",
  },
  {
    id: "ca-intermediate",
    slug: "ca-intermediate",
    title: "CA Intermediate Preparation",
    shortTitle: "CA Intermediate",
    tagline: "Rigorous corporate accounting, costing, and taxation coaching by CA specialists",
    description:
      "The CA Intermediate course deepens professional competency in Financial Reporting, Advanced Accounting, Corporate Law, Costing, Taxation, Audit, and Strategic Management. We provide deep numerical problem-solving sessions and amendment updates to help you clear both groups.",
    image: images.courses.caFoundation,
    category: "commerce",
    eligibility: "CA Foundation cleared or Direct Entry graduates",
    duration: "9 Months",
    batchTimings: [
      "Regular Batch: 8:00 AM – 2:00 PM",
      "Weekend Batch: 9:00 AM – 6:00 PM",
    ],
    fee: "₹75,000",
    highlights: [
      "Coverage of Group 1 and Group 2 accounting modules",
      "Costing shortcuts and taxation amendment sheets",
      "In-depth company law provisions and case study audits",
      "Full syllabus mock test series with strict evaluation",
    ],
    syllabus: [
      {
        title: "Group 1 Modules",
        topics: [
          "Advanced Accounting & Consolidation",
          "Corporate and Other Laws",
          "Cost and Management Accounting",
        ],
      },
      {
        title: "Group 2 Modules",
        topics: [
          "Direct & Indirect Taxation",
          "Auditing and Ethics",
          "Financial Management & Strategic Management",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "priya-sharma", "amit-verma"],
    faqs: [
      {
        question: "Can I join only for Group 1 modules?",
        answer: "Yes, you can register for individual groups or specific subjects as per your requirement.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["ca-foundation", "ca-final"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CA Intermediate course. Please share complete details.",
  },
  {
    id: "ca-final",
    slug: "ca-final",
    title: "CA Final Advanced Program",
    shortTitle: "CA Final",
    tagline: "Advanced corporate reporting, financial management, and advanced auditing strategies",
    description:
      "Our CA Final course prepares students for the ultimate tier of the ICAI qualification. Specialized guidance is offered in Financial Reporting, Strategic Financial Management, Advanced Auditing, Direct Tax Laws, and Indirect Tax Laws with case-study based analysis.",
    image: images.courses.caFoundation,
    category: "commerce",
    eligibility: "CA Intermediate cleared & completed articleship",
    duration: "12 Months",
    batchTimings: [
      "Morning Batch: 7:00 AM – 9:30 AM",
      "Late Evening Batch: 6:30 PM – 9:00 PM",
    ],
    fee: "₹95,000",
    highlights: [
      "Case study analysis for advanced corporate reporting",
      "Special workshops on Ind AS and auditing standards",
      "Direct Tax & International Taxation compliance updates",
      "Exam oriented revision sessions with past toppers",
    ],
    syllabus: [
      {
        title: "Core Papers (Group 1)",
        topics: [
          "Financial Reporting & Ind AS",
          "Advanced Financial Management (AFM)",
          "Advanced Auditing, Assurance and Professional Ethics",
        ],
      },
      {
        title: "Core Papers (Group 2)",
        topics: [
          "Direct Tax Laws & International Taxation",
          "Indirect Tax Laws (GST & Customs)",
          "Integrated Business Solutions (Multi-disciplinary)",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "priya-sharma"],
    faqs: [
      {
        question: "Are amendment lectures included?",
        answer: "Yes, all statutory amendments and revisions are provided as separate booster sessions before exams.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["ca-intermediate"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CA Final course. Please share complete details.",
  },

  // ─── CS COURSES ────────────────────────────────────────────────────────────
  {
    id: "cs-foundation",
    slug: "cs-foundation",
    title: "CS Foundation / CSEET Program",
    shortTitle: "CS Foundation",
    tagline: "Ace your Company Secretary entrance exam with legal and corporate affairs specialists",
    description:
      "Prepare for the CS Executive Entrance Test (CSEET) and Foundation with a curriculum built by corporate governance experts. The course covers Business Communication, Legal Aptitude, Logical Reasoning, Economic Environment, and Current Affairs.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "Class 12 passed or appeared students",
    duration: "3 Months",
    batchTimings: [
      "Regular Batch: 9:00 AM – 1:00 PM",
      "Weekend Batch: 10:00 AM – 4:00 PM",
    ],
    fee: "₹20,000",
    highlights: [
      "Mentoring by practicing FCS legal experts",
      "Regular online MCQ mock tests matching CSEET pattern",
      "Vocabulary building and business communication modules",
      "Doubt clearing classes 6 days a week",
    ],
    syllabus: [
      {
        title: "Syllabus Content",
        topics: [
          "Business Communication & English Grammar",
          "Legal Aptitude & Constitution of India",
          "Logical Reasoning & Analytical Ability",
          "Economic and Business Environment",
          "Current Affairs & Presentation Skills",
        ],
      },
    ],
    facultyIds: ["priya-sharma", "rajesh-kumar"],
    faqs: [
      {
        question: "Is CSEET conducted online?",
        answer: "Yes, CSEET is a computer-based test conducted by ICSI.",
      },
    ],
    successStories: ["meera-cs-top"],
    relatedCourseIds: ["cs-executive", "ca-foundation"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CS Foundation / CSEET course. Please share complete details.",
  },
  {
    id: "cs-executive",
    slug: "cs-executive",
    title: "CS Executive Preparation",
    shortTitle: "CS Executive",
    tagline: "In-depth corporate laws, tax laws, and compliance management",
    description:
      "The CS Executive program deepens students knowledge in Company Law, Jurisprudence, Interpretation of Statutes, Tax Laws, and Corporate Accounting. We focus heavily on legal drafting, case studies, and corporate secretarial standards.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "CSEET cleared or Direct Entry graduates",
    duration: "8 Months",
    batchTimings: [
      "Regular Batch: 8:30 AM – 2:30 PM",
      "Evening Batch: 3:30 PM – 7:30 PM",
    ],
    fee: "₹55,000",
    highlights: [
      "Detailed drafting of company resolutions and agendas",
      "Interpretation of corporate statutes and secretarial audits",
      "Cumulative testing and legal essay-writing practices",
    ],
    syllabus: [
      {
        title: "Group 1",
        topics: [
          "Jurisprudence, Interpretation & General Laws",
          "Company Law & Practice",
          "Setting Up of Business Entities and Industrial Laws",
        ],
      },
      {
        title: "Group 2",
        topics: [
          "Corporate Accounting and Financial Management",
          "Capital Markets & Securities Laws",
          "Tax Laws & Practice (Direct & Indirect)",
        ],
      },
    ],
    facultyIds: ["priya-sharma", "rajesh-kumar"],
    faqs: [
      {
        question: "Are corporate secretarial drafts taught?",
        answer: "Yes, we teach practical drafting of corporate resolutions, minutes, and petition formatting.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cs-foundation", "cs-professional"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CS Executive course. Please share complete details.",
  },
  {
    id: "cs-professional",
    slug: "cs-professional",
    title: "CS Professional Advanced Program",
    shortTitle: "CS Professional",
    tagline: "Master corporate restructuring, multi-disciplinary disputes, and advanced drafting",
    description:
      "Prepare for the final phase of the ICSI syllabus. Our course covers Corporate Restructuring, Valuation, Environmental Social Governance (ESG), Secretarial Audit, and Multi-disciplinary Case Studies with expert legal advice.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "CS Executive cleared",
    duration: "10 Months",
    batchTimings: [
      "Morning Batch: 7:30 AM – 10:00 AM",
      "Weekend Batch: 9:00 AM – 5:00 PM",
    ],
    fee: "₹70,000",
    highlights: [
      "Case study workshops on corporate insolvency and merger disputes",
      "Advanced drafting of agreements and petitions",
      "ESG and Corporate Social Responsibility compliance analysis",
    ],
    syllabus: [
      {
        title: "Core Modules",
        topics: [
          "Environmental, Social and Governance (ESG) Principles",
          "Drafting, Pleading and Appearances",
          "Compliance Management, Board Audit and Due Diligence",
          "Corporate Restructuring, Valuation and Insolvency",
        ],
      },
    ],
    facultyIds: ["priya-sharma"],
    faqs: [
      {
        question: "Do you offer placement guidance?",
        answer: "Yes, we guide qualified company secretaries with mock interviews and connect them to leading law firms.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cs-executive"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CS Professional course. Please share complete details.",
  },

  // ─── CMA COURSES ───────────────────────────────────────────────────────────
  {
    id: "cma-foundation",
    slug: "cma-foundation",
    title: "CMA Foundation Prep",
    shortTitle: "CMA Foundation",
    tagline: "Build a solid base in cost accounting, mathematics, and business economics",
    description:
      "Our CMA Foundation preparation course is designed to guide students through cost accounting basics, commercial laws, and quantitative techniques. Mentored by cost accountants, this course guarantees high scores and builds an analytical mindset.",
    image: images.courses.cma,
    category: "commerce",
    eligibility: "Class 12 passed or appeared students",
    duration: "4 Months",
    batchTimings: [
      "Morning Batch: 9:00 AM – 12:00 PM",
      "Evening Batch: 4:00 PM – 7:00 PM",
    ],
    fee: "₹22,000",
    highlights: [
      "Mentoring by Cost & Management Accountant professionals",
      "Syllabus-aligned printed notes and study guides",
      "Continuous assignments and cumulative performance trackers",
    ],
    syllabus: [
      {
        title: "Course Curriculum",
        topics: [
          "Fundamentals of Business Laws & Ethics",
          "Fundamentals of Financial & Cost Accounting",
          "Fundamentals of Business Mathematics & Statistics",
          "Fundamentals of Business Economics & Management",
        ],
      },
    ],
    facultyIds: ["amit-verma", "rajesh-kumar"],
    faqs: [
      {
        question: "Is cost accounting the main focus of this level?",
        answer: "Yes, cost accounting fundamentals are introduced here to prepare you for Intermediate costing.",
      },
    ],
    successStories: ["deepak-cma-top"],
    relatedCourseIds: ["cma-intermediate", "ca-foundation"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CMA Foundation course. Please share complete details.",
  },
  {
    id: "cma-intermediate",
    slug: "cma-intermediate",
    title: "CMA Intermediate Program",
    shortTitle: "CMA Intermediate",
    tagline: "Master cost bookkeeping, financial management, and direct tax compliance",
    description:
      "CMA Intermediate syllabus focuses on advanced cost accounting, financial management, commercial laws, and corporate taxation. Under CMA Amit Verma, students master costing formulas and numerical problem-solving speed.",
    image: images.courses.cma,
    category: "commerce",
    eligibility: "CMA Foundation cleared or Direct Entry graduates",
    duration: "8 Months",
    batchTimings: [
      "Regular Batch: 9:30 AM – 3:30 PM",
      "Weekend Batch: 10:00 AM – 6:00 PM",
    ],
    fee: "₹52,000",
    highlights: [
      "Cost bookkeeping, overhead allocations and marginal costing guides",
      "Commercial laws, contracts and factory audits training",
      "Tax calculations and mock returns filing workshops",
    ],
    syllabus: [
      {
        title: "Group 1",
        topics: [
          "Business Laws and Ethics",
          "Financial Accounting",
          "Direct and Indirect Taxation",
        ],
      },
      {
        title: "Group 2",
        topics: [
          "Operations Management & Strategic Management",
          "Cost and Management Accounting & Financial Management",
          "Corporate Accounting & Auditing",
        ],
      },
    ],
    facultyIds: ["amit-verma", "rajesh-kumar"],
    faqs: [
      {
        question: "Do you cover marginal costing in detail?",
        answer: "Yes, marginal costing, standard variance analysis, and budget ratios are covered thoroughly.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cma-foundation", "cma-final"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CMA Intermediate course. Please share complete details.",
  },
  {
    id: "cma-final",
    slug: "cma-final",
    title: "CMA Final Advanced Coaching",
    shortTitle: "CMA Final",
    tagline: "Strategic cost management, strategic financial management, and cost audits",
    description:
      "Our CMA Final course focuses on corporate financial strategies, valuation, cost audits, and corporate tax laws. This program ensures you possess the technical cost optimization skills needed for corporate management.",
    image: images.courses.cma,
    category: "commerce",
    eligibility: "CMA Intermediate cleared & completed training",
    duration: "10 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 10:30 AM",
      "Weekend Batch: 9:00 AM – 5:00 PM",
    ],
    fee: "₹68,000",
    highlights: [
      "Strategic Cost Management (SCM) real case evaluations",
      "Cost and Management Audit guidelines from ICMAI",
      "Valuation models and financial risk analysis",
    ],
    syllabus: [
      {
        title: "Group 3 & 4 Papers",
        topics: [
          "Corporate Laws & Compliance",
          "Strategic Financial Management (SFM)",
          "Strategic Cost Management - Decision Making",
          "Direct Tax Laws & International Taxation",
          "Cost & Management Audit",
        ],
      },
    ],
    facultyIds: ["amit-verma"],
    faqs: [
      {
        question: "What is a cost audit?",
        answer: "Cost audit is the verification of cost records to ensure company cost accounting compliance, taught by CMA Amit Verma.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cma-intermediate"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CMA Final course. Please share complete details.",
  },

  // ─── SCIENCE COURSES ───────────────────────────────────────────────────────
  {
    id: "iit-jee-mains",
    slug: "iit-jee-mains",
    title: "IIT JEE Mains Program",
    shortTitle: "JEE Mains",
    tagline: "Build strong concept foundations in Physics, Chemistry, and Math for JEE Mains",
    description:
      "A structured program to prepare engineering aspirants for the JEE Mains exam. Mentored by Physics and Math experts, we focus on rigorous numerical problem-solving, formula applications, and speed-solving methods.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "Class 11 / Class 12 students or repeaters",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 4:00 PM – 7:30 PM",
      "Regular Batch: 9:00 AM – 1:00 PM",
    ],
    fee: "₹85,000",
    highlights: [
      "Expert Physics, Chemistry, and Mathematics coaching",
      "Daily Practice Problems (DPPs) with video explanations",
      "Detailed CBT mock tests on custom JEE pattern",
      "Doubt clearing classes 6 days a week",
    ],
    syllabus: [
      {
        title: "Physics & Chemistry Core",
        topics: [
          "Mechanics & Electromagnetism",
          "Organic & Inorganic Chemistry",
          "Physical Chemistry & Thermodynamics",
        ],
      },
      {
        title: "Mathematics Core",
        topics: [
          "Calculus & Coordinate Geometry",
          "Algebra & Trigonometry",
          "Probability & Vectors",
        ],
      },
    ],
    facultyIds: ["vikram-singh"],
    faqs: [
      {
        question: "Do you provide test analysis sheets?",
        answer: "Yes, every CBT test has automatic analysis mapping correct/incorrect answers and solving time.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["iit-jee-advanced", "class-12-science"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the IIT JEE Mains course. Please share complete details.",
  },
  {
    id: "iit-jee-advanced",
    slug: "iit-jee-advanced",
    title: "IIT JEE Advanced Program",
    shortTitle: "JEE Advanced",
    tagline: "High-level concept integration and multi-concept questions training",
    description:
      "An intensive preparation program focusing on multi-concept JEE Advanced problems. Students develop deep problem-solving skills, tackling complex mechanics, organic synthesis, and advanced calculus calculations.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "JEE Mains qualified or high performers",
    duration: "1 Year",
    batchTimings: [
      "Regular Batch: 8:00 AM – 2:00 PM",
      "Weekend Intensive: 9:00 AM – 6:00 PM",
    ],
    fee: "₹95,000",
    highlights: [
      "Focus on multi-concept problems and advanced derivations",
      "Weekly subjective tests with examiner evaluations",
      "Formulas cheat-sheets and speed-run modules",
    ],
    syllabus: [
      {
        title: "Advanced Syllabus",
        topics: [
          "Rotational Mechanics & Wave Optics",
          "Coordination Compounds & Organic Mechanisms",
          "Integral Calculus & Matrices/Determinants",
        ],
      },
    ],
    facultyIds: ["vikram-singh"],
    faqs: [
      {
        question: "How are doubt sessions organized?",
        answer: "Doubt sessions are small groups with individual mentors where students bring difficult JEE Advanced problems.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["iit-jee-mains"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the IIT JEE Advanced course. Please share complete details.",
  },
  {
    id: "neet",
    slug: "neet",
    title: "NEET Medical Preparation",
    shortTitle: "NEET Prep",
    tagline: "Comprehensive Physics, Chemistry, and Biology (Botany & Zoology) coaching",
    description:
      "Our NEET program prepares students for medical entrance exams. The curriculum focuses on NCERT Biology diagrams, botanical taxonomy, chemical equations, and organic reactions, guaranteeing conceptual mastery.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "Class 11 / Class 12 biology students",
    duration: "1 Year",
    batchTimings: [
      "Morning Batch: 8:30 AM – 1:00 PM",
      "Evening Batch: 3:30 PM – 7:30 PM",
    ],
    fee: "₹82,000",
    highlights: [
      "Rigorous Biology, Chemistry, and Physics coaching",
      " एनसीईआरटी (NCERT) line-by-line detailed explanation classes",
      "NCERT diagram sheets and botanical specimen reviews",
      "Regular online mock tests on NTA NEET pattern",
    ],
    syllabus: [
      {
        title: "Biology Core (Botany & Zoology)",
        topics: [
          "Plant Physiology & Genetics",
          "Human Anatomy & Reproduction",
          "Ecology & Evolution",
        ],
      },
      {
        title: "Physics & Chemistry Core",
        topics: [
          "NCERT Physics Numeric Problems",
          "Organic Chemistry naming reactions",
          "Inorganic periodic table classifications",
        ],
      },
    ],
    facultyIds: ["vikram-singh"],
    faqs: [
      {
        question: "Is NCERT fully covered?",
        answer: "Yes, our notes are based on the NCERT textbook, which is critical for NEET Biology.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-science"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the NEET preparation course. Please share complete details.",
  },

  // ─── SCHOOL COACHING COURSES ────────────────────────────────────────────────
  {
    id: "class-9",
    slug: "class-9",
    title: "Class 9 Comprehensive Tuition",
    shortTitle: "Class 9",
    tagline: "Build a strong academic foundation in Mathematics, Science, and English",
    description:
      "Our Class 9 coaching program focuses on developing deep conceptual clarity in major school subjects, preparing students for board classes, NTSE, and Olympiads. Through customized teaching plans, we ensure academic stress is reduced while performance is maximized.",
    image: images.courses.class9,
    category: "academic",
    eligibility: "Class 8 passed / Class 9 students",
    duration: "1 Year",
    batchTimings: [
      "Batch A: 3:00 PM – 5:00 PM (Mon, Wed, Fri)",
      "Batch B: 5:00 PM – 7:00 PM (Tue, Thu, Sat)",
    ],
    fee: "₹25,000/year",
    highlights: [
      "Experienced secondary school faculty",
      "Comprehensive weekly tests with detailed answer analysis",
      "Personalized feedback sessions and homework assistance",
      "Regular parents-teachers conferences to track progress",
      "Small batch sizes ensuring individual attention",
    ],
    syllabus: [
      {
        title: "Mathematics & Science",
        topics: [
          "Number Systems & Algebra",
          "Geometry & Mensuration",
          "Matter & Atoms",
          "Force, Motion & Gravitation",
          "Tissues & Diversity in Organisms",
        ],
      },
      {
        title: "Social Studies & English",
        topics: [
          "History & Civics",
          "Geography & Economics",
          "English Grammar & Writing Skills",
          "Literature Comprehension",
        ],
      },
    ],
    facultyIds: ["vikram-singh", "anita-mehta"],
    faqs: [
      {
        question: "Does this course cover the CBSE school syllabus?",
        answer: "Yes, our tuition program fully covers CBSE as well as state board curriculums.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-10"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Class 9 Tuition course. Please share complete details.",
  },
  {
    id: "class-10",
    slug: "class-10",
    title: "Class 10 Board Excellence Tuition",
    shortTitle: "Class 10",
    tagline: "Achieve 95%+ in your CBSE Board Examinations with proven board mentors",
    description:
      "A goal-driven academic course designed for Class 10 students. We focus on rigorous NCERT revisions, board answer-writing techniques, and full-length test series to help students secure top marks in CBSE Mathematics, Science, Social Studies, and English.",
    image: images.courses.class10,
    category: "academic",
    eligibility: "Class 9 passed / Class 10 students",
    duration: "1 Year",
    batchTimings: [
      "Batch A: 3:30 PM – 5:30 PM (Tue, Thu, Sat)",
      "Batch B: 5:30 PM – 7:30 PM (Mon, Wed, Fri)",
    ],
    fee: "₹28,000/year",
    highlights: [
      "Rigorous board exam preparation",
      "Past 10 years board paper solving & marking scheme analysis",
      "Full syllabus test series with board examiner reviews",
      "Detailed notes and important questions sheets",
    ],
    syllabus: [
      {
        title: "Mathematics & Science",
        topics: [
          "Quadratic Equations & Trigonometry",
          "Statistics & Probability",
          "Chemical Reactions & Acids",
          "Light, Electricity & Magnetic Effects",
          "Life Processes & Genetics",
        ],
      },
      {
        title: "Social Studies & English",
        topics: [
          "Nationalism in Europe & India",
          "Resources, Manufacturing & Sectors",
          "Democratic Politics & Federalism",
          "Formal Letter Writing & Grammar",
        ],
      },
    ],
    facultyIds: ["vikram-singh", "anita-mehta"],
    faqs: [
      {
        question: "When are the mock board tests conducted?",
        answer: "Full syllabus mock board examinations start in November and continue until February.",
      },
    ],
    successStories: ["shreya-class10-top"],
    relatedCourseIds: ["class-9", "class-11-commerce"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the Class 10 Tuition course. Please share complete details.",
  },
  {
    id: "class-11-commerce",
    slug: "class-11-commerce",
    title: "Class 11 Commerce Board Prep",
    shortTitle: "Class 11 Commerce",
    tagline: "Build a strong foundation in Accountancy, Economics, and Business Studies",
    description:
      "Class 11 is the starting point for Commerce. This course develops fundamentals in Accounting ledgers, journal entries, Microeconomics concepts, and Business Studies basics, ensuring students excel in school assessments.",
    image: images.courses.class11Commerce,
    category: "academic",
    eligibility: "Class 10 passed students entering Commerce stream",
    duration: "1 Year",
    batchTimings: [
      "Batch A: 4:00 PM – 6:00 PM (Mon, Wed, Fri)",
      "Batch B: 4:00 PM – 6:00 PM (Tue, Thu, Sat)",
    ],
    fee: "₹35,000/year",
    highlights: [
      "Expert coaching in Accountancy, Economics, and BST",
      "Conceptual clarity in double entry systems",
      "Numerical practice worksheets and mock tests",
    ],
    syllabus: [
      {
        title: "Accountancy & Economics",
        topics: [
          "Double Entry Bookkeeping & Journal entries",
          "Ledger Posting & Trial Balance",
          "Statistics for Economics",
          "Microeconomics & Consumer Equilibrium",
        ],
      },
      {
        title: "Business Studies",
        topics: [
          "Nature and Purpose of Business",
          "Forms of Business Organizations",
          "Private & Public Enterprises",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "priya-sharma", "amit-verma", "sneha-gupta"],
    faqs: [
      {
        question: "Is this class suited for CBSE board?",
        answer: "Yes, it is fully suited for CBSE, ICSE, and state board commerce programs.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-commerce", "class-11-science"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Class 11 Commerce course. Please share complete details.",
  },
  {
    id: "class-11-science",
    slug: "class-11-science",
    title: "Class 11 Science Board Prep",
    shortTitle: "Class 11 Science",
    tagline: "Master advanced Physics, Chemistry, and Mathematics/Biology concepts",
    description:
      "A conceptual booster program for Class 11 science students. We focus on Physics mechanics, chemical equations, organic elements, and advanced algebra or biology, setting up students for board year success.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "Class 10 passed students entering Science stream",
    duration: "1 Year",
    batchTimings: [
      "Batch A: 4:30 PM – 6:30 PM (Mon, Wed, Fri)",
      "Batch B: 4:30 PM – 6:30 PM (Tue, Thu, Sat)",
    ],
    fee: "₹38,000/year",
    highlights: [
      "In-depth Physics, Chemistry, Math/Bio coaching",
      "NCERT derivations and numerical step analysis",
      "Weekly test sheets and performance evaluations",
    ],
    syllabus: [
      {
        title: "Physics & Chemistry Core",
        topics: [
          "Kinematics, Laws of Motion & Gravitation",
          "Structure of Atoms & Periodic Table",
          "Chemical Bonding & Gases/Liquids",
        ],
      },
      {
        title: "Mathematics / Biology",
        topics: [
          "Sets, Relations & Trigonometric Functions",
          "Sequences, Series & Straight Lines",
          "Cell Biology & Plant Kingdom",
        ],
      },
    ],
    facultyIds: ["vikram-singh"],
    faqs: [
      {
        question: "Do you cover both Math and Biology tracks?",
        answer: "Yes, we have separate batches for PCM (Math track) and PCB (Biology track).",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-science", "class-11-commerce"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Class 11 Science course. Please share complete details.",
  },
  {
    id: "class-12-commerce",
    slug: "class-12-commerce",
    title: "Class 12 Commerce Board Excellence",
    shortTitle: "Class 12 Commerce",
    tagline: "Excel in CBSE Class 12 Boards and secure top scores in Accounts, Economics & BST",
    description:
      "Our Class 12 Commerce coaching program prepares students for the CBSE Board examinations. With rigorous revisions of Partnership Accounts, Company capital ledger balances, Macroeconomics models, and Business Studies case audits, we guide students to top board percentages.",
    image: images.courses.class12Commerce,
    category: "academic",
    eligibility: "Class 11 passed students entering Class 12",
    duration: "1 Year",
    batchTimings: [
      "Regular Batch: 3:30 PM – 5:30 PM (Mon, Wed, Fri)",
      "Intensive Batch: 5:30 PM – 7:30 PM (Tue, Thu, Sat)",
    ],
    fee: "₹38,000/year",
    highlights: [
      "Complete coverage of CBSE Board syllabus",
      "Daily practice assignments and board sample papers",
      "Full syllabus test series with board examiner evaluation",
      "Doubt clearing classes 6 days a week",
    ],
    syllabus: [
      {
        title: "Accountancy & Economics",
        topics: [
          "Partnership Accounts & Goodwill calculations",
          "Share Capital & Debentures Accounting",
          "National Income accounting & Macroeconomics models",
          "Indian Economic Development",
        ],
      },
      {
        title: "Business Studies",
        topics: [
          "Principles of Management & Planning",
          "Organizing, Staffing & Controlling",
          "Financial Markets & Consumer Protection",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "priya-sharma", "amit-verma", "sneha-gupta"],
    faqs: [
      {
        question: "When are board mock tests conducted?",
        answer: "Our mock board series starts in November and runs until the final board exams in March.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-11-commerce", "class-12-science", "cuet"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the Class 12 Commerce course. Please share complete details.",
  },
  {
    id: "class-12-science",
    slug: "class-12-science",
    title: "Class 12 Science Board Excellence",
    shortTitle: "Class 12 Science",
    tagline: "Secure high board marks in Physics, Chemistry, and Mathematics/Biology",
    description:
      "A goal-driven CBSE Class 12 Board program for science stream students. We focus on electric fields, organic reaction mechanisms, calculus integration, genetics, and molecular biology to guarantee top grades.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "Class 11 passed students entering Class 12",
    duration: "1 Year",
    batchTimings: [
      "Batch A: 3:30 PM – 5:30 PM (Tue, Thu, Sat)",
      "Batch B: 5:30 PM – 7:30 PM (Mon, Wed, Fri)",
    ],
    fee: "₹42,000/year",
    highlights: [
      "CBSE syllabus coverage with NCERT solutions",
      "Physics and Chemistry lab practical assistance",
      "Previous 10 years board paper revisions",
    ],
    syllabus: [
      {
        title: "Physics & Chemistry Core",
        topics: [
          "Electrostatics, Current Electricity & Optics",
          "Chemical Kinetics & Coordination Compounds",
          "Organic Aldehydes, Amines & Polymers",
        ],
      },
      {
        title: "Mathematics / Biology",
        topics: [
          "Relations, Functions & Calculus Integration",
          "Vectors, 3D Geometry & Probability",
          "Genetics, Biotechnology & Human Welfare",
        ],
      },
    ],
    facultyIds: ["vikram-singh"],
    faqs: [
      {
        question: "Are mock board exams graded?",
        answer: "Yes, every test is evaluated using official CBSE board marking schemes.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-11-science", "class-12-commerce"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the Class 12 Science course. Please share complete details.",
  },

  // ─── OTHER SPECIAL COURSES ─────────────────────────────────────────────────
  {
    id: "cuet",
    slug: "cuet",
    title: "CUET Prep Batch",
    shortTitle: "CUET",
    tagline: "Secure your seat in top Central Universities with expert domain coaching",
    description:
      "A focused preparation program for the Common University Entrance Test (CUET) domain subjects. Designed to build concept mastery and speed for MCQs, this course covers Accountancy, Economics, Business Studies, Mathematics, and general tests.",
    image: images.courses.cuet,
    category: "commerce",
    eligibility: "Class 12 appeared or passed students",
    duration: "3 Months",
    batchTimings: [
      "Regular Batch: 9:00 AM – 2:00 PM",
      "Crash Course: 8:00 AM – 3:00 PM",
    ],
    fee: "₹18,000",
    highlights: [
      "Special MCQs test series and CBT platform practice",
      "Shortcut tricks for quantitative ability and general test",
      "NCERT syllabus mapping for domain subjects",
    ],
    syllabus: [
      {
        title: "Domain Subjects & General Test",
        topics: [
          "Accountancy Domain MCQs",
          "Economics Domain MCQs",
          "Business Studies Domain MCQs",
          "Quantitative Aptitude & Logical Reasoning",
          "English Language Proficiency Test",
        ],
      },
    ],
    facultyIds: ["sneha-gupta", "rajesh-kumar", "amit-verma", "priya-sharma"],
    faqs: [
      {
        question: "How is the CBT practice conducted?",
        answer: "Students practice on our online portal which simulates the actual NTA CBT interface.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-commerce"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the CUET Prep course. Please share complete details.",
  },
  {
    id: "accountancy",
    slug: "accountancy",
    title: "Accountancy Subject Mastery",
    shortTitle: "Accountancy",
    tagline: "Master journal entries, ledger accounting, and partnership allocations",
    description: "Specialized subject-wise coaching for Accountancy, perfect for board exams and university entrance preparations.",
    image: images.courses.class12Commerce,
    category: "subject",
    eligibility: "Class 11 / Class 12 commerce students",
    duration: "6 Months",
    batchTimings: ["Regular: 4:00 PM – 5:30 PM"],
    fee: "₹15,000",
    highlights: ["Detailed ledgers worksheets", "Chapter-wise revisions"],
    syllabus: [{ title: "Syllabus", topics: ["Double Entry System", "Partnership Ledger", "Company Share Capital"] }],
    facultyIds: ["rajesh-kumar"],
    faqs: [],
    successStories: [],
    relatedCourseIds: ["class-12-commerce"],
    featured: false,
    whatsappMessage: "Hi, I am interested in Accountancy mastery.",
  },
  {
    id: "economics",
    slug: "economics",
    title: "Economics Subject Mastery",
    shortTitle: "Economics",
    tagline: "Conceptual Microeconomics graphs and Macroeconomics models",
    description: "Subject-wise Economics coaching to help students build logical graphing skills and clear board papers.",
    image: images.courses.class12Commerce,
    category: "subject",
    eligibility: "Class 11 / Class 12 students",
    duration: "6 Months",
    batchTimings: ["Regular: 3:00 PM – 4:30 PM"],
    fee: "₹15,000",
    highlights: ["Economics diagram worksheets", "National Income calculations practice"],
    syllabus: [{ title: "Syllabus", topics: ["Consumer Demand", "National Income Accounting", "Budget & Planning"] }],
    facultyIds: ["amit-verma"],
    faqs: [],
    successStories: [],
    relatedCourseIds: ["class-12-commerce"],
    featured: false,
    whatsappMessage: "Hi, I am interested in Economics mastery.",
  },
  {
    id: "business-studies",
    slug: "business-studies",
    title: "Business Studies Subject Mastery",
    shortTitle: "Business Studies",
    tagline: "Management principles and board case study writing guides",
    description: "Thorough Business Studies preparation focusing on board answer writing schemes and case audit skills.",
    image: images.courses.class12Commerce,
    category: "subject",
    eligibility: "Class 11 / Class 12 students",
    duration: "6 Months",
    batchTimings: ["Regular: 5:30 PM – 7:00 PM"],
    fee: "₹14,000",
    highlights: ["Case study sheets", "Flowchart templates"],
    syllabus: [{ title: "Syllabus", topics: ["Principles of Management", "Organizing & Controlling", "Financial Markets"] }],
    facultyIds: ["priya-sharma"],
    faqs: [],
    successStories: [],
    relatedCourseIds: ["class-12-commerce"],
    featured: false,
    whatsappMessage: "Hi, I am interested in Business Studies mastery.",
  },
];

export const getCourseBySlug = (slug: string) =>
  courses.find((c) => c.slug === slug) || null;

export const getFeaturedCourses = () => courses.filter((c) => c.featured);
