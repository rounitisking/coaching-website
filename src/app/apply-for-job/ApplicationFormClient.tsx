"use client";

import { useState } from "react";
import { submitApplication } from "@/actions/applications";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CheckCircle, Loader2, Send } from "lucide-react";

export default function ApplicationFormClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const result = await submitApplication({
      name: data.get("name") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      qualification: data.get("qualification") as string,
      experience: parseInt(data.get("experience") as string) || 0,
      subjects: (data.get("subjects") as string).split(",").map((s) => s.trim()).filter(Boolean),
      message: data.get("message") as string,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      // Redirect to WhatsApp
      const waUrl = buildWhatsAppUrl(
        `Hi, I have submitted a faculty application at Academica Institute.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nSubjects: ${data.get("subjects")}\nExperience: ${data.get("experience")} years\n\nPlease review my application.`
      );
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="card p-10 text-center">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: "rgba(5,150,105,0.1)" }}
        >
          <CheckCircle size={32} style={{ color: "#059669" }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Application Submitted!
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Thank you for your interest in joining Academica Institute. We have received your application
          and will contact you within 2-3 working days. A WhatsApp message has also been sent for quick follow-up.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn-secondary"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        Faculty Application Form
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Fill in your details and we will get back to you within 2-3 working days.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" id="faculty-application-form">
        {/* Name */}
        <div>
          <label htmlFor="app-name" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Full Name *
          </label>
          <input
            id="app-name"
            name="name"
            type="text"
            required
            placeholder="e.g. CA Rajesh Kumar"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
          />
        </div>

        {/* Phone + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="app-phone" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Phone Number *
            </label>
            <input
              id="app-phone"
              name="phone"
              type="tel"
              required
              placeholder="+91 9999999999"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="app-email" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Email Address *
            </label>
            <input
              id="app-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
            />
          </div>
        </div>

        {/* Qualification + Experience */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="app-qual" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Qualification *
            </label>
            <input
              id="app-qual"
              name="qualification"
              type="text"
              required
              placeholder="e.g. CA, M.Sc Physics, B.Ed"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="app-exp" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Teaching Experience (Years) *
            </label>
            <input
              id="app-exp"
              name="experience"
              type="number"
              min={0}
              max={50}
              required
              placeholder="e.g. 5"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
            />
          </div>
        </div>

        {/* Subjects */}
        <div>
          <label htmlFor="app-subjects" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Subjects You Can Teach *
          </label>
          <input
            id="app-subjects"
            name="subjects"
            type="text"
            required
            placeholder="e.g. Accountancy, Business Law, Economics (comma separated)"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors"
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Separate multiple subjects with commas</p>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="app-message" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Cover Letter / Message
          </label>
          <textarea
            id="app-message"
            name="message"
            rows={4}
            placeholder="Tell us about your teaching philosophy, achievements, and why you want to join Academica Institute..."
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-secondary)] transition-colors resize-none"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl text-sm font-medium" style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center font-bold flex items-center gap-2 py-3"
          id="submit-application-btn"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Submitting...</>
          ) : (
            <><Send size={16} /> Submit Application</>
          )}
        </button>

        <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
          After submitting, you will be redirected to WhatsApp to send a quick follow-up message to our admin team.
        </p>
      </form>
    </div>
  );
}
