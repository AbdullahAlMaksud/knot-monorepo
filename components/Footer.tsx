import Link from "next/link";
import Image from "next/image";
import { Chrome, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden min-h-[600px]">
      {/* Giant BYOU Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none py-4">
        <div className="relative w-full h-full max-w-[1400px]">
          <Image
            src="/images/footer-logo.svg"
            alt="BYOU"
            fill
            className="object-contain opacity-60"
            priority
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Location</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">Head Quarter</p>
                <p>2972 Westheimer Rd. Santa Ana</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Local</p>
                <p>2972 Westheimer Rd. Santa Ana</p>
              </div>
            </div>
          </div>

          {/* Center Logo & Description */}
          <div className="text-center flex flex-col items-center justify-start">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt="BYOU"
                width={150}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-300 mb-6 max-w-xs">
              Lorem ipsum dolor sit amet consectetur. Scelerisque lectus
              habitasse adipiscing.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <Chrome size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div className="sm:text-right">
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <nav className="space-y-3 text-sm text-gray-300">
              <Link href="/about" className="block hover:text-white transition">
                About Us
              </Link>
              <Link
                href="/contact"
                className="block hover:text-white transition"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping"
                className="block hover:text-white transition"
              >
                Shipping & Returns
              </Link>
              <Link
                href="/privacy"
                className="block hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 text-sm text-gray-400 z-20">
        <p>© 2025 Byou. All rights reserved.</p>
      </div>
    </footer>
  );
}
