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
      "Our CA Foundation course is designed to build a solid groundwork in Accounting, Law, Quantitative Aptitude, and Economics. Mentored by senior Chartered Accountants, this program provides extensive concept coverage, structured study material, and regular mock tests to ensure success in your first attempt.",
    image: images.courses.caFoundation,
    category: "commerce",
    eligibility: "Class 12 appeared or passed students",
    duration: "6 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 11:30 AM",
      "Evening Batch: 4:00 PM – 7:30 PM",
    ],
    fee: "₹5,499",
    highlights: [
      "Mentoring by experienced CA & FCA faculty",
      "Regular chapter-wise tests & full mock exams",
      "Mercantile law flowchart sheets & key sections study",
      "Special quantitative aptitude speed-building classes",
      "Up-to-date printed study material following ICAI guidelines",
      "Special doubt-clearing sessions 6 days a week",
    ],
    overview: `**Course Overview**
The Chartered Accountancy (CA) Foundation course is the entry-level examination for the prestigious CA course conducted by the Institute of Chartered Accountants of India (ICAI). This program is designed to build a comprehensive foundation in business accounting, mercantile laws, quantitative aptitude, and commercial economics.

**Who Should Join**
- Class 12 commerce and science students wishing to pursue a career in finance, taxation, or auditing.
- Graduates seeking a comprehensive review of fundamental financial accounting principles.
- Professional candidates preparing to enter the corporate financial services industry.

**Learning Outcomes**
- Master fundamental accounting concepts, ledger postings, and preparation of final financial statements.
- Understand commercial and regulatory legal frameworks governing contracts, partnerships, and companies.
- Acquire speed and accuracy in business mathematics, logical reasoning, and statistical data analysis.
- Comprehend micro and macro economic factors affecting market systems and commercial enterprises.

**Course Deliverables**
- **Live Classes & Interactive Lectures**: Daily interactive classes led by CA professionals.
- **Recorded Lectures**: Complete archive of all live sessions for revision and repeat viewing.
- **Course Validity**: 1 Year from the date of enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Leads to CA Intermediate, financial counselor, tax strategist, or accounting analyst roles.`,
    mentorship: `**Mentorship & Performance Tracking**
- **1-on-1 Academic Counseling**: Personal guidance sessions with qualified CAs to map study targets and resolve career doubts.
- **Performance Evaluation**: Weekly dashboards tracking student score progress across mock exams.

**Study Material, Notes & PDFs**
- **ICAI-aligned Printed Kits**: Thoroughly researched study guides, revision charts, and section-wise law mappings.
- **Digital Libraries**: Accessible PDFs containing solved past year papers (2018-2025) and quick revision summaries.

**Exam Prep & Practice Strategy**
- **Daily Practice Papers (DPPs)**: Comprehensive sets of daily assignments to verify understanding of mathematical formulas and ledger entries.
- **Mock Test Series**: 10 full-length simulated exam papers following the exact ICAI exam environment.
- **Doubt Resolution Support**: Dedicated doubt-clearing counters operational 6 days a week (online + offline).`,
    syllabus: [
      {
        title: "Paper 1: Accounting (100 Marks)",
        topics: [
          "Theoretical Framework & Accounting Principles",
          "Accounting Process: Journal, Ledger, Trial Balance, Cash Book",
          "Bank Reconciliation Statement (BRS)",
          "Depreciation Accounting & Valuation of Inventories",
          "Special Transactions: Consignment, Joint Venture, Bills of Exchange",
          "Preparation of Final Accounts: Sole Proprietors, Partnership Firms, NPOs",
          "Company Accounts: Issue of Shares & Debentures",
        ],
      },
      {
        title: "Paper 2: Business Laws (100 Marks)",
        topics: [
          "Indian Contract Act, 1872: Essentials, Performance, Breach",
          "Sale of Goods Act, 1930: Conditions, Warranties, Transfer of Ownership",
          "Indian Partnership Act, 1932: Registration, Dissolution, Relations",
          "Limited Liability Partnership (LLP) Act, 2008",
          "Companies Act, 2013: Incorporation, Share Capital, Memorandum of Association",
          "Regulatory Framework & Writing Skills for Legal Drafting",
        ],
      },
      {
        title: "Paper 3: Quantitative Aptitude (100 Marks)",
        topics: [
          "Business Mathematics: Ratio, Proportion, Indices, Logarithms",
          "Equations: Linear, Quadratic, Matrices",
          "Simple & Compound Interest, Annuities, Time Value of Money",
          "Permutations & Combinations, Sequence & Series",
          "Logical Reasoning: Number Series, Coding-Decoding, Direction Tests, Blood Relations",
          "Statistics: Representation of Data, Central Tendency, Dispersion",
          "Probability & Theoretical Distributions (Binomial, Poisson, Normal)",
        ],
      },
      {
        title: "Paper 4: Business Economics (100 Marks)",
        topics: [
          "Introduction to Business Economics: Scope & Decision Making",
          "Theory of Demand and Supply: Elasticity, Consumer Equilibrium",
          "Theory of Production and Cost: Returns to Scale, Cost Curves",
          "Price Determination in Different Markets: Perfect Competition, Monopoly, Oligopoly",
          "National Income Accounting & Public Finance Policies",
          "International Trade & Money Markets",
          "Business Cycles & Economic Indicators",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
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
    successStories: [],
    relatedCourseIds: ["ca-intermediate"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CA Foundation Program. Please guide me through the admission process.",
  },
  {
    id: "ca-intermediate",
    slug: "ca-intermediate",
    title: "CA Intermediate Program",
    shortTitle: "CA Intermediate",
    tagline: "Advance your CA preparation with comprehensive concepts, revision classes, and mock exams",
    description:
      "Our CA Intermediate course prepares you to tackle Group 1 and Group 2 exams. Guided by senior subject experts, it covers advanced auditing, costing, taxation, law, and corporate finance. Includes evaluation mock tests, detailed study manuals, and doubt counters.",
    image: images.courses.caFoundation,
    category: "commerce",
    eligibility: "CA Foundation cleared or direct entry graduates",
    duration: "10 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 1:30 PM",
      "Afternoon Batch: 2:00 PM – 7:30 PM",
    ],
    fee: "₹9,299",
    highlights: [
      "Expert CA faculty for taxation, costing, and law",
      "Chapter-wise assignments & regular evaluation tests",
      "Extensive taxation practice covers Income Tax & GST",
      "Special mock tests mirroring the latest ICAI pattern",
      "Printed comprehensive books and notes included",
      "Continuous counseling & study planning support",
    ],
    overview: `**Course Overview**
The CA Intermediate course is the second stage of the Chartered Accountancy curriculum. It comprises two groups consisting of core business-related subjects. This program is designed to build professional capability in corporate law, advanced accounting, cost and management accountancy, direct & indirect taxation, financial management, strategic management, auditing, and assurance.

**Who Should Join**
- Students who have cleared the CA Foundation exam.
- Commerce/Science graduates and post-graduates meeting the direct entry requirements of ICAI.
- Financial executives looking to specialize in tax compliance and corporate audit.

**Learning Outcomes**
- Apply advanced financial reporting guidelines and accounting standards to corporate balance sheets.
- Manage compliance frameworks for Income Tax and Goods and Services Tax (GST).
- Calculate product costs, perform process costing, and analyze standard cost variances.
- Conduct corporate audits and draft professional auditing statements.
- Build corporate financial plans, analyze cash flows, and formulate strategic business plans.

**Course Deliverables**
- **Live Classes & Interactive Lectures**: Deep-dive live sessions covering practical calculations and tax returns.
- **Recorded Lectures**: Complete archive of all live sessions for unlimited repeat viewing.
- **Course Validity**: 1.5 Years from the date of enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Qualifies for articleship training, tax compliance associate, junior auditor, or corporate analyst roles.`,
    mentorship: `**Mentorship & Performance Tracking**
- **Articleship Preparation Support**: Guidance on drafting resumes and preparing for interviews at top accounting and advisory firms.
- **Personalized Mentorship**: 1-on-1 doubt resolution meetings with CAs to refine test strategies.
- **Performance Audits**: Monthly performance reviews tracking score trends in mock tests.

**Study Material, Notes & PDFs**
- **Tax Bulletins**: Monthly updates on direct tax amendments, GST circulars, and case law digests.
- **Advanced Costing Registers**: Topic-wise practice workbooks containing over 1,500 numerical questions with ledger steps.

**Exam Prep & Practice Strategy**
- **Group-wise Mock Series**: 8 full-length simulated exam papers per group evaluated by professionals.
- **Chapter-wise Assignments**: Weekly subjective questions for answer-writing practice.
- **Dedicated Doubt-Clearing Desk**: Active online support desk to resolve queries within 24 hours.`,
    syllabus: [
      {
        title: "Group 1 - Paper 1: Advanced Accounting (100 Marks)",
        topics: [
          "Application of Accounting Standards (AS)",
          "Company Accounts: Consolidated Financial Statements, Amalgamation",
          "Reconstruction & Liquidation of Companies",
          "Buyback of Securities & Employee Stock Option Plans (ESOPs)",
          "Financial Statements of Banking & Insurance Companies",
        ],
      },
      {
        title: "Group 1 - Paper 2: Corporate & Other Laws (100 Marks)",
        topics: [
          "Companies Act, 2013: Prospectus, Shares, Debentures, Management",
          "Declaration of Dividend, Accounts of Companies, Audit & Auditors",
          "Limited Liability Partnership (LLP) Act, 2008",
          "General Clauses Act, 1897 & Interpretation of Statutes",
          "Foreign Exchange Management Act (FEMA), 1999 Basics",
        ],
      },
      {
        title: "Group 1 - Paper 3: Taxation (100 Marks)",
        topics: [
          "Section A: Income Tax Law (50 Marks) - Heads of Income, Deductions",
          "Computation of Total Income, TDS/TCS, Filing of ITR",
          "Section B: Goods and Services Tax (GST) (50 Marks) - Supply Concept",
          "Input Tax Credit (ITC), Registration, Invoices, Returns Filing",
        ],
      },
      {
        title: "Group 2 - Paper 4: Cost & Management Accounting (100 Marks)",
        topics: [
          "Material, Labor, and Direct Overhead Costs",
          "Activity Based Costing (ABC) & Job/Batch/Process Costing",
          "Joint & By-Products Costing, Service Costing",
          "Standard Costing & Variance Analysis",
          "Marginal Costing & Budgetary Control Systems",
        ],
      },
      {
        title: "Group 2 - Paper 5: Auditing & Ethics (100 Marks)",
        topics: [
          "Nature, Object, and Scope of Audit",
          "Audit Strategy, Planning, and Programming",
          "Audit Documentation, Evidence, and Internal Controls",
          "Audit Sampling & Analytical Review Procedures",
          "Professional Ethics & Code of Conduct",
        ],
      },
      {
        title: "Group 2 - Paper 6: Financial Management & Strategic Management (100 Marks)",
        topics: [
          "Section A: Financial Management (50 Marks) - Capital Budgeting, Cost of Capital",
          "Capital Structure, Leverage, Dividend Decisions, Working Capital",
          "Section B: Strategic Management (50 Marks) - Strategic Analysis, Choices",
          "Strategy Implementation, Control, and Corporate Restructuring",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Can I prepare for one group at a time?",
        answer: "Yes, our course structure allows you to study and appear for Group 1 and Group 2 either together or sequentially.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["ca-foundation", "ca-final"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CA Intermediate Program. Please guide me through the admission process.",
  },
  {
    id: "ca-final",
    slug: "ca-final",
    title: "CA Final Program",
    shortTitle: "CA Final",
    tagline: "Achieve the ultimate milestone and qualify as a Chartered Accountant",
    description:
      "Our CA Final prep course is designed for corporate professionals and articleship trainees. Mentored by senior FCA experts, it covers advanced financial reporting, strategic management, corporate laws, professional ethics, auditing, and elective papers. Includes mock papers, revisions, and feedback.",
    image: images.courses.caFoundation,
    category: "commerce",
    eligibility: "CA Intermediate cleared and articleship completed/ongoing",
    duration: "12 Months",
    batchTimings: [
      "Early Morning Batch: 6:30 AM – 9:00 AM",
      "Late Evening Batch: 7:00 PM – 9:30 PM",
    ],
    fee: "₹12,799",
    highlights: [
      "Mentored by top FCA and senior corporate consultants",
      "Special weekend batches to accommodate articleship hours",
      "Detailed coverage of Indian Accounting Standards (Ind AS)",
      "Advanced tax planning case-study workshops",
      "Simulated mock exams with direct feedback from evaluators",
      "Career placement support in Big 4 and corporate firms",
    ],
    overview: `**Course Overview**
The CA Final course is the final summit of the Chartered Accountancy journey. This program aims to build strategic financial leaders. It covers complex domains including advanced financial reporting (Ind AS), strategic financial management, advanced auditing, professional ethics, corporate and economic laws, international taxation, and elective specializations.

**Who Should Join**
- Articleship trainees who have cleared both groups of CA Intermediate.
- Finance executives, credit managers, and tax consultants looking to complete their CA certification.
- Professionals preparing for senior audit, compliance, and corporate finance roles.

**Learning Outcomes**
- Master Indian Accounting Standards (Ind AS) and prepare consolidated corporate balance sheets.
- Manage advanced corporate valuations, foreign exchange exposures, and mergers.
- Conduct statutory audits of listed entities under CARO and Indian Companies Act rules.
- Design strategic domestic and international tax frameworks to optimize corporate taxation.
- Handle regulatory matters before appellate tribunals and legal authorities.

**Course Deliverables**
- **Live Classes & Trainee-friendly Timings**: Classes scheduled outside standard office/articleship hours.
- **Recorded Lectures**: Complete archive of all live sessions for unlimited repeat viewing.
- **Course Validity**: 2 Years from the date of enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Qualifies for Senior Manager, Auditor, Partner in accounting firms, CFO, or Tax Consultant roles.`,
    mentorship: `**Mentorship & Corporate Training**
- **Big 4 Placement Prep**: Mock interviews, technical preparation sessions, and resume-building reviews.
- **1-on-1 Strategic Consulting**: Individual guidance with senior FCAs to plan and track subject revisions.
- **Case-Study Workshops**: Practical training solving ICAI case study scenarios.

**Study Material, Notes & PDFs**
- **Ind AS Guides**: Exhaustive reference manuals covering comparative analyses of Ind AS vs AS.
- **Audit Checklist Manuals**: Solved professional standards handbooks and compliance flowcharts.

**Exam Prep & Practice Strategy**
- **Evaluation Mock Exams**: 5 full-length evaluated exams for Group 1 and Group 2.
- **Direct Evaluator Calls**: Individual feedback discussions with paper checkers.
- **Doubt Support**: 24/7 online doubt clearing portal for working candidates.`,
    syllabus: [
      {
        title: "Group 1 - Paper 1: Financial Reporting (100 Marks)",
        topics: [
          "Introduction to Ind AS & Convergence",
          "Ind AS on Assets, Liabilities, and Revenues",
          "Consolidated Financial Statements (Ind AS 110/111/28/103)",
          "Share Based Payments & Financial Instruments",
          "Accounting for Corporate Social Responsibility (CSR)",
        ],
      },
      {
        title: "Group 1 - Paper 2: Advanced Financial Management (100 Marks)",
        topics: [
          "Financial Policy & Corporate Strategy",
          "Security Analysis & Equity Valuation",
          "Portfolio Management & Mutual Funds",
          "Derivatives Analysis: Futures, Options, Swaps",
          "Foreign Exchange Risk Management & International Finance",
          "Mergers, Acquisitions, and Corporate Restructuring",
        ],
      },
      {
        title: "Group 1 - Paper 3: Advanced Auditing, Assurance & Professional Ethics (100 Marks)",
        topics: [
          "Quality Control & Engagement Standards (SAs)",
          "Audit of Group Entities & Consolidated Financial Statements",
          "Audit of Banking, Insurance, and Non-Banking Financial Companies (NBFCs)",
          "Internal Audit, Management Audit, and Operational Audit",
          "Professional Ethics, CA Act 1949, and Code of Conduct",
        ],
      },
      {
        title: "Group 2 - Paper 4: Direct Tax Laws & International Taxation (100 Marks)",
        topics: [
          "Computation of Income of Companies and Trusts",
          "Assessment Procedures, Appeals, Revision, and Settlement",
          "International Taxation: Transfer Pricing, Double Taxation Relief (DTAA)",
          "Base Erosion and Profit Shifting (BEPS) & Non-Resident Taxation",
        ],
      },
      {
        title: "Group 2 - Paper 5: Indirect Tax Laws (100 Marks)",
        topics: [
          "Goods and Services Tax (GST) Act: Liability, Value, Time of Supply",
          "Input Tax Credit (ITC) Rules, Refunds, Job Work",
          "Appeals and Revision under GST Law",
          "Customs Act, 1962: Valuation, Classification, Warehousing, Baggage",
          "Foreign Trade Policy (FTP) Guidelines",
        ],
      },
      {
        title: "Group 2 - Paper 6: Integrated Business Solutions (100 Marks)",
        topics: [
          "Multi-disciplinary Case Studies",
          "Application of Financial Reporting, Strategic Management, and Corporate Laws",
          "Risk Management & Corporate Governance Policies",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Do you offer mock interview practice?",
        answer: "Yes, our placement team schedules mock interviews with HR directors from Big 4 firms to prepare you for job placements.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["ca-intermediate"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CA Final Program. Please guide me through the admission process.",
  },

  // ─── CS COURSES ────────────────────────────────────────────────────────────
  {
    id: "cs-foundation",
    slug: "cs-foundation",
    title: "CS CSEET Preparation",
    shortTitle: "CS CSEET",
    tagline: "Begin your corporate secretaryship journey with our CSEET coaching program",
    description:
      "Prepare for the CS Executive Entrance Test (CSEET) with qualified Company Secretaries. Covers legal aptitude, logical reasoning, business communication, and current affairs. Includes regular CBT mock tests, current affairs bulletins, and law notes.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "Class 12 appeared or passed students",
    duration: "3 Months",
    batchTimings: [
      "Morning Batch: 9:00 AM – 11:30 AM",
      "Evening Batch: 5:00 PM – 7:30 PM",
    ],
    fee: "₹4,299",
    highlights: [
      "Mentoring by practicing Company Secretaries",
      "Regular computer-based mock tests replicating the ICSI exam",
      "Legal aptitude chart maps & vocabulary builders",
      "Daily current affairs bulletins & quizzes",
      "Detailed study material and mock questions included",
      "Continuous mock evaluation & counseling support",
    ],
    overview: `**Course Overview**
The Company Secretary Executive Entrance Test (CSEET) is the mandatory entry-level examination for students seeking to register for the CS Executive Program conducted by the Institute of Company Secretaries of India (ICSI). This program is designed to build foundational skills in business communication, legal aptitude, logical reasoning, business economics, and current affairs.

**Who Should Join**
- Class 12 passed or appeared candidates aiming to become Company Secretaries.
- Undergraduate students looking for professional corporate governance pathways.
- Aspiring legal and regulatory compliance officers.

**Learning Outcomes**
- Master English grammar, corporate communication styles, and writing business correspondence.
- Understand basic constitutional law, elements of contract law, and company administration.
- Acquire analytical thinking, coding-decoding, and verbal reasoning skills.
- Comprehend demand-supply dynamics, national income, and basic banking processes.
- Stay updated with latest government initiatives, business summits, and socio-political news.

**Course Deliverables**
- **Live Classes & Interactive Lectures**: Concept-oriented live sessions focusing on logical puzzles and legal concepts.
- **Recorded Lectures**: Complete archive of all live sessions for unlimited repeat viewing.
- **Course Validity**: 6 Months from the date of enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Qualifies for direct entry into the CS Executive stage.`,
    mentorship: `**Mentorship & Exam Strategies**
- **Mock CBT Simulations**: Practice on a computer-based test platform replicating the exact ICSI exam environment.
- **1-on-1 Guidance**: Counselors help manage mock schedules and review weak sections.
- **Current Affairs Bulletins**: Monthly PDF guides compiling all relevant news.

**Study Material, Notes & PDFs**
- **Legal Aptitude Flowcharts**: Visual guides mapping the Constitution of India and basic laws.
- **Language Worksheets**: Vocabulary and grammar practice booklets with over 500 solved exercises.

**Exam Prep & Practice Strategy**
- **Daily Quiz Series**: Quick daily evaluation tests to build recall.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.`,
    syllabus: [
      {
        title: "Paper 1: Business Communication (50 Marks)",
        topics: [
          "English Grammar and its Usage: Parts of Speech, Vocabulary, Synonyms",
          "Common Errors in English & Sentence Correction",
          "Business Correspondence: Letters, Memos, Email Etiquettes",
          "Concept of Communication: Types, Barriers, and Listening Skills",
        ],
      },
      {
        title: "Paper 2: Legal Aptitude & Logical Reasoning (50 Marks)",
        topics: [
          "Constitution of India: Preamble, Fundamental Rights, Directive Principles",
          "Elements of Law of Torts & Indian Contract Act, 1872",
          "Elements of Company Law: Types of Companies, Directors, Board Meetings",
          "Logical Reasoning: Syllogisms, Analogy, Venn Diagrams, Coding-Decoding",
          "Verbal & Non-Verbal Reasoning Puzzles",
        ],
      },
      {
        title: "Paper 3: Economic & Business Environment (50 Marks)",
        topics: [
          "Micro Economics: Demand, Supply, Market Structures",
          "Macro Economics: National Income, Union Budget, Indian Financial Markets",
          "Business Environment: Government Policies, Start-Up India, Make in India",
          "Key Regulatory Bodies: RBI, SEBI, CCI, IBBI",
        ],
      },
      {
        title: "Paper 4: Current Affairs & Quantitative Aptitude (50 Marks)",
        topics: [
          "Current Affairs of National and International Importance",
          "Basic Arithmetic: Ratio, Proportion, Percentage, Interest",
          "Interpretation of Data: Graphs, Tables, and Charts",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "What is the passing criteria for CSEET?",
        answer: "Candidates must secure a minimum of 40% marks in each paper and 50% marks in aggregate to pass.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cs-executive"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CS CSEET Preparation Program. Please guide me through the admission process.",
  },
  {
    id: "cs-executive",
    slug: "cs-executive",
    title: "CS Executive Program",
    shortTitle: "CS Executive",
    tagline: "Build expertise in company law, tax compliance, and corporate governance",
    description:
      "Our CS Executive preparation program prepares you for the Group 1 and Group 2 ICSI examinations. Led by corporate Company Secretaries and legal advisors, it covers advanced company law, direct/indirect taxes, management accounting, and financial management. Includes subjective mock evaluations.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "CSEET cleared or commerce graduates meeting ICSI criteria",
    duration: "9 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 1:00 PM",
      "Afternoon Batch: 1:30 PM – 6:30 PM",
    ],
    fee: "₹4,299",
    highlights: [
      "Mentoring by qualified CS & FCS faculty",
      "Regular answer-writing evaluations for subjective law papers",
      "Direct & Indirect tax calculations workshops",
      "Simulated mock exam series evaluated by professionals",
      "Printed comprehensive books and notes included",
      "Individual performance feedback and doubt sessions",
    ],
    overview: `**Course Overview**
The CS Executive program is the second level of the Company Secretary professional certification. It establishes legal compliance skills. It covers company administration, corporate law, direct and indirect taxation, security laws, economic laws, cost accounting, financial management, and corporate reporting.

**Who Should Join**
- Candidates who have successfully cleared the CSEET exam.
- Commerce/Law graduates eligible for direct entry as per ICSI guidelines.
- Compliance assistants looking to specialize in corporate secretarial audits.

**Learning Outcomes**
- Interpret company law provisions and draft agenda, resolutions, and minutes of board meetings.
- Apply compliance procedures under FEMA, Competition Act, and Environmental Protection laws.
- Master security listing processes, SEBI regulations, and stock exchange disclosures.
- Direct corporate compliance audits and file ICSI annual returns.
- Evaluate capital budget investments and design capital structures.

**Course Deliverables**
- **Live Classes & Subjective Answer Reviews**: Interactive sessions focused on drafting corporate resolutions.
- **Recorded Lectures**: Complete archive of all live sessions for unlimited repeat viewing.
- **Course Validity**: 1.5 Years from the date of enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Qualifies for corporate secretarial trainee, compliance executive, or corporate legal consultant roles.`,
    mentorship: `**Mentorship & Writing Workshops**
- **Answer-Writing Drills**: Regular training sessions to master structuring legal arguments and citing sections.
- **1-on-1 Doubt Counters**: Personal review sessions with Company Secretaries.
- **Performance Evaluation**: Comprehensive evaluation reports detailing improvement areas.

**Study Material, Notes & PDFs**
- **Corporate Resolution Workbooks**: Practical drafting templates for board meetings and minutes.
- **SEBI Guidebooks**: Updated modules covering security law modifications.

**Exam Prep & Practice Strategy**
- **Simulated Test Series**: 10 subjective mock papers per group evaluated by professional Company Secretaries.
- **Doubt Resolution Support**: Daily counters to resolve queries within 24 hours.`,
    syllabus: [
      {
        title: "Group 1 - Paper 1: Jurisprudence, Interpretation & General Laws (100 Marks)",
        topics: [
          "Sources of Law, Constitution of India, Civil Procedure Code (CPC)",
          "Criminal Procedure Code (CrPC), Indian Penal Code (IPC)",
          "Law of Evidence, Indian Stamp Act, 1899",
          "Arbitration and Conciliation Act, 1996, Right to Information (RTI) Act",
        ],
      },
      {
        title: "Group 1 - Paper 2: Company Law & Practice (100 Marks)",
        topics: [
          "Principles of Company Law: Share Capital, Debt, Deposits",
          "Management & Administration: Directors, KMP, Board Meetings",
          "General Meetings: Notice, Resolutions, Proxies, Minutes",
          "Corporate Restructuring, Amalgamation, and Winding Up",
        ],
      },
      {
        title: "Group 1 - Paper 3: Setting Up of Business Entities & Industrial Laws (100 Marks)",
        topics: [
          "Setting Up of Business: Selection of Entity, Registration, Licenses",
          "Joint Ventures, LLPs, and Startup Registration",
          "Industrial & Labor Laws: Factories Act, Minimum Wages, EPF Act, ESI Act",
          "Environmental Laws & Approvals",
        ],
      },
      {
        title: "Group 1 - Paper 4: Corporate Accounting & Financial Management (100 Marks)",
        topics: [
          "Corporate Accounting: Issue of Shares, Debentures, Financial Statements",
          "Valuation of Shares & Business Valuation Standards",
          "Financial Management: Capital Budgeting, Capital Structure, Ratio Analysis",
          "Working Capital Management & Portfolio Analysis",
        ],
      },
      {
        title: "Group 2 - Paper 5: Capital Markets & Securities Laws (100 Marks)",
        topics: [
          "Capital Market Instruments, Stock Exchanges, and Depositories",
          "SEBI (LODR) Regulations, SEBI (ICDR) Regulations",
          "Insider Trading Regulations & Mutual Funds Guidelines",
          "Takeover Code & Buyback of Securities",
        ],
      },
      {
        title: "Group 2 - Paper 6: Economic, Commercial & Intellectual Property Laws (100 Marks)",
        topics: [
          "FEMA & Foreign Contributions Regulation Act (FCRA)",
          "Competition Law, Consumer Protection, and Real Estate (RERA) Laws",
          "Prevention of Money Laundering Act (PMLA) & Benami Transactions Act",
          "Intellectual Property Rights: Patents, Trademarks, Copyrights",
        ],
      },
      {
        title: "Group 2 - Paper 7: Tax Laws & Practice (100 Marks)",
        topics: [
          "Part 1: Direct Taxes (50 Marks) - Heads of Income, Corporate Tax",
          "Part 2: Indirect Taxes (50 Marks) - GST Compliance, Customs Law, FTP",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is the exam subjective or objective?",
        answer: "The exam consists of a blend of subjective and objective papers according to the revised ICSI syllabus.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cs-foundation", "cs-professional"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CS Executive Program. Please guide me through the admission process.",
  },
  {
    id: "cs-professional",
    slug: "cs-professional",
    title: "CS Professional Program",
    shortTitle: "CS Professional",
    tagline: "Achieve the corporate governance summit and qualify as a Company Secretary",
    description:
      "Prepare for the final stage of CS. Mentored by senior legal practitioners, this course covers corporate restructuring, secretarial audit, corporate funding, economic laws, and professional ethics. Includes practice case studies and subjective mock tests.",
    image: images.courses.cs,
    category: "commerce",
    eligibility: "CS Executive cleared candidates",
    duration: "10 Months",
    batchTimings: [
      "Early Morning Batch: 6:30 AM – 9:00 AM",
      "Late Evening Batch: 7:00 PM – 9:30 PM",
    ],
    fee: "₹4,299",
    highlights: [
      "Mentoring by senior Company Secretaries and corporate advisors",
      "Subjective drafting workshops & case-study evaluations",
      "Focus on Secretarial Audit and corporate restructurings",
      "Corporate funding mock trials & fund-raising analysis",
      "Comprehensive mock test evaluations and direct counselor feedback",
      "Big 4 & corporate interview prep workshops",
    ],
    overview: `**Course Overview**
The CS Professional Program is the final level of the Company Secretary qualification. This course prepares students for board advisory roles. It covers secretarial audits, professional ethics, corporate restructuring, valuation, corporate funding, listing, strategic management, multi-disciplinary case studies, and corporate tax planning.

**Who Should Join**
- Students who have cleared the CS Executive stage.
- Compliance managers wishing to complete their Company Secretary qualifications.
- Corporate lawyers wanting specialized credentials in corporate governance.

**Learning Outcomes**
- Direct corporate secretarial audits and verify legal compliance check registers.
- Advise the Board on corporate restructurings, amalgamations, and valuations.
- Manage domestic and international corporate funding, equity listings, and private equity deals.
- Interpret complex corporate governance guidelines and code of conduct policies.
- Formulate strategic compliance and tax plans for multinational entities.

**Course Deliverables**
- **Live Classes & Practice Workshops**: Advanced drafting classes and case study analyses.
- **Recorded Lectures**: Complete archive of all live sessions for unlimited repeat viewing.
- **Course Validity**: 2 Years from the date of enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Qualifies for corporate Company Secretary, Head of Compliance, Legal Advisor, or Corporate Partner roles.`,
    mentorship: `**Mentorship & Board Preparation**
- **Boardroom Mock Sessions**: Interactive role-play sessions simulating Board meetings and corporate filings.
- **1-on-1 Revision Planning**: Expert Company Secretaries structure your revision schedule.
- **Interview & Resume Support**: Mock interviews with corporate HR directors.

**Study Material, Notes & PDFs**
- **Drafting Manuals**: Solved precedents for corporate agreements, shareholder arrangements, and board resolutions.
- **Audit Manuals**: Secretarial audit check registers and compliance logs.

**Exam Prep & Practice Strategy**
- **Professional Evaluated Exams**: 5 subjective mock exams per group evaluated by professional Company Secretaries.
- **Doubt Resolution Support**: 24/7 online doubt clearing portal for articleship trainees.`,
    syllabus: [
      {
        title: "Group 1 - Paper 1: Environmental, Social and Governance (ESG) - Principles & Practice (100 Marks)",
        topics: [
          "Corporate Governance: Legislative Framework, Board Effectiveness",
          "ESG Framework: Business Ethics, Corporate Social Responsibility (CSR)",
          "Risk Management & Internal Control Systems",
          "Sustainability Reporting & Integrated Reporting",
        ],
      },
      {
        title: "Group 1 - Paper 2: Drafting, Pleadings & Appearances (100 Marks)",
        topics: [
          "General Principles of Drafting: Deeds, Conveyancing, Agreements",
          "Drafting of Corporate Agreements: Shareholder Agreements, Joint Ventures",
          "Pleadings: Plaints, Written Statements, Appeals, Petitions",
          "Appearances and Art of Advocacy before Tribunals (NCLT, SAT)",
        ],
      },
      {
        title: "Group 1 - Paper 3: Compliance Management, Board Involving & Secretarial Audit (100 Marks)",
        topics: [
          "Compliance Framework: Audits, Corporate Compliance Registers",
          "Secretarial Audit: Scope, ICSI Auditing Standards",
          "Due Diligence: Mergers, Takeovers, Issue of Securities",
          "Quality Review & Search Reports",
        ],
      },
      {
        title: "Group 2 - Paper 4: Strategic Management & Corporate Finance (100 Marks)",
        topics: [
          "Strategic Management: Formulation, Control, Implementation",
          "Corporate Finance: Valuation, Capital Raising, Debt Syndication",
          "Treasury Management & Financial Derivatives",
          "Behavioral Finance & Corporate Strategy Case Studies",
        ],
      },
      {
        title: "Group 2 - Paper 5: Corporate Restructuring, Valuation & Insolvency (100 Marks)",
        topics: [
          "Corporate Restructuring: Mergers, Demergers, Acquisitions",
          "Business Valuation: Methods, Goodwill, Intangibles, Share Valuation",
          "Insolvency and Bankruptcy Code (IBC) 2016",
          "Cross-Border Insolvency & Corporate Debt Restructuring",
        ],
      },
      {
        title: "Group 2 - Paper 6: Corporate Funding & Listings in Stock Exchanges (100 Marks)",
        topics: [
          "Corporate Funding: Equity, Debt, Private Equity, Venture Capital",
          "Listing of Securities on Indian and Foreign Stock Exchanges",
          "Real Estate Investment Trusts (REITs) & Infrastructure Investment Trusts (InvITs)",
          "Foreign Portfolio Investments (FPI) & GDR/ADR Listings",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is articleship training mandatory?",
        answer: "Yes, you must complete the practical articleship training as prescribed by ICSI to qualify for the membership.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cs-executive"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CS Professional Program. Please guide me through the admission process.",
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
    overview: `**Course Overview**
The Cost and Management Accountancy (CMA) Foundation is the starting point of the CMA curriculum conducted by the Institute of Cost Accountants of India (ICAI-CMA). This course covers business laws, cost accounting, business mathematics, and economics, building solid costing and financial concepts.

**Who Should Join**
- Students wanting to specialize in cost audit, cost control, and corporate finance.
- Class 12 commerce/science candidates pursuing a professional career.

**Learning Outcomes**
- Understand basics of accounting, ledgers, and preparation of final accounts.
- Calculate unit costs and prepare basic cost sheets.
- Master business mathematics, statistics, and probability distributions.
- Understand commercial laws and business ethics principles.

**Course Deliverables**
- **Live Classes & Practice Session**: Daily concept discussions and costing calculation practice.
- **Recorded Lectures**: Complete archive of all live sessions for unlimited repeat viewing.
- **Course Validity**: 1 Year from enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).
- **Career Opportunities**: Entry into CMA Intermediate level.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Academic Support**: Dedicated cost accountants clarify calculations.
- **Study Material**: Comprehensive printed workbooks covering all chapters.
- **Mock Tests**: 5 full-length computer-based mock exams.`,
    syllabus: [
      {
        title: "Paper 1: Fundamentals of Business Laws & Ethics (100 Marks)",
        topics: [
          "Indian Contract Act, 1872: Essentials, Performance",
          "Sale of Goods Act, 1930: Conditions, Warranties",
          "Negotiable Instruments Act, 1881",
          "Business Ethics: Core Values, Corporate Ethical Standards",
        ],
      },
      {
        title: "Paper 2: Fundamentals of Financial & Cost Accounting (100 Marks)",
        topics: [
          "Accounting Principles, Concepts, and Journals",
          "Preparation of Final Accounts & Bank Reconciliation Statements",
          "Fundamentals of Cost Accounting: Elements of Cost, Cost Sheets",
        ],
      },
      {
        title: "Paper 3: Fundamentals of Business Mathematics & Statistics (100 Marks)",
        topics: [
          "Arithmetic: Ratios, Proportions, Simple & Compound Interest",
          "Algebra: Quadratic Equations, AP & GP Series",
          "Statistics: Measures of Central Tendency, Dispersion",
          "Probability: Basic Concepts, Permutations & Combinations",
        ],
      },
      {
        title: "Paper 4: Fundamentals of Business Economics & Management (100 Marks)",
        topics: [
          "Micro Economics: Demand, Supply, Market Structures",
          "Macro Economics: Inflation, National Income, Public Finance",
          "Management Process: Planning, Organizing, Staffing, Leading",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is cost accounting the main focus of this level?",
        answer: "Yes, cost accounting fundamentals are introduced here to prepare you for Intermediate costing.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cma-intermediate"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CMA Foundation Prep. Please guide me through the admission process.",
  },
  {
    id: "cma-intermediate",
    slug: "cma-intermediate",
    title: "CMA Intermediate Prep",
    shortTitle: "CMA Intermediate",
    tagline: "Develop cost auditing, management accounting, and direct tax skills",
    description:
      "Prepare for CMA Intermediate Group 1 and Group 2 exams. Guided by senior Cost Accountants, this course covers management accounting, corporate taxation, financial reporting, and cost auditing. Includes mock evaluations.",
    image: images.courses.cma,
    category: "commerce",
    eligibility: "CMA Foundation cleared or direct entry graduates",
    duration: "9 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 1:30 PM",
      "Evening Batch: 2:00 PM – 7:30 PM",
    ],
    fee: "₹35,000",
    highlights: [
      "Mentoring by Cost & Management Accountants (CMAs)",
      "Intensive costing calculation practice sessions",
      "Evaluated mock test series mirroring the ICAI-CMA pattern",
    ],
    overview: `**Course Overview**
The CMA Intermediate level builds cost management, tax compliance, and strategic financial control skills. It covers financial accounting, laws, direct/indirect taxes, cost accounting, auditing, operations management, and strategic management.

**Who Should Join**
- Students who have cleared CMA Foundation.
- Commerce graduates eligible for direct entry.

**Learning Outcomes**
- Perform standard costing and variance analysis.
- Manage GST compliance and income tax filings.
- Analyze company financial statements and apply accounting standards.
- Plan corporate budgets and manage cash flows.

**Course Deliverables**
- **Live Classes & Practice Session**: Detailed numerical problem solving.
- **Recorded Lectures**: Complete archive of all live sessions for repeat viewing.
- **Course Validity**: 1.5 Years from enrollment.
- **Language of Teaching**: Bilingual (Hindi / English).`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Guidance**: CMAs review study plans and resolve cost accounting doubts.
- **Workbooks**: Detailed practice sheets with over 1,200 solved numerical questions.
- **Mock Tests**: 5 evaluated mock papers per group.`,
    syllabus: [
      {
        title: "Group 1 - Paper 5: Business Laws and Ethics (100 Marks)",
        topics: [
          "Commercial Laws: Contract, Sale of Goods, Partnership",
          "Industrial Laws: Factories, Minimum Wages, EPF Act",
          "Corporate Laws: Companies Act, 2013",
          "Business Ethics and Corporate Governance",
        ],
      },
      {
        title: "Group 1 - Paper 6: Financial Accounting (100 Marks)",
        topics: [
          "Accounting Standards (AS) & Consolidated Reporting",
          "Royalty, Hire Purchase, Branch & Departmental Accounts",
          "Partnership Accounts & Financial Statements of NPOs",
        ],
      },
      {
        title: "Group 1 - Paper 7: Direct and Indirect Taxation (100 Marks)",
        topics: [
          "Income Tax: Heads of Income, Tax Computations, TDS",
          "Indirect Taxes: GST Framework, Input Tax Credit, Customs Law",
        ],
      },
      {
        title: "Group 1 - Paper 8: Cost Accounting (100 Marks)",
        topics: [
          "Material, Labor, Overheads Costing",
          "Cost Accounting Records & Cost Ledger Accounting",
          "Marginal, Standard, and Budgetary Costing Methods",
        ],
      },
      {
        title: "Group 2 - Paper 9: Operations Management & Strategic Management (100 Marks)",
        topics: [
          "Operations Management: Production Planning, Capacity, Scheduling",
          "Strategic Management: Analysis, Choices, Implementation",
        ],
      },
      {
        title: "Group 2 - Paper 10: Corporate Accounting & Auditing (100 Marks)",
        topics: [
          "Corporate Accounting: Issue of Shares, Financial Reporting",
          "Auditing: Scope, Procedures, Audit of Companies, CARO",
        ],
      },
      {
        title: "Group 2 - Paper 11: Financial Management & Business Data Analytics (100 Marks)",
        topics: [
          "Financial Management: Cost of Capital, Capital Budgeting",
          "Business Data Analytics: Data Visualization, Statistics, Tools",
        ],
      },
      {
        title: "Group 2 - Paper 12: Management Accounting (100 Marks)",
        topics: [
          "Transfer Pricing, Activity Based Costing (ABC)",
          "Decision Making Tools, Marginal Costing applications",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is there a computer training requirement?",
        answer: "Yes, ICAI-CMA requires completion of mandatory SAP and computer training before appearing for exams.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cma-foundation", "cma-final"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CMA Intermediate Prep. Please guide me through the admission process.",
  },
  {
    id: "cma-final",
    slug: "cma-final",
    title: "CMA Final Program",
    shortTitle: "CMA Final",
    tagline: "Qualify as a Cost and Management Accountant with advanced strategy and audits",
    description:
      "Prepare for the final stage of the CMA qualification. Covers strategic cost management, corporate financial strategies, tax laws, and cost auditing. Includes practice case studies and full mock exams.",
    image: images.courses.cma,
    category: "commerce",
    eligibility: "CMA Intermediate cleared candidates",
    duration: "10 Months",
    batchTimings: [
      "Early Morning Batch: 6:30 AM – 9:00 AM",
      "Late Evening Batch: 7:00 PM – 9:30 PM",
    ],
    fee: "₹45,000",
    highlights: [
      "Mentoring by senior Cost & Management Accountant professionals",
      "Cost Audit mock reports & compliance practice workshops",
      "Strategic cost optimization case studies",
    ],
    overview: `**Course Overview**
The CMA Final Program is the final milestone in Cost and Management Accountancy. It covers advanced costing, cost audits, strategic tax management, professional valuation, and strategic financial management, preparing you for CFO and cost auditor roles.

**Who Should Join**
- Trainees who have cleared CMA Intermediate.
- Cost accountants wanting professional cost auditing credentials.

**Learning Outcomes**
- Direct cost audits of major industrial units.
- Design strategic cost-control frameworks for manufacturing.
- Manage capital valuations, mergers, and corporate restructuring.
- Design domestic and international corporate tax plans.

**Course Deliverables**
- **Live Classes & Practice Session**: Weekend batches available for working professionals.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 2 Years from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **CFO Case Studies**: Strategic training solving corporate financial management scenarios.
- **Mock Tests**: 5 evaluated mock papers per group.
- **Doubt Support**: 24/7 online doubt clearing portal.`,
    syllabus: [
      {
        title: "Group 3 - Paper 13: Corporate Laws & Compliance (100 Marks)",
        topics: [
          "Companies Act, 2013 compliance and regulations",
          "SEBI Laws, Corporate Governance, Corporate Social Responsibility",
        ],
      },
      {
        title: "Group 3 - Paper 14: Strategic Financial Management (100 Marks)",
        topics: [
          "Investment Decisions, Cost of Capital, Capital Structure",
          "Mergers & Acquisitions, Financial Derivatives, Portfolio Management",
        ],
      },
      {
        title: "Group 3 - Paper 15: Direct Tax Laws & International Taxation (100 Marks)",
        topics: [
          "Corporate Taxation, Assessment, Appeals, Tax Planning",
          "Transfer Pricing, Double Taxation Avoidance Agreements (DTAA)",
        ],
      },
      {
        title: "Group 3 - Paper 16: Strategic Cost Management - Decision Making (100 Marks)",
        topics: [
          "Cost Management: Pricing Decisions, Cost Control, ABC Costing",
          "Strategic Planning: Balance Scorecard, Life Cycle Costing",
        ],
      },
      {
        title: "Group 4 - Paper 17: Cost & Management Audit (100 Marks)",
        topics: [
          "Cost Audit Rules, Compliance, Audit Programs",
          "Management Audit, Operational Audit, Internal Audit Systems",
        ],
      },
      {
        title: "Group 4 - Paper 18: Corporate Financial Reporting (100 Marks)",
        topics: [
          "Indian Accounting Standards (Ind AS) application",
          "Consolidated Financial Statements, Valuation of Shares",
        ],
      },
      {
        title: "Group 4 - Paper 19: Indirect Tax Laws & Practice (100 Marks)",
        topics: [
          "GST Audit, Refund, Appeals, Penalties",
          "Customs Act & Foreign Trade Policy guidelines",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Do you assist with job placement?",
        answer: "Yes, we organize mock placement sessions and coordinate interviews with manufacturing and consulting firms.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["cma-intermediate"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CMA Final Program. Please guide me through the admission process.",
  },

  // ─── SCIENCE COURSES ────────────────────────────────────────────────────────
  {
    id: "iit-jee-mains",
    slug: "iit-jee-mains",
    title: "IIT JEE Mains Prep",
    shortTitle: "JEE Mains",
    tagline: "Build concepts in Physics, Chemistry, and Mathematics for JEE Mains",
    description:
      "Our JEE Mains preparation course builds fundamental analytical and problem-solving skills in Physics, Chemistry, and Mathematics. Led by experienced engineers and senior coaches, it includes regular mock tests and practice question sessions.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "Class 11 & 12 Commerce or Science students",
    duration: "1 Year",
    batchTimings: [
      "Morning Batch: 8:00 AM – 12:00 PM",
      "Evening Batch: 3:30 PM – 7:30 PM",
    ],
    fee: "₹85,000",
    highlights: [
      "Senior IITian faculty for Physics, Chemistry, & Math",
      "Regular chapter-wise assignments & cumulative test series",
      "Exhaustive study material matching the latest NTA guidelines",
    ],
    overview: `**Course Overview**
The Joint Entrance Examination (JEE) Mains is the national level engineering entrance exam conducted by NTA. This course provides comprehensive coverage of the Class 11 and 12 Physics, Chemistry, and Mathematics syllabus, focusing on building strong analytical concepts and objective problem-solving speed.

**Who Should Join**
- Class 11 and 12 Science students wishing to secure admission in top NITs, IIITs, and engineering institutes.

**Learning Outcomes**
- Master fundamental concepts in mechanics, organic chemistry, and calculus.
- Solve objective questions quickly using tricks and formulas.
- Gain confidence through simulated computer-based tests.

**Course Deliverables**
- **Live Classes & Practice**: Daily live classes and problem-solving workshops.
- **Recorded Lectures**: Complete session archive.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Doubt Counters**: Personal doubt clearing counters with subject experts.
- **Workbooks**: Extensive practice sheets containing over 3,000 MCQ questions.
- **Test Series**: 10 full-length simulated computer-based tests.`,
    syllabus: [
      {
        title: "Physics Curriculum",
        topics: [
          "Mechanics: Kinematics, Laws of Motion, Work Energy Power",
          "Thermodynamics, Kinetic Theory of Gases",
          "Electrostatics, Current Electricity, Magnetic Effects of Current",
          "Optics, Modern Physics, Semiconductor Electronics",
        ],
      },
      {
        title: "Chemistry Curriculum",
        topics: [
          "Physical Chemistry: Chemical Bonding, Equilibrium, Atomic Structure",
          "Organic Chemistry: Hydrocarbons, Alcohols, Carbonyl Compounds",
          "Inorganic Chemistry: Periodic Table, p-Block, Coordination Compounds",
        ],
      },
      {
        title: "Mathematics Curriculum",
        topics: [
          "Algebra: Quadratic Equations, Complex Numbers, Matrices",
          "Coordinate Geometry: Straight Lines, Circles, Conic Sections",
          "Calculus: Limits, Continuity, Derivatives, Integrals",
          "Vectors, 3D Geometry, Probability",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is there a computer test portal?",
        answer: "Yes, we provide mock tests on our online portal to replicate the actual CBT exam environment.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["iit-jee-advanced"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the IIT JEE Mains Prep. Please guide me through the admission process.",
  },
  {
    id: "iit-jee-advanced",
    slug: "iit-jee-advanced",
    title: "IIT JEE Advanced Masterclass",
    shortTitle: "JEE Advanced",
    tagline: "Advance your JEE preparation with complex problem-solving and mock exams",
    description:
      "Prepare for the final JEE Advanced stage. Led by expert coaches and IIT alumni, this course focuses on advanced conceptual integration and multi-concept questions in Physics, Chemistry, and Mathematics.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "JEE Mains qualified or high-performing candidates",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 4:00 PM – 8:00 PM",
    ],
    fee: "₹95,000",
    highlights: [
      "Mentoring by senior IIT alumni and subject experts",
      "Advanced problem-solving sessions focusing on subjective and multi-concept questions",
      "Comprehensive test series evaluated by professionals",
    ],
    overview: `**Course Overview**
The JEE Advanced exam is the gateway to the prestigious Indian Institutes of Technology (IITs). This course focuses on solving highly complex, multi-concept questions, refining conceptual depth, and optimizing exam-taking strategy to ensure a top rank.

**Who Should Join**
- Top-performing science candidates preparing for JEE Advanced.

**Learning Outcomes**
- Solve complex physical and mathematical models.
- Apply cross-chapter concepts to tackle integrated questions.
- Manage exam time and negative marking rules.

**Course Deliverables**
- **Live Classes & Practice**: Intensive daily problem-solving classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Guidance**: Individual mentoring sessions with IIT alumni.
- **Practice Sheets**: Advanced question banks with detailed step-by-step solutions.
- **Mock Tests**: 5 full-length evaluated mock papers.`,
    syllabus: [
      {
        title: "Advanced Physics",
        topics: [
          "Mechanics: Rotational Dynamics, Gravitation, Fluid Mechanics",
          "Electromagnetism: Electromagnetic Induction, Alternating Current",
          "Wave Optics & Wave Motion",
          "Modern Physics, Nuclear Physics, Atomic Models",
        ],
      },
      {
        title: "Advanced Chemistry",
        topics: [
          "Physical Chemistry: Chemical Kinetics, Electrochemistry, Thermodynamics",
          "Organic Chemistry: Reaction Mechanisms, Biomolecules, Polymers",
          "Inorganic Chemistry: Metallurgy, Transition Elements, Coordination Compounds",
        ],
      },
      {
        title: "Advanced Mathematics",
        topics: [
          "Calculus: Definite Integrals, Differential Equations",
          "Algebra: Permutations, Combinations, Probability",
          "3D Coordinate Geometry & Vector Algebra",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Does this course cover the Mains syllabus as well?",
        answer: "Yes, JEE Advanced prep naturally covers the entire Mains syllabus in much greater detail.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["iit-jee-mains"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the IIT JEE Advanced Masterclass. Please guide me through the admission process.",
  },
  {
    id: "neet",
    slug: "neet",
    title: "NEET Medical Preparation",
    shortTitle: "NEET Prep",
    tagline: "Crack NEET with intensive Biology, Chemistry, and Physics coaching",
    description:
      "Our NEET preparation course is designed for medical aspirants. Mentored by senior doctors and educators, it covers Biology (Botany & Zoology), Chemistry, and Physics, including detailed anatomical diagrams and mock series.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    category: "academic",
    eligibility: "Class 11 & 12 Science (PCB) students",
    duration: "1 Year",
    batchTimings: [
      "Morning Batch: 8:00 AM – 12:00 PM",
      "Evening Batch: 3:30 PM – 7:30 PM",
    ],
    fee: "₹82,000",
    highlights: [
      "Mentoring by senior medical coaches & biology experts",
      "NCERT-focused test series and printed study guides",
      "Interactive anatomy diagrams and doubt counters",
    ],
    overview: `**Course Overview**
The National Eligibility cum Entrance Test (NEET) is the uniform medical entrance exam conducted by NTA. This course provides extensive coverage of the Physics, Chemistry, and Biology (Botany & Zoology) syllabus, focusing on building strong memory recall and high accuracy.

**Who Should Join**
- Class 11 and 12 Science (PCB) students wishing to secure admission in top MBBS/BDS government colleges.

**Learning Outcomes**
- Master NCERT Biology concepts, classification diagrams, and physiological cycles.
- Solve organic mechanisms and physical chemistry calculations.
- Solve medical entrance level Physics formulas.

**Course Deliverables**
- **Live Classes & Practice**: Daily live classes and diagram workshops.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **Anatomy & Diagram Workshops**: Special classes to master anatomical labeling and diagrams.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.
- **Mock Tests**: 10 full-length simulated mock exams.`,
    syllabus: [
      {
        title: "Biology (Botany & Zoology)",
        topics: [
          "Diversity in Living World & Structural Organization in Plants/Animals",
          "Cell Structure, Functions, and Division",
          "Plant Physiology: Photosynthesis, Respiration, Transport",
          "Human Physiology: Digestion, Circulation, Nervous System",
          "Genetics, Evolution, Biotechnology, and Ecology",
        ],
      },
      {
        title: "Chemistry Curriculum",
        topics: [
          "Physical Chemistry: Equilibrium, Kinetics, Electrochemistry",
          "Organic Chemistry: Hydrocarbons, Biomolecules, Chemistry in Everyday Life",
          "Inorganic Chemistry: Periodic Table, Metallurgy, Coordination Chemistry",
        ],
      },
      {
        title: "Physics Curriculum",
        topics: [
          "Kinematics, Laws of Motion, Work, Energy, Power",
          "Gravitation, Properties of Bulk Matter, Thermodynamics",
          "Electrostatics, Magnetic Effects of Current, Alternating Current",
          "Dual Nature of Radiation, Atoms, Nuclei, Semiconductors",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is NCERT the main focus for Biology?",
        answer: "Yes, NEET Biology questions are highly centered around NCERT textbooks. Our course covers NCERT line-by-line.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["iit-jee-mains"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the NEET Medical Preparation. Please guide me through the admission process.",
  },

  // ─── SCHOOL COACHING ───────────────────────────────────────────────────────
  {
    id: "class-9",
    slug: "class-9",
    title: "Class 9 Tuitions",
    shortTitle: "Class 9",
    tagline: "Build a strong academic foundation in Science, Mathematics, and English",
    description:
      "Our Class 9 coaching program builds strong fundamental concepts in Mathematics, Science, Social Studies, and English. Led by experienced school teachers, it includes regular worksheets, board-preparation habits, and quarterly exams.",
    image: images.courses.class9,
    category: "subject",
    eligibility: "Class 9 students",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 3:30 PM – 6:30 PM",
    ],
    fee: "₹25,000/year",
    highlights: [
      "Mentoring by experienced secondary school teachers",
      "Regular chapter-wise worksheets and feedback sessions",
      "Concept-oriented science experiments and mathematics practice",
    ],
    overview: `**Course Overview**
Class 9 is a critical foundation year. This program covers the CBSE and state board syllabus in Mathematics, Science (Physics, Chemistry, Biology), Social Studies, and English, preparing students to handle Class 10 board concepts easily.

**Who Should Join**
- Class 9 school students wishing to improve academic performance and build strong analytical habits.

**Learning Outcomes**
- Master fundamental algebraic concepts, geometry, and basic statistics.
- Understand motion, atomic structure, and cellular biology basics.
- Write clear and grammatically correct English essays.

**Course Deliverables**
- **Live Classes & Practice**: Daily school syllabus classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Academic Support**: Dedicated tutors clarify school homework and concepts.
- **Worksheets**: Chapter-wise worksheets containing over 1,000 practice questions.
- **Mock Tests**: Regular monthly tests.`,
    syllabus: [
      {
        title: "Mathematics Curriculum",
        topics: [
          "Number Systems, Polynomials, Coordinate Geometry",
          "Linear Equations in Two Variables, Introduction to Euclid's Geometry",
          "Lines and Angles, Triangles, Quadrilaterals, Circles",
          "Heron's Formula, Surface Areas and Volumes, Statistics",
        ],
      },
      {
        title: "Science Curriculum",
        topics: [
          "Matter in Our Surroundings, Is Matter Around Us Pure",
          "Atoms and Molecules, Structure of the Atom",
          "The Fundamental Unit of Life: Cell, Tissues",
          "Motion, Force and Laws of Motion, Gravitation",
          "Work and Energy, Sound, Improvement in Food Resources",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Do you cover the school syllabus in alignment with CBSE?",
        answer: "Yes, our curriculum matches the NCERT guidelines and is aligned with the CBSE syllabus.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-10"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Class 9 Tuitions. Please guide me through the admission process.",
  },
  {
    id: "class-10",
    slug: "class-10",
    title: "Class 10 CBSE Board Preparation",
    shortTitle: "Class 10",
    tagline: "Excellence in Class 10 boards with comprehensive conceptual learning",
    description:
      "Excel in your Class 10 board exams with our structured coaching program. Mentored by experienced board examiners, it covers Mathematics, Science, Social Studies, and English. Includes regular mock boards and answer evaluation.",
    image: images.courses.class10,
    category: "subject",
    eligibility: "Class 10 students",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 4:00 PM – 7:00 PM",
    ],
    fee: "₹28,000/year",
    highlights: [
      "Mentoring by experienced board exam evaluators",
      "Regular mock boards and detailed answer script checking",
      "Printed comprehensive books and past paper folders",
    ],
    overview: `**Course Overview**
The Class 10 board exam is a major academic milestone. This course provides comprehensive coverage of the NCERT syllabus, focusing on board-specific answer writing techniques, time management, and mock evaluation to secure high percentages.

**Who Should Join**
- Class 10 board candidates aiming for high percentages.

**Learning Outcomes**
- Solve board level mathematics questions.
- Write precise scientific explanations and chemical equations.
- Citing appropriate facts in Social Science answers.

**Course Deliverables**
- **Live Classes & Practice**: Daily board curriculum classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **Board Prep Seminars**: Expert tips on paper presentation and scoring.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.
- **Mock Tests**: 3 full-length mock board papers.`,
    syllabus: [
      {
        title: "Mathematics Curriculum",
        topics: [
          "Real Numbers, Polynomials, Pair of Linear Equations",
          "Quadratic Equations, Arithmetic Progressions (AP)",
          "Triangles, Coordinate Geometry, Trigonometry",
          "Applications of Trigonometry, Circles, Areas Related to Circles",
          "Surface Areas and Volumes, Statistics, Probability",
        ],
      },
      {
        title: "Science Curriculum",
        topics: [
          "Chemical Reactions, Acids, Bases, Salts, Metals and Non-Metals",
          "Carbon and its Compounds, Periodic Classification of Elements",
          "Life Processes, Control and Coordination, Reproduction, Heredity",
          "Light: Reflection & Refraction, Human Eye and Colorful World",
          "Electricity, Magnetic Effects of Electric Current, Environment",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Do you conduct mock board exams?",
        answer: "Yes, we conduct 3 full-length mock boards under strict examination conditions to build student confidence.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-9"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the Class 10 CBSE Board Preparation. Please guide me through the admission process.",
  },
  {
    id: "class-11-commerce",
    slug: "class-11-commerce",
    title: "Class 11 Commerce Masterclass",
    shortTitle: "Class 11 Commerce",
    tagline: "Build a strong foundation in Accountancy, Economics, and Business Studies",
    description:
      "Begin your commerce stream with our Class 11 coaching program. Covers Accountancy, Economics, and Business Studies from scratch. Includes detailed double-entry bookkeeping ledgers and macroeconomics curves practice.",
    image: images.courses.class11Commerce,
    category: "subject",
    eligibility: "Class 11 Commerce stream students",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 4:00 PM – 7:00 PM",
    ],
    fee: "₹35,000/year",
    highlights: [
      "Mentoring by experienced commerce and accounting coaches",
      "Regular ledger drafting practice and concept worksheets",
      "Detailed study material and mock questions included",
    ],
    overview: `**Course Overview**
Class 11 introduces core commerce concepts. This program provides deep-dive learning in Accountancy, Business Studies, and Economics, building a strong conceptual framework for Class 12 board preparation.

**Who Should Join**
- Class 11 commerce students wanting to build strong accounting and economic fundamentals.

**Learning Outcomes**
- Understand double-entry bookkeeping, prepare journals, ledgers, and trial balances.
- Understand demand-supply models and consumer behavior.
- Comprehend business structures, trade channels, and management concepts.

**Course Deliverables**
- **Live Classes & Practice**: Daily core commerce classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **Ledger Workshops**: Hands-on ledger preparation and balance sheet sessions.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.
- **Mock Tests**: 5 full-length evaluated mock papers.`,
    syllabus: [
      {
        title: "Accountancy Curriculum",
        topics: [
          "Introduction to Accounting: Meaning, Objectives, Double-Entry",
          "Accounting Equation and Rules of Debit/Credit",
          "Recording Transactions: Journal, Cash Book, Ledger Posting",
          "Bank Reconciliation Statement (BRS) & Trial Balance",
          "Depreciation, Provisions, and Reserves accounting",
          "Preparation of Financial Statements: Trading and P&L Account, Balance Sheet",
        ],
      },
      {
        title: "Economics Curriculum",
        topics: [
          "Statistics for Economics: Data Collection, Presentation, Dispersion",
          "Microeconomics: Consumer Behavior, Demand, Production Functions, Cost",
          "Market Forms: Perfect Competition, Monopoly, Monopolistic",
        ],
      },
      {
        title: "Business Studies Curriculum",
        topics: [
          "Foundation of Business: Industry, Commerce, Forms of Organization",
          "Private, Public, and Global Enterprises",
          "Business Services: Banking, Insurance, Communication",
          "Emerging Modes of Business & Social Responsibility",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is this course aligned with CBSE guidelines?",
        answer: "Yes, our commerce masterclass is fully aligned with the NCERT commerce stream syllabus.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-commerce"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Class 11 Commerce Masterclass. Please guide me through the admission process.",
  },
  {
    id: "class-11-science",
    slug: "class-11-science",
    title: "Class 11 Science Prep",
    shortTitle: "Class 11 Science",
    tagline: "Excel in Class 11 Science with specialized Physics, Chemistry, and Math coaches",
    description:
      "Prepare for Class 11 school exams and competitive engineering/medical exams. Mentored by senior science coaches, it covers advanced Physics, Chemistry, and Mathematics concepts. Includes regular subjective tests and worksheets.",
    image: images.courses.class11Commerce,
    category: "subject",
    eligibility: "Class 11 Science stream students",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 3:30 PM – 7:30 PM",
    ],
    fee: "₹38,000/year",
    highlights: [
      "Senior science coaches and experienced educators",
      "Regular chapter-wise test series and detailed feedback",
      "Comprehensive notes and formula booklets included",
    ],
    overview: `**Course Overview**
Class 11 is a core foundation year for Science stream students. This course covers the CBSE and board curriculum in Physics, Chemistry, and Mathematics, preparing students to handle complex school exams and board concepts.

**Who Should Join**
- Class 11 science students wanting to build strong fundamentals in physical and mathematical models.

**Learning Outcomes**
- Solve equations, coordinates, and algebraic problems.
- Master mechanics, kinematics, and wave motion.
- Understand atomic models, periodic tables, and chemical bonds.

**Course Deliverables**
- **Live Classes & Practice**: Daily core science classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **Formula Workshops**: Special sessions to master derivations and formulas.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.
- **Mock Tests**: Monthly performance reviews and test series.`,
    syllabus: [
      {
        title: "Physics Curriculum",
        topics: [
          "Units and Measurements, Motion in a Straight Line/Plane",
          "Laws of Motion, Work, Energy, and Power",
          "System of Particles and Rotational Motion, Gravitation",
          "Mechanical Properties of Solids/Fluids, Thermodynamics",
        ],
      },
      {
        title: "Chemistry Curriculum",
        topics: [
          "Some Basic Concepts of Chemistry, Structure of Atom",
          "Classification of Elements, Chemical Bonding, States of Matter",
          "Thermodynamics, Equilibrium, Redox Reactions",
          "Hydrogen, s-Block, p-Block, Organic Chemistry fundamentals",
        ],
      },
      {
        title: "Mathematics Curriculum",
        topics: [
          "Sets, Relations and Functions, Trigonometric Functions",
          "Principle of Mathematical Induction, Complex Numbers, Linear Inequalities",
          "Permutations and Combinations, Binomial Theorem, Sequence and Series",
          "Straight Lines, Conic Sections, Limits and Derivatives, Probability",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Does this course cover practical exam concepts?",
        answer: "Yes, we include guidance on laboratory practical concepts and mock viva-voce preparation.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-science"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Class 11 Science Prep. Please guide me through the admission process.",
  },
  {
    id: "class-12-commerce",
    slug: "class-12-commerce",
    title: "Class 12 Commerce Boards Masterclass",
    shortTitle: "Class 12 Commerce",
    tagline: "Secure a top score in Class 12 commerce boards with board examiners",
    description:
      "Our flagship Class 12 board preparation course is designed to secure high scores in Accountancy, Economics, and Business Studies. Led by senior examiners, it includes chapter-wise sample papers and evaluation boards.",
    image: images.courses.class12Commerce,
    category: "subject",
    eligibility: "Class 12 Commerce stream students",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 4:00 PM – 7:00 PM",
    ],
    fee: "₹38,000/year",
    highlights: [
      "Mentoring by senior board examiners & subject experts",
      "Continuous evaluated mock board series with feedback",
      "Exhaustive printed books and board preparation registries",
    ],
    overview: `**Course Overview**
The Class 12 board exam determines college admissions. This course provides comprehensive coverage of the NCERT syllabus in Accountancy, Economics, and Business Studies, focusing on board-specific answer writing techniques and time management.

**Who Should Join**
- Class 12 board candidates aiming for high percentages.

**Learning Outcomes**
- Solve board level partnership and company ledger accounts.
- Master macroeconomics curves and national income calculations.
- Structuring management studies case-study answers.

**Course Deliverables**
- **Live Classes & Practice**: Daily board curriculum classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **Mock Board Exams**: 3 full-length mock board papers.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.
- **Career Counseling**: Placement tips for SRCC and top DU colleges.`,
    syllabus: [
      {
        title: "Accountancy Curriculum",
        topics: [
          "Accounting for Partnership Firms: Goodwill, Admission, Retirement, Death",
          "Accounting for Companies: Share Capital & Debentures",
          "Analysis of Financial Statements: Cash Flow Statement, Ratios",
        ],
      },
      {
        title: "Economics Curriculum",
        topics: [
          "Introductory Macroeconomics: National Income, Money & Banking, Balance of Payments",
          "Indian Economic Development: Policies, Reforms, Challenges",
        ],
      },
      {
        title: "Business Studies Curriculum",
        topics: [
          "Principles and Functions of Management: Planning, Staffing, Directing",
          "Business Finance and Marketing: Financial Markets, Consumer Protection",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Do you provide case studies practice for Business Studies?",
        answer: "Yes, we practice over 500 board level management case studies to help you secure a perfect score.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-11-commerce"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the Class 12 Commerce Boards Masterclass. Please guide me through the admission process.",
  },
  {
    id: "class-12-science",
    slug: "class-12-science",
    title: "Class 12 Science Boards Prep",
    shortTitle: "Class 12 Science",
    tagline: "Excel in Class 12 boards with Physics, Chemistry, and Mathematics coaches",
    description:
      "Prepare for Class 12 school exams and competitive engineering/medical exams. Mentored by senior science coaches, it covers advanced Physics, Chemistry, and Mathematics concepts. Includes regular subjective tests and worksheets.",
    image: images.courses.class12Commerce,
    category: "subject",
    eligibility: "Class 12 Science stream students",
    duration: "1 Year",
    batchTimings: [
      "Evening Batch: 3:30 PM – 7:30 PM",
    ],
    fee: "₹42,000/year",
    highlights: [
      "Senior science coaches and experienced educators",
      "Regular chapter-wise test series and detailed feedback",
      "Comprehensive notes and formula booklets included",
    ],
    overview: `**Course Overview**
Class 12 is a core foundation year for Science stream students. This course covers the CBSE and board curriculum in Physics, Chemistry, and Mathematics, preparing students to handle complex school exams and board concepts.

**Who Should Join**
- Class 12 science students wanting to build strong fundamentals in physical and mathematical models.

**Learning Outcomes**
- Solve equations, coordinates, and algebraic problems.
- Master mechanics, kinematics, and wave motion.
- Understand atomic models, periodic tables, and chemical bonds.

**Course Deliverables**
- **Live Classes & Practice**: Daily core science classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **Formula Workshops**: Special sessions to master derivations and formulas.
- **Doubt Counters**: Rapid support operational online to resolve queries within 24 hours.
- **Mock Tests**: Monthly performance reviews and test series.`,
    syllabus: [
      {
        title: "Physics Curriculum",
        topics: [
          "Electrostatics, Current Electricity, Magnetic Effects of Current",
          "Electromagnetic Induction, Alternating Current, Wave Optics",
          "Dual Nature of Radiation, Atoms, Nuclei, Semiconductors",
        ],
      },
      {
        title: "Chemistry Curriculum",
        topics: [
          "Solutions, Electrochemistry, Chemical Kinetics",
          "d and f-Block Elements, Coordination Compounds",
          "Haloalkanes, Phenols, Ethers, Aldehydes, Ketones, Carboxylic Acids",
        ],
      },
      {
        title: "Mathematics Curriculum",
        topics: [
          "Relations and Functions, Inverse Trigonometric Functions",
          "Matrices, Determinants, Continuity and Differentiability",
          "Integrals, Differential Equations, Vector Algebra, 3D Geometry",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Does this course cover practical exam concepts?",
        answer: "Yes, we include guidance on laboratory practical concepts and mock viva-voce preparation.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-11-science"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Class 12 Science Boards Prep. Please guide me through the admission process.",
  },

  // ─── CRASH COURSES / OTHER ──────────────────────────────────────────────────
  {
    id: "cuet",
    slug: "cuet",
    title: "CUET Prep Masterclass",
    shortTitle: "CUET Prep",
    tagline: "Secure admission to Delhi University, SRCC, and top central universities",
    description:
      "Prepare for the Common University Entrance Test (CUET) with top commerce and science coaches. Covers Section 1 (English Language), Section 2 (Domain Subjects: Accountancy, Economics, Business Studies, Math, Physics), and Section 3 (General Test). Includes CBT mock series.",
    image: images.courses.cuet,
    category: "commerce",
    eligibility: "Class 12 appeared or passed candidates",
    duration: "3 Months",
    batchTimings: [
      "Morning Batch: 8:00 AM – 12:30 PM",
      "Afternoon Batch: 1:30 PM – 6:00 PM",
    ],
    fee: "₹18,000",
    highlights: [
      "Commerce domain preparation led by senior board coaches",
      "CBT mock exam portal mimicking the NTA system",
      "Regular General Test reasoning and quantitative practice",
    ],
    overview: `**Course Overview**
The Common University Entrance Test (CUET) is the national level entrance exam conducted by NTA for admission to undergraduate programs in central universities like Delhi University, BHU, and JNU. This program provides comprehensive preparation across Section 1 (Language), Section 2 (Domain subjects), and Section 3 (General Test).

**Who Should Join**
- Class 12 commerce/science candidates wishing to secure admission in top central colleges like SRCC, LSR, and Hindu.

**Learning Outcomes**
- Solve objective domain questions.
- Master English language comprehension, vocabulary, and grammar.
- Solve general quantitative and logical reasoning puzzles quickly.

**Course Deliverables**
- **Live Classes & Practice**: Daily live classes and CBT question solving.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 6 Months from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **College Consulting**: Academic counseling sessions to map college preferences.
- **Mock Tests**: 10 full-length evaluated mock papers on our online portal.
- **Doubt Support**: 24/7 online doubt clearing portal.`,
    syllabus: [
      {
        title: "Section 1: English Language & Comprehension",
        topics: [
          "Reading Comprehension: Narrative, Factual, Literary passages",
          "Vocabulary: Synonyms, Antonyms, Analogies, Idioms",
          "Grammar: Sentence Correction, Parts of Speech, Verbal Ability",
        ],
      },
      {
        title: "Section 2: Domain Subjects (Commerce/Science)",
        topics: [
          "Accountancy: Partnership, Share Capital, Financial Statements, Accounting Standards",
          "Economics: Microeconomics, Macroeconomics, Indian Economy Development",
          "Business Studies: Principles, Functions, Business Finance, Marketing",
        ],
      },
      {
        title: "Section 3: General Test",
        topics: [
          "General Knowledge & Current Affairs",
          "General Mental Ability & Numerical Ability",
          "Logical and Analytical Reasoning puzzles",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is there a computer test portal?",
        answer: "Yes, we provide mock tests on our online portal to replicate the actual CBT exam environment.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["class-12-commerce"],
    featured: true,
    whatsappMessage: "Hi! I am interested in joining the CUET Prep Masterclass. Please guide me through the admission process.",
  },

  // ─── INDIVIDUAL SUBJECTS ───────────────────────────────────────────────────
  {
    id: "accountancy",
    slug: "accountancy",
    title: "Accountancy Specialization",
    shortTitle: "Accountancy",
    tagline: "Master double-entry bookkeeping and accounting principles",
    description:
      "Excel in Accountancy with our specialized coaching program. Led by experienced accounting coaches, it covers basic journals, ledgers, partnership accounts, and company accounts. Includes worksheets and practice questions.",
    image: images.courses.accountancy,
    category: "subject",
    eligibility: "Class 11 & 12 Commerce stream students",
    duration: "6 Months",
    batchTimings: [
      "Evening Batch: 4:00 PM – 6:00 PM",
    ],
    fee: "₹15,000",
    highlights: [
      "Experienced accounting coaches and subject experts",
      "Regular practice sheets and ledger drafting sessions",
      "Comprehensive notes and formula booklets included",
    ],
    overview: `**Course Overview**
Accountancy is the core language of business. This course provides comprehensive coverage of the NCERT syllabus in Accountancy, focusing on double-entry bookkeeping, ledger entries, and final balance sheet preparation.

**Who Should Join**
- Class 11 and 12 commerce students wanting to build strong accounting fundamentals.

**Learning Outcomes**
- Master fundamental accounting concepts, ledger postings, and preparation of final financial statements.
- Understand double-entry bookkeeping, prepare journals, ledgers, and trial balances.
- Solve board level partnership and company ledger accounts.

**Course Deliverables**
- **Live Classes & Practice**: Daily core accounting classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Academic Support**: Dedicated tutors clarify homework and concepts.
- **Worksheets**: Chapter-wise worksheets containing over 1,000 practice questions.
- **Mock Tests**: Regular monthly tests.`,
    syllabus: [
      {
        title: "Accountancy Curriculum",
        topics: [
          "Theoretical Framework & Accounting Principles",
          "Recording Transactions: Journal, Cash Book, Ledger Posting",
          "Bank Reconciliation Statement (BRS) & Trial Balance",
          "Accounting for Partnership Firms: Goodwill, Admission, Retirement, Death",
          "Accounting for Companies: Share Capital & Debentures",
          "Analysis of Financial Statements: Cash Flow Statement, Ratios",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is this course aligned with CBSE guidelines?",
        answer: "Yes, our Accountancy specialization is fully aligned with the NCERT commerce Stream syllabus.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["economics", "business-studies"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Accountancy Specialization. Please guide me through the admission process.",
  },
  {
    id: "economics",
    slug: "economics",
    title: "Economics Specialization",
    shortTitle: "Economics",
    tagline: "Master microeconomics, macroeconomics, and Indian economic development",
    description:
      "Excel in Economics with our specialized coaching program. Led by experienced economics coaches, it covers demand-supply models, national income, and Indian economic development. Includes practice sheets and mock exams.",
    image: images.courses.economics,
    category: "subject",
    eligibility: "Class 11 & 12 Commerce stream students",
    duration: "6 Months",
    batchTimings: [
      "Evening Batch: 4:00 PM – 6:00 PM",
    ],
    fee: "₹15,000",
    highlights: [
      "Experienced economics coaches and subject experts",
      "Regular practice sheets and economics curve drafting sessions",
      "Comprehensive notes and formula booklets included",
    ],
    overview: `**Course Overview**
Economics is the study of how societies manage scarce resources. This course provides comprehensive coverage of the NCERT syllabus in Economics, focusing on demand-supply models, national income, and Indian economic development.

**Who Should Join**
- Class 11 and 12 commerce students wanting to build strong economics fundamentals.

**Learning Outcomes**
- Master fundamental economics concepts, demand-supply models, and market systems.
- Master macroeconomics curves and national income calculations.
- Understand Indian economic development policies, reforms, and challenges.

**Course Deliverables**
- **Live Classes & Practice**: Daily core economics classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Academic Support**: Dedicated tutors clarify homework and concepts.
- **Worksheets**: Chapter-wise worksheets containing over 1,000 practice questions.
- **Mock Tests**: Regular monthly tests.`,
    syllabus: [
      {
        title: "Economics Curriculum",
        topics: [
          "Microeconomics: Consumer Behavior, Demand, Production Functions, Cost",
          "Introductory Macroeconomics: National Income, Money & Banking, Balance of Payments",
          "Indian Economic Development: Policies, Reforms, Challenges",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is this course aligned with CBSE guidelines?",
        answer: "Yes, our Economics specialization is fully aligned with the NCERT commerce Stream syllabus.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["accountancy", "business-studies"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Economics Specialization. Please guide me through the admission process.",
  },
  {
    id: "business-studies",
    slug: "business-studies",
    title: "Business Studies Specialization",
    shortTitle: "Business Studies",
    tagline: "Master principles, functions, and practices of business management",
    description:
      "Excel in Business Studies with our specialized coaching program. Led by experienced management coaches, it covers principles of management, business finance, and marketing. Includes practice case studies and mock exams.",
    image: images.courses.businessStudies,
    category: "subject",
    eligibility: "Class 11 & 12 Commerce stream students",
    duration: "6 Months",
    batchTimings: [
      "Evening Batch: 4:00 PM – 6:00 PM",
    ],
    fee: "₹14,000",
    highlights: [
      "Experienced management coaches and subject experts",
      "Regular practice sheets and management case studies",
      "Comprehensive notes and corporate business summaries",
    ],
    overview: `**Course Overview**
Business Studies is the study of how businesses are organized, managed, and operated. This course provides comprehensive coverage of the NCERT syllabus in Business Studies, focusing on principles of management, business finance, and marketing.

**Who Should Join**
- Class 11 and 12 commerce students wanting to build strong business management fundamentals.

**Learning Outcomes**
- Master fundamental management concepts, principles, and functions.
- Master business finance, financial markets, and marketing strategies.
- Master consumer protection laws and corporate governance guidelines.

**Course Deliverables**
- **Live Classes & Practice**: Daily core business classes.
- **Recorded Lectures**: Complete archive of all live sessions.
- **Course Validity**: 1 Year from enrollment.`,
    mentorship: `**Mentorship & Doubt Resolution**
- **1-on-1 Academic Support**: Dedicated tutors clarify homework and concepts.
- **Worksheets**: Chapter-wise worksheets containing over 1,000 practice questions.
- **Mock Tests**: Regular monthly tests.`,
    syllabus: [
      {
        title: "Business Studies Curriculum",
        topics: [
          "Foundation of Business: Industry, Commerce, Forms of Organization",
          "Principles and Functions of Management: Planning, Staffing, Directing",
          "Business Finance and Marketing: Financial Markets, Consumer Protection",
        ],
      },
    ],
    facultyIds: ["vijay-sharma"],
    faqs: [
      {
        question: "Is this course aligned with CBSE guidelines?",
        answer: "Yes, our Business Studies specialization is fully aligned with the NCERT commerce Stream syllabus.",
      },
    ],
    successStories: [],
    relatedCourseIds: ["accountancy", "economics"],
    featured: false,
    whatsappMessage: "Hi! I am interested in joining the Business Studies Specialization. Please guide me through the admission process.",
  },
];

export const getCourseBySlug = (slug: string) =>
  courses.find((c) => c.slug === slug);
export const getCoursesByCategory = (category: string) =>
  courses.filter((c) => c.category === category);
export const getFeaturedCourses = (): Course[] =>
  courses.filter((c) => c.featured);
