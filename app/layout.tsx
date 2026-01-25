import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


const canela = localFont({
  src: [
    {
      path: "../public/fonts/canela/Canela-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/canela/Canela-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-canela",
  fallback: ["Georgia", "serif"], // Fallback if font files are not found
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "BYOU - Clean Beauty Skincare",
  description:
    "Discover clean, effective skincare with BYOU. Science-backed formulations for glowing, healthy skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${canela.variable} font-sans antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
