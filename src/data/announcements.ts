import type { Announcement } from "@/types";

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "🎉 CA Foundation 2024 — Academica Produces AIR 1!",
    content:
      "Aman Sen, a student of Academica Institute, has secured ALL INDIA RANK 1 in CA Foundation 2024. Academica Institute congratulates Aman and his family!",
    date: "2024-12-15",
    type: "result",
    urgent: true,
  },
  {
    id: "a2",
    title: "📋 Admissions Open — 2025-26 Session",
    content:
      "Admissions for CA Foundation, CS, CMA, CUET, and commerce board batches for 2025-26 are now open. Call or WhatsApp 8375060247 to register.",
    date: "2024-12-01",
    type: "admission",
    urgent: true,
  },
  {
    id: "a3",
    title: "📅 Free Demo Classes — Every Saturday",
    content:
      "Attend a free commerce demo class every Saturday at 11 AM to experience Academica Institute's teaching quality. Register via WhatsApp.",
    date: "2024-11-15",
    type: "event",
    urgent: false,
  },
  {
    id: "a4",
    title: "🏆 CBSE Class 12 Boards — 99.2% Topper",
    content:
      "Academica student Ria Malhotra secured 99.2% marks in CBSE Class 12 Commerce Board exams, with perfect 100/100 scores in Accountancy.",
    date: "2024-06-05",
    type: "result",
    urgent: false,
  },
];
