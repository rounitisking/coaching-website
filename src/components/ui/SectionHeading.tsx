import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className = "",
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="h-px w-8 rounded-full" style={{ background: "var(--gradient-brand)" }} />
          <span className="section-eyebrow">{eyebrow}</span>
          <div className="h-px w-8 rounded-full" style={{ background: "var(--gradient-brand)" }} />
        </div>
      )}

      <h2 className="section-title mb-4">
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}

      {children}
    </div>
  );
}
