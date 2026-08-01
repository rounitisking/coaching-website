export function getMatchedResultPhoto(
  name: string,
  courseOrExam: string | null | undefined,
  fallbackPhoto: string | null | undefined
): string {
  if (!name) return fallbackPhoto || "";
  
  const normName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normCourse = (courseOrExam || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  
  const RESULT_FILES = [
    { filename: "Anshul CSEET.webp", namePart: "anshul", examPart: "cs" },
    { filename: "Deepanshi CSEET.webp", namePart: "deepanshi", examPart: "cs" },
    { filename: "Mahi CMA FOUNDATION.webp", namePart: "mahi", examPart: "cma" },
    { filename: "Priya CSEET.webp", namePart: "priya", examPart: "cs" },
    { filename: "Ritesh CMA FOUNDATION.webp", namePart: "ritesh", examPart: "cma" },
    { filename: "Rohit Sharma CA FOUNDATION.webp", namePart: "rohit", examPart: "ca" },
    { filename: "Shivani CSEET.webp", namePart: "shivani", examPart: "cs" },
    { filename: "Shreya CA FOUNDATION.webp", namePart: "shreya", examPart: "ca" },
    { filename: "Sudhiksha CMA INTERN.webp", namePart: "sudhiksha", examPart: "cma" },
    { filename: "Tanishaka CSEET.webp", namePart: "tanishaka", examPart: "cs" },
    { filename: "Vidhi CMA FOUNDATION.webp", namePart: "vidhi", examPart: "cma" },
    { filename: "Vidhi Sharma CMA FOUNDATION.webp", namePart: "vidhisharma", examPart: "cma" },
  ];
  
  // A match must satisfy:
  // 1. Name matches (normalized name equals or contains namePart, or vice versa)
  // 2. Course/Exam matches (normalized course contains examPart or vice versa)
  const matches = RESULT_FILES.filter(file => {
    const nameMatch = normName === file.namePart || normName.includes(file.namePart) || file.namePart.includes(normName);
    const courseMatch = normCourse.includes(file.examPart) || file.examPart.includes(normCourse);
    return nameMatch && courseMatch;
  });
  
  if (matches.length === 1) {
    return `/result/${matches[0].filename}`;
  }
  
  if (matches.length > 1) {
    // Prioritize exact name matches first
    const exactNameMatch = matches.find(m => m.namePart === normName);
    if (exactNameMatch) {
      return `/result/${exactNameMatch.filename}`;
    }
    return `/result/${matches[0].filename}`;
  }
  
  return fallbackPhoto || "";
}
