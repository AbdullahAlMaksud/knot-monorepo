"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Pages that start with transparent header
  const transparentPages = ["/", "/about", "/lab", "/blog", "/concern"];
  const isTransparentPage =
    transparentPages.includes(pathname) || pathname.startsWith("/blog/");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if header should be solid based on page and scroll
  const isSolid = isScrolled || !isTransparentPage;

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid ? "bg-white/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Promo Banner */}
        <div className="bg-black text-white text-center py-2 px-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button className="text-white">&lt;</button>
            <span>BUY 2 PRODUCTS AND GET A FREE GIFT!</span>
            <button className="text-white">&gt;</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                isSolid ? "text-black" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav
              className={`hidden flex-1 lg:flex space-x-8 text-sm uppercase tracking-wider transition-colors ${
                isSolid ? "text-black" : "text-white"
              }`}
            >
              <Link
                href="/shop"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/shop" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/about" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/contact" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Contact Us
              </Link>
              <Link
                href="/lab"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/lab" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Lab
              </Link>
              {/* <Link href="/blog" className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                pathname === "/blog" ? "after:w-full" : ""
              } ${isSolid ? "after:bg-black" : "after:bg-white"}`}>
                Blog
              </Link> */}
            </nav>

            {/* Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/">
                <Image
                  src={isSolid ? "/logo-black.svg" : "/logo.svg"}
                  alt="Logo"
                  width={100}
                  height={40}
                />
              </Link>
            </div>

            {/* Right Icons */}
            <div
              className={`flex items-center justify-end space-x-4 sm:space-x-6 flex-1 transition-colors ${
                isSolid ? "text-black" : "text-white"
              }`}
            >
              <button className="hover:text-gray-600 transition">
                <Search size={20} />
              </button>
              <button className="hover:text-gray-600 transition">
                <User size={20} />
              </button>
              <button className="hover:text-gray-600 transition">
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t ${
              isSolid ? "bg-white" : "bg-black/90"
            }`}
          >
            <nav
              className={`flex flex-col space-y-4 px-4 py-6 text-sm uppercase tracking-wider ${
                isSolid ? "text-black" : "text-white"
              }`}
            >
              <Link
                href="/shop"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/shop" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/about" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/contact" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/lab"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/lab" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Lab
              </Link>
              {/* <Link
                href="/blog"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/blog" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link> */}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
