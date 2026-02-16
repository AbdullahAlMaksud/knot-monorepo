import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { CartProvider } from "@/lib/cart/CartContext";

// Playfair Display for headings
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

// Inter for subheadings (Semibold) and body text (Regular)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"], // Regular (400) and Semibold (600)
  variable: "--font-inter",
  display: "swap",
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
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
