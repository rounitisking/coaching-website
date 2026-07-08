"use client";

import { StarRating } from "@/components/ui/StarRating";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const googleReviews = [
  {
    name: "Vikram Malhotra",
    role: "Parent of Class 12 Student",
    rating: 5,
    text: "Academica Institute is hands down the best coaching for commerce boards in Delhi. Rajesh Sir's Accountancy classes are highly structural. My son improved his score from 70% to 96%.",
    date: "2 weeks ago",
  },
  {
    name: "Aditi Sharma",
    role: "CA Foundation Student",
    rating: 5,
    text: "The conceptual depth taught here is amazing. The Chartered Accountant faculty covers ICAI modules thoroughly. Highly recommend Academica for professional commerce guidance.",
    date: "1 month ago",
  },
  {
    name: "Rohit Varma",
    role: "Class 10 Board Student",
    rating: 5,
    text: "Excellent teachers for secondary classes. Vikram Sir's science notes and mathematics assignments are precise and extremely useful for boards. Got 98% in CBSE boards.",
    date: "3 weeks ago",
  },
  {
    name: "Sanjay Singhal",
    role: "Parent of CUET Aspirant",
    rating: 5,
    text: "My daughter cleared CUET with a 99.8 percentile and secured B.Com (Hons) at SRCC. Academica's computer-based mocks and career counseling sessions were excellent.",
    date: "1 month ago",
  },
];

export function GoogleReviewsSection() {
  return (
    <section className="section bg-[var(--bg-secondary)]" id="google-reviews">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Reviews"
            title="What Google Reviews"
            titleHighlight="Say"
            subtitle="Read verified reviews from students and parents on Google Maps. We maintain a 4.9/5 stars average rating."
          />
        </ScrollReveal>

        {/* Aggregate Stats Card */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-md mx-auto card p-6 mt-8 mb-12 text-center flex flex-col items-center justify-center bg-[var(--bg-card)]">
            <div className="flex items-center gap-2 mb-2">
              {/* Google G Logo */}
              <svg viewBox="0 0 24 24" width="28" height="28" className="flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-extrabold text-xl text-[var(--text-primary)]" style={{ fontFamily: "Outfit, sans-serif" }}>
                Google Maps Rating
              </span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-3xl font-black text-[var(--text-primary)]">4.9</span>
              <StarRating rating={5} size={20} />
            </div>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Based on 1,250+ verified student & parent reviews
            </p>
          </div>
        </ScrollReveal>

        {/* Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {googleReviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 0.08} direction="up">
              <div className="card p-6 h-full flex flex-col justify-between bg-[var(--bg-card)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={review.rating} size={14} />
                    <span className="text-[10px] text-[var(--text-muted)] font-medium">{review.date}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed mb-4">
                    &quot;{review.text}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-2 border-t border-[var(--border)] pt-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--brand-50)] text-[var(--brand-700)] dark:bg-purple-950/30 dark:text-purple-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">{review.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{review.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
