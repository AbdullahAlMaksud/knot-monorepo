import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-raw",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-raw",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arcade Ops · Game Dashboard",
  description: "Admin dashboard for players, scores, leaderboards and traffic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
