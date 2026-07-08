import type { GalleryItem } from "@/types";
import { images } from "./images";

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    type: "photo",
    src: images.gallery.batch2024a,
    thumbnail: images.gallery.batch2024a,
    caption: "CA Foundation 2024 Top Rankers Celebration",
    category: "Results",
    year: 2024,
  },
  {
    id: "g2",
    type: "photo",
    src: images.gallery.batch2024b,
    thumbnail: images.gallery.batch2024b,
    caption: "Commerce Board 2024 Selections — Academica Batch",
    category: "Results",
    year: 2024,
  },
  {
    id: "g3",
    type: "photo",
    src: images.gallery.resultCelebration,
    thumbnail: images.gallery.resultCelebration,
    caption: "Annual Commerce Toppers Prize Distribution 2024",
    category: "Events",
    year: 2024,
  },
  {
    id: "g4",
    type: "photo",
    src: images.gallery.classroom,
    thumbnail: images.gallery.classroom,
    caption: "State-of-the-Art Commerce Classrooms",
    category: "Campus",
    year: 2024,
  },
  {
    id: "g5",
    type: "photo",
    src: images.gallery.lab,
    thumbnail: images.gallery.lab,
    caption: "Digital Computer Center for CBT Mocks",
    category: "Campus",
    year: 2023,
  },
  {
    id: "g6",
    type: "photo",
    src: images.gallery.seminar,
    thumbnail: images.gallery.seminar,
    caption: "Career Guidance Seminar by Top Chartered Accountants",
    category: "Events",
    year: 2023,
  },
  {
    id: "g7",
    type: "photo",
    src: images.gallery.awards,
    thumbnail: images.gallery.awards,
    caption: "Best Coaching Institute Excellence Award",
    category: "Awards",
    year: 2023,
  },
  {
    id: "g8",
    type: "photo",
    src: images.gallery.sports,
    thumbnail: images.gallery.sports,
    caption: "Annual Student Interaction Meet",
    category: "Events",
    year: 2023,
  },
];

export const galleryCategories = ["All", "Results", "Campus", "Events", "Awards"];
