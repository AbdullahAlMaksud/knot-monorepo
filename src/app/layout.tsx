import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/common/smooth-scroll-provider";
import { CartProvider } from "@/lib/cart/cart-context";
import { Toaster } from "sonner";
import { TTQueryClientProvider } from "@/providers/query-client-provider";
import { UserCountryProvider } from "@/hooks/use-user-country";
import ScratchCouponOffer from "@/components/common/scratch-coupon-offer";

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

const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://landing-byou.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BYOU - Clean Beauty Skincare",
    template: "%s | BYOU",
  },
  description:
    "Discover clean, effective skincare with BYOU. Science-backed formulations for glowing, healthy skin.",
  keywords: ["skincare", "clean beauty", "BYOU", "serum", "niacinamide", "glow", "routine"],
  authors: [{ name: "BYOU", url: SITE_URL }],
  creator: "Nexulyze",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BYOU",
    title: "BYOU - Clean Beauty Skincare",
    description:
      "Discover clean, effective skincare with BYOU. Science-backed formulations for glowing, healthy skin.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "BYOU Clean Beauty Skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BYOU - Clean Beauty Skincare",
    description:
      "Discover clean, effective skincare with BYOU. Science-backed formulations for glowing, healthy skin.",
    images: ["/og-default.jpg"],
    creator: "@byouskincare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Toaster
          position="bottom-right"
          richColors={true}
          toastOptions={{ duration: 4000 }}
          closeButton={true}
        />
        <TTQueryClientProvider>
          <CartProvider>
            <UserCountryProvider>
              <SmoothScrollProvider>{children}</SmoothScrollProvider>
              <ScratchCouponOffer />
            </UserCountryProvider>
          </CartProvider>
        </TTQueryClientProvider>
      </body>
    </html>
  );
}
