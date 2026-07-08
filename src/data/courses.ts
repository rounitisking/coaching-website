import type { Course } from "@/types";
import { images } from "./images";

export const courses: Course[] = [
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
          "Accounting Principles",
          "Preparation of Final Accounts",
          "Partnership Accounts",
          "Indian Contract Act, 1872",
          "Sale of Goods Act, 1930",
          "Companies Act, 2013",
        ],
      },
      {
        title: "Paper 3 & 4: Quantitative Aptitude & Economics",
        topics: [
          "Business Mathematics & Algebra",
          "Logical Reasoning",
          "Statistical Description of Data",
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
    relatedCourseIds: ["class-12-commerce", "accountancy", "economics"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CA Foundation course. Please share complete details.",
  },
  {
    id: "cs",
    slug: "cs",
    title: "CS Preparation Program",
    shortTitle: "CS",
    tagline: "Ace your Company Secretary exams with top legal & corporate experts",
    description:
      "Prepare for Company Secretary exams with a curriculum designed by practicing Company Secretaries and legal scholars. This program focuses deeply on Company Law, Tax Laws, Economic Laws, and Corporate Governance, building the legal analysis skills and presentation structure needed to clear CS exams.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "Class 12 passed or appeared students",
    duration: "6 Months",
    batchTimings: [
      "Morning Batch: 8:30 AM – 11:30 AM",
      "Evening Batch: 4:30 PM – 7:30 PM",
    ],
    fee: "₹42,000",
    highlights: [
      "Mentored by practicing FCS faculty",
      "Deep focus on legal drafting and case law presentation",
      "Chapter-wise assignments and cumulative tests",
      "Updated corporate tax and amendment workshops",
      "Self-study guidelines and legal reading practices",
    ],
    syllabus: [
      {
        title: "Legal & Business Environment",
        topics: [
          "Business Environment & Law",
          "Constitutional & Administrative Law",
          "Law of Torts",
          "Elements of Company Law",
        ],
      },
      {
        title: "Financial & Strategic Management",
        topics: [
          "Fundamentals of Accounting",
          "Financial Management Basics",
          "Corporate Communication",
        ],
      },
    ],
    facultyIds: ["priya-sharma", "rajesh-kumar"],
    faqs: [
      {
        question: "Who will teach corporate laws?",
        answer: "Our Corporate Law segments are taught exclusively by CS Priya Sharma, who is a Fellow Company Secretary (FCS).",
      },
      {
        question: "Do you provide recorded sessions for revision?",
        answer: "Yes, all lectures are recorded and uploaded to our student portal for reference and revision.",
      },
    ],
    successStories: ["meera-cs-top"],
    relatedCourseIds: ["ca-foundation", "business-studies"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CS course. Please share complete details.",
  },
  {
    id: "cma",
    slug: "cma",
    title: "CMA Preparation Program",
    shortTitle: "CMA",
    tagline: "Master Cost & Management Accounting under the guidance of CMA professionals",
    description:
      "Our CMA preparation course aims to prepare students for Cost & Management Accounting exams. The course builds expertise in Cost Accounting, Financial Planning, Auditing, and Corporate Finance. Under CMA Amit Verma, students gain the speed and mathematical clarity required to crack CMA questions.",
    image: images.courses.cma,
    category: "commerce",
    eligibility: "Class 12 passed or appeared students",
    duration: "6 Months",
    batchTimings: [
      "Morning Batch: 9:00 AM – 12:00 PM",
      "Evening Batch: 3:00 PM – 6:00 PM",
    ],
    fee: "₹44,000",
    highlights: [
      "Mentoring by Fellow Cost Accountant (FCMA) faculty",
      "Special worksheets on costing and performance management",
      "Focused guidance on accounting standards and financial analytics",
      "Unlimited mock exams with comprehensive evaluations",
    ],
    syllabus: [
      {
        title: "Cost & Management Accounting Basics",
        topics: [
          "Fundamentals of Cost Accounting",
          "Material, Labor & Overhead Costing",
          "Standard Costing & Marginal Costing",
          "Financial Reporting & Auditing Standards",
        ],
      },
      {
        title: "Commercial Laws & Economics",
        topics: [
          "Laws of Contracts & Sale of Goods",
          "Industrial Laws & Ethics",
          "Microeconomic & Macroeconomic Planning",
        ],
      },
    ],
    facultyIds: ["amit-verma", "rajesh-kumar"],
    faqs: [
      {
        question: "What is the pass rate of CMA batches?",
        answer: "Our CMA batches have consistently achieved over an 85% success rate due to focused coaching.",
      },
    ],
    successStories: ["deepak-cma-top"],
    relatedCourseIds: ["ca-foundation", "accountancy"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CMA course. Please share complete details.",
  },
  {
    id: "cuet",
    slug: "cuet",
    title: "CUET Prep Program (Commerce Domain)",
    shortTitle: "CUET",
    tagline: "Secure admission in Delhi University, SRCC & top universities",
    description:
      "An intensive preparation program for the Common University Entrance Test (CUET). We cover the entire Commerce Domain (Accountancy, Economics, Business Studies), Language test (English), and General Test syllabus. Special focus on NTA exam pattern, speed strategies, and previous year MCQ analysis.",
    image: images.courses.cuet,
    category: "commerce",
    eligibility: "Class 12 Commerce students",
    duration: "4 Months",
    batchTimings: [
      "Weekday Batch: 3:30 PM – 6:30 PM",
      "Weekend Batch: 9:00 AM – 3:00 PM",
    ],
    fee: "₹28,000",
    highlights: [
      "100% coverage of Accountancy, Economics, and BSt domains",
      "Over 50 full-length online CBT mock tests in NTA interface",
      "Advanced MCQ solving tricks and speed shortcuts",
      "Complimentary college application and counseling guidance",
    ],
    syllabus: [
      {
        title: "Domain Subjects (Commerce)",
        topics: [
          "Partnership & Share Capital Accounts",
          "Micro, Macro & Indian Economic Development",
          "Principles & Functions of Management",
          "Financial Markets & Consumer Protection",
        ],
      },
      {
        title: "Language & General Test",
        topics: [
          "English Reading Comprehension & Vocabulary",
          "Quantitative Aptitude & Numeric Ability",
          "Logical & Analytical Reasoning",
          "Current Affairs & GK",
        ],
      },
    ],
    facultyIds: ["sneha-gupta", "rajesh-kumar", "priya-sharma", "amit-verma"],
    faqs: [
      {
        question: "Do you provide online computer-based tests (CBT)?",
        answer: "Yes, our test portal replicates the actual NTA CUET CBT interface for mock tests.",
      },
    ],
    successStories: ["karan-cuet-top"],
    relatedCourseIds: ["class-12-commerce", "accountancy", "economics", "business-studies"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the CUET course. Please share complete details.",
  },
  {
    id: "class-9-tuition",
    slug: "class-9-tuition",
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
    relatedCourseIds: ["class-10-tuition"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Class 9 Tuition course. Please share complete details.",
  },
  {
    id: "class-10-tuition",
    slug: "class-10-tuition",
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
    relatedCourseIds: ["class-9-tuition", "class-11-commerce"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the Class 10 Tuition course. Please share complete details.",
  },
  {
    id: "class-11-commerce",
    slug: "class-11-commerce",
    title: "Class 11 Commerce Masterclass",
    shortTitle: "Class 11 Commerce",
    tagline: "Build a rock-solid foundation in Accountancy, Economics, and Business Studies",
    description:
      "Class 11 is the gateway to commerce. This course focuses on building fundamental commerce concepts from scratch. We cover bookkeeping, ledger entries, basic economic principles, and corporate formats to ensure students are prepared for Class 12 Boards and professional career paths.",
    image: images.courses.class11Commerce,
    category: "academic",
    eligibility: "Class 10 passed students",
    duration: "1 Year",
    batchTimings: [
      "Weekday Batch: 4:00 PM – 7:00 PM",
      "Weekend Batch: 8:00 AM – 1:00 PM",
    ],
    fee: "₹32,000/year",
    highlights: [
      "Covers Accountancy, Economics, and Business Studies",
      "Concept building from scratch - no prior commerce knowledge needed",
      "Weekly numerical practice sessions in Accountancy",
      "Economics graphs and curves drafting sheets",
    ],
    syllabus: [
      {
        title: "Accountancy & Business Studies",
        topics: [
          "Introduction to Accounting & Journal Ledger",
          "Trial Balance & Depreciation",
          "Forms of Business Organizations",
          "Internal Trade & International Business",
        ],
      },
      {
        title: "Economics",
        topics: [
          "Microeconomics: Consumer Behavior, Demand, Supply",
          "Statistics for Economics: Collection & Presentation of Data",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "amit-verma", "priya-sharma"],
    faqs: [
      {
        question: "Can I choose specific subjects instead of all three?",
        answer: "Yes, we also offer individual subject tuitions for Accountancy, Economics, and Business Studies.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-commerce", "accountancy", "economics", "business-studies"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Class 11 Commerce course. Please share complete details.",
  },
  {
    id: "class-12-commerce",
    slug: "class-12-commerce",
    title: "Class 12 Board Commerce Masterclass",
    shortTitle: "Class 12 Commerce",
    tagline: "Achieve 95%+ in Commerce Boards and prepare for professional careers",
    description:
      "Our premier Board prep program for Class 12 Commerce. This course provides comprehensive training in Accountancy, Macroeconomics, Indian Economic Development, and Business Management. We align classroom learning with board guidelines, board marking schemes, and speed strategy mock exams.",
    image: images.courses.class12Commerce,
    category: "academic",
    eligibility: "Class 11 passed students",
    duration: "1 Year",
    batchTimings: [
      "Batch A: 3:30 PM – 6:30 PM (Mon, Wed, Fri)",
      "Batch B: 3:30 PM – 6:30 PM (Tue, Thu, Sat)",
    ],
    fee: "₹35,000/year",
    highlights: [
      "Rigorous board exam preparation",
      "Past 10 years boards papers solved & assessed",
      "Special mock exam series evaluated by board experts",
      "Complimentary CUET domain foundation training",
    ],
    syllabus: [
      {
        title: "Accountancy & Business Studies",
        topics: [
          "Accounting for Partnership Firms & Companies",
          "Analysis of Financial Statements & Cash Flow",
          "Principles & Functions of Management",
          "Business Finance & Marketing",
        ],
      },
      {
        title: "Economics",
        topics: [
          "Macroeconomics: National Income, Money, Banking",
          "Indian Economic Development: Policies & Current Challenges",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "amit-verma", "priya-sharma", "sneha-gupta"],
    faqs: [
      {
        question: "Are mock boards included?",
        answer: "Yes, we conduct 3 rounds of full syllabus board mock exams under real test conditions.",
      },
    ],
    successStories: ["ria-boards-top"],
    relatedCourseIds: ["class-11-commerce", "cuet", "accountancy", "economics", "business-studies"],
    featured: true,
    whatsappMessage: "Hi, I am interested in the Class 12 Commerce course. Please share complete details.",
  },
  {
    id: "accountancy",
    slug: "accountancy",
    title: "Accountancy Subject Tuition",
    shortTitle: "Accountancy",
    tagline: "Master journal entries, balance sheets, and cash flow statements",
    description:
      "A subject-focused tuition program for Class 11 and 12 Commerce students seeking to master Accountancy. Led by CA Rajesh Kumar, this course provides intensive numerical practice, ledger concepts, and transaction analysis worksheets to ensure high marks.",
    image: images.courses.accountancy,
    category: "subject",
    eligibility: "Class 11 / Class 12 Commerce students",
    duration: "1 Year",
    batchTimings: [
      "Class 11: 4:00 PM – 5:30 PM (Mon, Wed, Fri)",
      "Class 12: 5:30 PM – 7:00 PM (Mon, Wed, Fri)",
    ],
    fee: "₹15,000/year",
    highlights: [
      "Led by Senior FCA CA Rajesh Kumar",
      "Intensive bookkeeping and balance sheet numerical practice",
      "Comprehensive worksheets on partnership and cash flows",
      "Regular tests based on school board patterns",
    ],
    syllabus: [
      {
        title: "Class 11 Accountancy Overview",
        topics: [
          "Accounting Equations & Journal Entries",
          "Ledger, Trial Balance & Bank Reconciliation",
          "Depreciation, Provisions & Reserves",
          "Financial Statements of Sole Proprietorship",
        ],
      },
      {
        title: "Class 12 Accountancy Overview",
        topics: [
          "Partnership Accounting & Reconstitution",
          "Issue of Shares & Debentures",
          "Financial Statement Analysis",
          "Cash Flow Statement & Ratio Analysis",
        ],
      },
    ],
    facultyIds: ["rajesh-kumar", "sneha-gupta"],
    faqs: [
      {
        question: "Is there numerical practice in class?",
        answer: "Yes, we solve over 500+ problems in class covering all textbook standards.",
      },
    ],
    successStories: ["ria-boards-top"],
    relatedCourseIds: ["class-11-commerce", "class-12-commerce", "cuet"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Accountancy course. Please share complete details.",
  },
  {
    id: "economics",
    slug: "economics",
    title: "Economics Subject Tuition",
    shortTitle: "Economics",
    tagline: "Build a strong analytical command over micro, macro & development economics",
    description:
      "A dedicated, subject-specific coaching program for Class 11 and 12 Economics. Mentored by CMA Amit Verma, the course guides students through curves, economic graphs, theories of demand-supply, national income, and development indices with high clarity.",
    image: images.courses.economics,
    category: "subject",
    eligibility: "Class 11 / Class 12 Commerce students",
    duration: "1 Year",
    batchTimings: [
      "Class 11: 4:00 PM – 5:30 PM (Tue, Thu, Sat)",
      "Class 12: 5:30 PM – 7:00 PM (Tue, Thu, Sat)",
    ],
    fee: "₹15,000/year",
    highlights: [
      "Mentored by CMA Amit Verma (JNU Alumnus)",
      "Special sessions on graph drafting and analytical reasoning",
      "Macroeconomics numericals & national income formula sheets",
      "Board-oriented answer structuring classes",
    ],
    syllabus: [
      {
        title: "Microeconomics & Statistics",
        topics: [
          "Consumer Equilibrium & Demand Theory",
          "Producer Behavior & Market Forms",
          "Measures of Central Tendency & Dispersion",
          "Correlation & Index Numbers",
        ],
      },
      {
        title: "Macroeconomics & Indian Development",
        topics: [
          "National Income & Related Aggregates",
          "Money, Banking & Government Budget",
          "Development Policies & Reforms since 1991",
          "Current Economic Challenges in India",
        ],
      },
    ],
    facultyIds: ["amit-verma"],
    faqs: [
      {
        question: "Do you cover macro economics numericals?",
        answer: "Yes, we pay special attention to national income and multiplier calculations.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-11-commerce", "class-12-commerce", "cuet"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Economics course. Please share complete details.",
  },
  {
    id: "business-studies",
    slug: "business-studies",
    title: "Business Studies Subject Tuition",
    shortTitle: "Business Studies",
    tagline: "Understand management principles, finance, and commerce operations",
    description:
      "Master Business Studies with CS Priya Sharma. This course focuses on management functions, business organizations, financial markets, and marketing principles, using case-study discussions to prepare students for top board results.",
    image: images.courses.businessStudies,
    category: "subject",
    eligibility: "Class 11 / Class 12 Commerce students",
    duration: "1 Year",
    batchTimings: [
      "Class 11: 5:30 PM – 7:00 PM (Tue, Thu)",
      "Class 12: 7:00 PM – 8:30 PM (Tue, Thu)",
    ],
    fee: "₹12,000/year",
    highlights: [
      "Mentored by CS Priya Sharma (FCS, LL.M.)",
      "Case studies analysis and flowchart study notes",
      "Weekly mock assessments on business planning and case studies",
      "Mock board presentation sessions",
    ],
    syllabus: [
      {
        title: "Class 11 Business Studies Overview",
        topics: [
          "Nature & Purpose of Business",
          "Private, Public & Global Enterprises",
          "Business Services & Emerging Modes",
          "Social Responsibility & Business Ethics",
        ],
      },
      {
        title: "Class 12 Business Studies Overview",
        topics: [
          "Principles & Functions of Management",
          "Business Environment & Planning",
          "Organizing, Staffing, Directing & Controlling",
          "Financial Management & Consumer Protection",
        ],
      },
    ],
    facultyIds: ["priya-sharma"],
    faqs: [
      {
        question: "How do you prepare students for case studies?",
        answer: "We analyze over 300 CBSE board case studies, teaching students how to identify key lines and write structured answers.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-11-commerce", "class-12-commerce", "cuet"],
    featured: false,
    whatsappMessage: "Hi, I am interested in the Business Studies course. Please share complete details.",
  },
];

export const getCourseBySlug = (slug: string) =>
  courses.find((c) => c.slug === slug) || null;

export const getFeaturedCourses = () => courses.filter((c) => c.featured);
