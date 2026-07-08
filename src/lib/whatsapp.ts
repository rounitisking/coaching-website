import { institute } from "@/data/institute";

/**
 * Build a WhatsApp deep link with a pre-filled message.
 * @param message - The message to pre-fill (course name, inquiry, etc.)
 */
export function buildWhatsAppUrl(message: string): string {
  // Always use the primary institute WhatsApp number
  const phone = institute.whatsapp || "918375060247";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export const INSTITUTE_WHATSAPP_URL = buildWhatsAppUrl(
  "Hi, I would like to know more about Academica Institute."
);
