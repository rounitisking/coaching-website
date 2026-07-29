"use client";

import Image from "next/image";

const ADMISSION_IMAGES = [
  "/admission/WhatsApp Image 2026-07-27 at 16.33.47.webp",
  "/admission/WhatsApp Image 2026-07-29 at 21.31.11 (1).webp",
  "/admission/WhatsApp Image 2026-07-29 at 21.31.11 (2).webp",
  "/admission/WhatsApp Image 2026-07-29 at 21.31.11 (3).webp",
  "/admission/WhatsApp Image 2026-07-29 at 21.31.11.webp",
  "/admission/main.webp",
];

export function AdmissionCarousel() {
  // Duplicate for seamless infinite marquee loop (translateX(-50%) loops perfectly)
  const marqueeItems = [...ADMISSION_IMAGES, ...ADMISSION_IMAGES];

  return (
    <section className="section-padding overflow-hidden bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Enrolling Now</p>
          <h2 className="section-title">Admissions Open 2026</h2>
          <p className="section-subtitle mx-auto mt-3">
            Secure your seat and start your journey towards success. Explore our campus highlights and student learning spaces.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div 
        className="relative overflow-hidden marquee-container marquee-mask"
        aria-label="Admissions Open scrolling banners"
      >
        <div 
          className="flex gap-4 sm:gap-6 marquee-track py-4"
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((src, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-72 h-44 sm:w-80 sm:h-52 relative rounded-2xl overflow-hidden border-2 border-[var(--border)] hover:border-[var(--brand-secondary)] shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={src}
                alt={`Admission Banner ${idx + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 320px"
                priority={idx < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
