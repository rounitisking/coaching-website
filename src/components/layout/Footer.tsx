import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

// Inline social SVG components (lucide-react v3 removed social icons)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import { institute } from "@/data/institute";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const footerLinks = {
  Courses: [
    { label: "CA Foundation", href: "/courses/ca-foundation" },
    { label: "CS Preparation", href: "/courses/cs" },
    { label: "CMA Preparation", href: "/courses/cma" },
    { label: "CUET Prep", href: "/courses/cuet" },
    { label: "Class 11 Commerce", href: "/courses/class-11-commerce" },
    { label: "Class 12 Commerce", href: "/courses/class-12-commerce" },
  ],
  "Quick Links": [
    { label: "About Us", href: "/#why-us" },
    { label: "Faculty", href: "/faculty" },
    { label: "Results", href: "/results" },
    { label: "Gallery", href: "/gallery" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialIcons = [
  { icon: YoutubeIcon, href: institute.social.youtube, label: "YouTube" },
  { icon: InstagramIcon, href: institute.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: institute.social.facebook, label: "Facebook" },
  { icon: TelegramIcon, href: institute.social.telegram, label: "Telegram" },
  { icon: TwitterXIcon, href: institute.social.twitter, label: "Twitter/X" },
];


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border)] overflow-hidden">
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="container-custom pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-brand)" }}
              >
                <span className="text-white font-black text-base">A</span>
              </div>
              <span
                className="font-black text-xl text-[var(--text-primary)]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Academica{" "}
                <span className="gradient-text">Institute</span>
              </span>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              {institute.tagline}. Serving students since {institute.founded}.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--brand-600)] hover:border-[var(--brand-400)] hover:bg-[var(--brand-50)] dark:hover:bg-[rgba(99,102,241,0.1)] transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-600)] transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--brand-500)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {institute.address}
                </span>
              </li>
              {institute.phone.map((ph) => (
                <li key={ph}>
                  <a
                    href={`tel:${ph}`}
                    className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--brand-600)] transition-colors"
                  >
                    <Phone size={16} className="text-[var(--brand-500)] flex-shrink-0" />
                    {ph}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${institute.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--brand-600)] transition-colors"
                >
                  <Mail size={16} className="text-[var(--brand-500)] flex-shrink-0" />
                  <span className="break-all">{institute.email}</span>
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={buildWhatsAppUrl("Hi, I would like to know more about Academica Institute.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-5 w-full justify-center text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="flex-shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} {institute.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link
              href="/resources"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-600)] transition-colors"
            >
              Student Resources
            </Link>
            <Link
              href="/contact"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-600)] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
