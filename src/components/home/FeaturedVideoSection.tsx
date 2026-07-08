"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedVideo } from "@/data/videos";

export function FeaturedVideoSection() {
  const video = getFeaturedVideo();

  return (
    <section className="section bg-[var(--bg-secondary)]">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Introduction"
            title="See Academica Institute"
            titleHighlight="In Action"
            subtitle="Watch our introduction video to understand our teaching standards, study methodology, and corporate guidance atmosphere."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 max-w-4xl mx-auto">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] group bg-black aspect-video glow-brand"
            >
              {/* Autoplay Muted Responsive YouTube Iframe */}
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=1&modestbranding=1&rel=0&showinfo=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Caption */}
            <p className="text-center text-sm text-[var(--text-muted)] mt-4 font-semibold">
              🎬 {video.title}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
