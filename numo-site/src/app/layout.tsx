import type { Metadata } from "next";
import { Sora, Bebas_Neue, Dancing_Script, Grandstander } from "next/font/google";
import Script from "next/script";
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

// Cursive font for taglines
const dancing = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Grandstander font for NUMO footer branding
const grandstander = Grandstander({
  variable: "--font-grandstander",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Numo - Bitcoin Payments Made Simple",
  description: "Accept Bitcoin payments with a tap. NFC-enabled terminal that feels as natural as Apple Pay, powered entirely by Bitcoin.",
  keywords: ["bitcoin", "payments", "terminal", "point of sale", "NFC", "tap to pay", "cashu", "lightning"],
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
    description: "Accept Bitcoin payments with a tap. NFC-enabled terminal that feels as natural as Apple Pay.",
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
    description: "Accept Bitcoin payments with a tap. NFC-enabled terminal that feels as natural as Apple Pay.",
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
        className={`${sora.variable} ${bebas.variable} ${dancing.variable} ${grandstander.variable} antialiased font-sans`}
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Solitreo&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {children}
      </body>
    </html>
  );
}
