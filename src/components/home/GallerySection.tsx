"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { gallery, galleryCategories } from "@/data/gallery";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? gallery.slice(0, 6)
    : gallery.filter((g) => g.category === activeCategory).slice(0, 6);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <section className="section bg-[var(--bg-secondary)]" id="gallery">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Campus & Events"
            title="Life at"
            titleHighlight="Academica Institute"
            subtitle="A glimpse into our world-class facilities, celebrations, and the vibrant student community."
          />
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center mt-6 sm:mt-8 mb-8 sm:mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 min-h-[40px]"
                style={{
                  background: activeCategory === cat ? "var(--gradient-brand)" : "var(--bg-card)",
                  color: activeCategory === cat ? "white" : "var(--text-secondary)",
                  border: activeCategory === cat ? "none" : "1px solid var(--border)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "4/3" }}
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn
                    size={32}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ScrollReveal delay={0.2}>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn-secondary inline-flex">
              View Full Gallery
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <button
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full rounded-xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{filtered[lightboxIndex].caption}</p>
                <p className="text-white/60 text-sm">{filtered[lightboxIndex].year}</p>
              </div>
            </motion.div>

            <button
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
