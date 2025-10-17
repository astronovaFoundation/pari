import { Suspense } from "react"
import type { Metadata } from "next";
import { Poppins, Arizonia} from "next/font/google";

import { Toaster } from "sonner";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const arizonia = Arizonia({
  weight: ["400"],
  variable: "--font-arizonia",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pari Eyebrow Threading Palace - Expert Brow Threading & Beauty Services",
    template: "%s | Pari Eyebrow Threading Palace"
  },
  description: "Experience expert eyebrow threading, lash extensions, and premium beauty services at Pari Eyebrow Threading Palace. Professional brow shaping, waxing, and facial treatments in a luxurious setting.",
  keywords: [
    "eyebrow threading",
    "brow shaping",
    "beauty salon",
    "lash extensions",
    "facial treatments",
    "waxing services",
    "professional threading",
    "eyebrow design",
    "beauty treatments",
    "spa services"
  ],
  authors: [{ name: "Pari Eyebrow Threading Palace" }],
  creator: "Pari Eyebrow Threading Palace",
  publisher: "Pari Eyebrow Threading Palace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  alternates: {
    canonical: "https://www.parieyebrowthreading.com"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.parieyebrowthreading.com",
    title: "Pari Eyebrow Threading Palace - Expert Brow Threading & Beauty Services",
    description: "Experience expert eyebrow threading, lash extensions, and premium beauty services at Pari Eyebrow Threading Palace.",
    siteName: "Pari Eyebrow Threading Palace",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Pari Eyebrow Threading Palace Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pari Eyebrow Threading Palace - Expert Brow Threading & Beauty Services",
    description: "Experience expert eyebrow threading, lash extensions, and premium beauty services.",
    images: ["/logo.webp"],
    creator: "@PariEyebrow"
  },
  verification: {
    google: ""
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${arizonia.variable} antialiased font-poppins`}
      >
        <Suspense fallback={<div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>}>
          {children}
          <Toaster richColors position="top-center" />
        </Suspense>
      </body>
    </html>
  );
}