/**
 * YouTube utility — extract video ID and generate thumbnail URLs.
 * Admin pastes a YouTube URL; this extracts the ID server-side.
 * No manual thumbnail upload ever needed.
 */

/**
 * Extract YouTube video ID from any common URL format:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  const patterns = [
    // Standard watch URL
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})/,
    // Short URL
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embed URL
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // Shorts URL
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  // If it looks like a raw 11-char video ID already
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

/**
 * Generate the best-available YouTube thumbnail URL.
 * Returns maxresdefault (1280x720) with fallback to hqdefault (480x360).
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "max" | "hq" | "mq" | "sd" = "max"
): string {
  const qualityMap = {
    max: "maxresdefault",
    hq: "hqdefault",
    mq: "mqdefault",
    sd: "sddefault",
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Get both max and fallback thumbnail URLs for a video ID.
 */
export function getYouTubeThumbnails(videoId: string): {
  maxRes: string;
  hqDefault: string;
  embed: string;
} {
  return {
    maxRes: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    hqDefault: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    embed: `https://www.youtube.com/embed/${videoId}`,
  };
}

/**
 * Process a YouTube URL pasted by admin:
 * - Extract video ID
 * - Generate thumbnail URL
 * Returns null if URL is invalid.
 */
export function processYouTubeUrl(url: string): {
  videoId: string;
  thumbnailUrl: string;
  embedUrl: string;
} | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  return {
    videoId,
    thumbnailUrl: getYouTubeThumbnail(videoId, "max"),
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };
}
