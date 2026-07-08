import { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { faculty } from "@/data/faculty";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://academicainstitute.in";
  const now = new Date();

  const courseUrls = courses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const facultyUrls = faculty.map((f) => ({
    url: `${baseUrl}/faculty/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/faculty`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/results`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...courseUrls,
    ...facultyUrls,
  ];
}
