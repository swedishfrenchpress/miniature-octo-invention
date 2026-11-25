import type { Metadata } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Body & UI typeface. Only the three weights used by the scale are loaded.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Header display typeface (GC Protage), self-hosted locally.
// Disable automatic Arial fallback so missing demo glyphs fall back to Sora.
const protage = localFont({
  variable: "--font-protage",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["var(--font-sora)", "system-ui", "sans-serif"],
  src: [
    { path: "../fonts/GCProtage-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/GCProtage-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/GCProtage-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/GCProtage-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Numo - Bitcoin Payments Made Simple",
  description:
    "Accept Bitcoin with a tap. Numo turns an NFC Android phone into a point of sale that feels as natural as Apple Pay — no extra hardware, no platform fees.",
  keywords: [
    "bitcoin",
    "payments",
    "point of sale",
    "android",
    "NFC",
    "tap to pay",
    "cashu",
    "ecash",
    "lightning",
    "merchant",
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: "Numo - Bitcoin Payments Made Simple",
    description:
      "Accept Bitcoin with a tap. Numo turns an NFC Android phone into a point of sale that feels as natural as Apple Pay.",
    type: "website",
    siteName: "Numo",
    images: [
      {
        url: "https://numopay.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Numo - Bitcoin Payments Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numo - Bitcoin Payments Made Simple",
    description:
      "Accept Bitcoin with a tap. Numo turns an NFC Android phone into a point of sale that feels as natural as Apple Pay.",
    images: ["https://numopay.org/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${protage.variable} antialiased font-sans`}>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
