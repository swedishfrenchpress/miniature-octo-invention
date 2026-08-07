import type { Metadata } from "next";
import { Sora, Bebas_Neue, Grandstander } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Clean body font
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Bold display font
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

// Grandstander font for NUMO footer branding — the single 400-weight wordmark
const grandstander = Grandstander({
  variable: "--font-grandstander",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Numo - Bitcoin Payments Made Simple",
  description: "Accept Bitcoin with a tap. Numo turns an NFC Android phone into a point of sale that feels as natural as Apple Pay — no extra hardware, no platform fees.",
  keywords: ["bitcoin", "payments", "point of sale", "android", "NFC", "tap to pay", "cashu", "ecash", "lightning", "merchant"],
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
    description: "Accept Bitcoin with a tap. Numo turns an NFC Android phone into a point of sale that feels as natural as Apple Pay.",
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
    description: "Accept Bitcoin with a tap. Numo turns an NFC Android phone into a point of sale that feels as natural as Apple Pay.",
    images: ["https://numopay.org/og-image.jpg"],
  },
  other: {
    "font-preconnect-1": "https://fonts.googleapis.com",
    "font-preconnect-2": "https://fonts.gstatic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${bebas.variable} ${grandstander.variable} antialiased font-sans`}
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Solitreo&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
