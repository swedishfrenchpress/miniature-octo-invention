import type { Metadata } from "next";
import { Inter, Bebas_Neue, Dancing_Script, Grandstander } from "next/font/google";
import "./globals.css";

// Clean body font
const inter = Inter({
  variable: "--font-inter",
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
  description: "Accept Bitcoin payments with a tap. NFC-enabled POS that feels as natural as Apple Pay, powered entirely by Bitcoin.",
  keywords: ["bitcoin", "payments", "POS", "point of sale", "NFC", "tap to pay", "cashu", "lightning"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Numo - Bitcoin Payments Made Simple",
    description: "Accept Bitcoin payments with a tap. NFC-enabled POS that feels as natural as Apple Pay.",
    type: "website",
    siteName: "Numo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numo - Bitcoin Payments Made Simple",
    description: "Accept Bitcoin payments with a tap. NFC-enabled POS that feels as natural as Apple Pay.",
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
        className={`${inter.variable} ${bebas.variable} ${dancing.variable} ${grandstander.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
