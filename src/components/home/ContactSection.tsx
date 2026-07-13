import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { institute } from "@/data/institute";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section className="section bg-[var(--bg-secondary)]" id="contact">
      <div className="container-custom">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Visit Us or"
            titleHighlight="Call Now"
            subtitle="Our counselors are available 6 days a week to answer all your questions about admissions, courses, and scholarships."
          />
        </ScrollReveal>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-5">
              {/* Address */}
              <div className="card p-6 flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] mb-1">Our Location</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{institute.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="card p-6 flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                >
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] mb-1">Call Us</h4>
                  <div className="space-y-1">
                    {institute.phone.map((ph: string) => (
                      <a
                        key={ph}
                        href={`tel:${ph}`}
                        className="block text-sm text-[var(--brand-600)] font-semibold hover:text-[var(--brand-700)] transition-colors"
                      >
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card p-6 flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
                >
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] mb-1">Email Us</h4>
                  <a
                    href={`mailto:${institute.email}`}
                    className="text-sm text-[var(--brand-600)] font-semibold hover:text-[var(--brand-700)] transition-colors"
                  >
                    {institute.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="card p-6 flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
                >
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] mb-1">Office Hours</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Monday – Saturday: 8:00 AM – 7:00 PM</p>
                  <p className="text-sm text-[var(--text-muted)]">Sunday: Closed</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={buildWhatsAppUrl("Hi, I would like to enquire about admissions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center"
              >
                <MessageCircle size={20} />
                Chat with Counselor on WhatsApp
              </a>
            </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal direction="right">
            <div className="card overflow-hidden h-full min-h-[280px] sm:min-h-[360px] md:min-h-[400px]">
              <iframe
                src={institute.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Academica Institute location on Google Maps"
                className="w-full h-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
