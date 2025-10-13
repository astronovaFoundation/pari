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
    default: "Pari Eyebrow Threading Palace",
    template: "%s | Pari Eyebrow Threading Palace"
  },
  description: "Beauty salon and spa services - Expert eyebrow threading, lash extensions, and brow perfection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/fav.png" type="image/png" />
      </head>
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
