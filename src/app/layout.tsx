import type { Metadata, Viewport } from "next";
import { Noto_Serif_Bengali, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Knot — Brain Games & Logic Puzzles",
  description: "Train your mind with Knot - a collection of minimal, focus-oriented logic puzzle games like Sudoku, Queens, and more with a beautiful glassmorphic layout.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Knot — Brain Games & Logic Puzzles",
    description: "Train your mind with Knot - a collection of minimal, focus-oriented logic puzzle games like Sudoku, Queens, and more with a beautiful glassmorphic layout.",
    url: "https://sudoku-focus.vercel.app",
    siteName: "Knot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Knot Minimal Focus UI preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knot — Brain Games & Logic Puzzles",
    description: "Train your mind with Knot - a collection of minimal, focus-oriented logic puzzle games like Sudoku, Queens, and more with a beautiful glassmorphic layout.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, notoSerifBengali.variable)}>
      <body>{children}</body>
    </html>
  );
}
