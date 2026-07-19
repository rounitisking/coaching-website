import Link from "next/link";
import { Phone } from "lucide-react";

interface BlueCTASectionProps {
  headline?: string;
  subline?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function BlueCTASection({
  headline = "Shape Your Future Today",
  subline = "Join Academica Institute — where students become top professionals. Limited seats available for 2025-26 batch.",
  primaryLabel = "Demo Class",
  primaryHref = "/demo-classes",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: BlueCTASectionProps) {
  return (
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-custom text-center">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={primaryHref}
            className="btn-accent btn-lg font-bold"
            id="cta-demo-class"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="btn-lg rounded-xl font-semibold flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.25)",
            }}
            id="cta-contact"
          >
            <Phone size={18} />
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
