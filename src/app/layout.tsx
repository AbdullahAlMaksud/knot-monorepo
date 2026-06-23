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
  title: "Sudoku — Minimal Focus",
  description: "Minimal focus Sudoku puzzle game with a beautiful glassmorphism UI",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sudoku — Minimal Focus",
    description: "Train your mind with this minimal, focus-oriented Sudoku puzzle game with a beautiful glassmorphic layout.",
    url: "https://sudoku-focus.vercel.app",
    siteName: "Sudoku",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Sudoku Minimal Focus UI preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudoku — Minimal Focus",
    description: "Train your mind with this minimal, focus-oriented Sudoku puzzle game with a beautiful glassmorphic layout.",
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
