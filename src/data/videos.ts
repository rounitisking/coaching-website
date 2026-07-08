import type { Video } from "@/types";

export const videos: Video[] = [
  {
    id: "v1",
    title: "Welcome to Academica Institute — Delhi's Premier Commerce & Academic Coaching",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "institute",
    featured: true,
  },
  {
    id: "v2",
    title: "How to Crack CA Foundation — Strategy by CA Rajesh Kumar",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "lecture",
    featured: true,
  },
  {
    id: "v3",
    title: "Class 12 Commerce Boards — 99.2% Topper Success Stories",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "results",
    featured: false,
  },
  {
    id: "v4",
    title: "Corporate Accounting Basics — Free Lecture by Dr. Sneha Gupta",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "lecture",
    featured: false,
  },
];

export const getFeaturedVideo = () => videos.find((v) => v.featured) || videos[0];
