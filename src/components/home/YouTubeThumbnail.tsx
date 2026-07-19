"use client";

import { getYouTubeThumbnail } from "@/lib/youtube";

interface YouTubeThumbnailProps {
  youtubeVideoId: string;
  title: string;
  initialThumbnailUrl: string | null;
}

export function YouTubeThumbnail({
  youtubeVideoId,
  title,
  initialThumbnailUrl,
}: YouTubeThumbnailProps) {
  const thumb = initialThumbnailUrl || getYouTubeThumbnail(youtubeVideoId, "max");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumb}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src.includes("maxresdefault")) {
          img.src = getYouTubeThumbnail(youtubeVideoId, "hq");
        }
      }}
    />
  );
}
