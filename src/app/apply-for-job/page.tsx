import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply For Job — Academica Institute",
  description: "Join Academica Institute as a faculty member. Apply with your qualifications, experience and preferred subjects to teach CA, CS, CMA, Science or School coaching.",
};

export default function ApplyForJobPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-custom text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
            Join Our Team
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Apply For Faculty Job
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto">
            We are always looking for passionate educators with deep subject knowledge. Share your profile and we will reach out to you.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Client-side form ─────────────────────────────────────────────────────────
import ApplicationFormClient from "./ApplicationFormClient";

function ApplicationForm() {
  return <ApplicationFormClient />;
}
