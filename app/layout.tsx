import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import ThemeInjector from "@/components/layout/ThemeInjector";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Celestial Church of Christ — Calgary Model Parish",
    template: "%s | CCC Calgary Model Parish",
  },
  description:
    "Welcome to Celestial Church of Christ, Calgary Model Parish. Diocese of Alberta. Join us for worship, prayer, and fellowship in Calgary.",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://ccccalgarymodelparish.ca",
  ),
  openGraph: {
    title: "Celestial Church of Christ — Calgary Model Parish",
    description:
      "Calgary Model Parish, Diocese of Alberta. A community of faith, prayer, and spiritual growth.",
    type: "website",
    siteName: "CCC Calgary Model Parish",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Celestial Church of Christ — Calgary Model Parish",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Celestial Church of Christ — Calgary Model Parish",
  alternateName: "CCC Calgary Model Parish, Calgary Model Parish",
  description:
    "Celestial Church of Christ, Calgary Model Parish. 440 28 St NE, Calgary, AB T2A 6T3.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "440 28 St NE",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "13:00",
      description: "Main Sunday Service",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "18:00",
      closes: "19:30",
      description: "Mercy Day Service",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "20:00",
      closes: "22:00",
      description: "Special Service — Prophets, Prophetesses, Dreamers & Visioneers",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d5c3f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <ThemeInjector />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
