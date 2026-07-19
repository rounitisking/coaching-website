import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      "https://coaching-website-liart.vercel.app"
  ),
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  title: {
    default:
      "Academica Institute — Expert Coaching for CA, CS, CMA, CUET & More",
    template: "%s | Academica Institute",
  },
  description:
    "Academica Institute (est. 2013) provides expert coaching for CA Foundation, CA Intermediate, CS, CMA, CUET, and Class 9–12 Commerce. Join thousands of successful students.",
  keywords: [
    "CA Foundation coaching",
    "CS coaching",
    "CMA coaching",
    "CUET preparation",
    "commerce coaching",
    "Academica Institute",
    "CA coaching India",
    "Class 11 commerce",
    "Class 12 commerce",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Academica Institute",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Academica Institute — Quality Coaching Since 2013",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@academicainstitute",
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Academica Institute",
  description:
    "Quality coaching for CA, CS, CMA, CUET and school students since 2013",
  foundingDate: "2013",
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://coaching-website-liart.vercel.app",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
  },
};

import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
    >
      <head>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <ConditionalWrapper>
            <Navbar />
          </ConditionalWrapper>
          <main>{children}</main>
          <ConditionalWrapper>
            <Footer />
          </ConditionalWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
