"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/lib/cart/CartContext";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { data: session } = authClient.useSession();
  const profileHref = session?.user ? "/account" : "/auth/signin";

  // Pages that start with transparent header
  const transparentPages = ["/", "/about", "/lab", "/blog", "/concern"];
  const isTransparentPage =
    transparentPages.includes(pathname) ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/concern/");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    const timeoutId = setTimeout(handleScroll, 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
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
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              &lt;
            </Button>
            <span>BUY 2 PRODUCTS AND GET A FREE GIFT!</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              &gt;
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isSolid ? "text-black" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* Desktop Navigation */}
            <nav
              className={`hidden flex-1 lg:flex space-x-8 text-sm uppercase tracking-wider transition-colors ${
                isSolid ? "text-black" : "text-white"
              }`}
            >
              <Link
                href="/shop"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/shop" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/blog" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Blogs
              </Link>
              <Link
                href="/about"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/about" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/contact" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Contact Us
              </Link>
              <Link
                href="/lab"
                className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/lab" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
              >
                Lab
              </Link>
              {/* <Link href="/blog" className={`relative pb-1 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
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
              <Button variant="ghost" size="icon" className="hover:opacity-70">
                <Search size={20} />
              </Button>
              {session?.user ? (
                <Link
                  href={profileHref}
                  className={`max-w-[140px] truncate text-sm font-medium hover:opacity-70 transition ${
                    isSolid ? "text-black" : "text-white"
                  }`}
                  title={session.user.name ?? "My account"}
                >
                  {session.user.name ?? "Account"}
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:opacity-70"
                  asChild
                >
                  <Link href={profileHref} aria-label="Sign in">
                    <User size={20} />
                  </Link>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="hover:opacity-70 relative"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-black text-white text-xs font-medium px-1">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Button>
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
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/shop" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/shop" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/about"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/about" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === "/contact" ? "after:w-full" : ""
                } ${isSolid ? "after:bg-black" : "after:bg-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/lab"
                className={`relative pb-1 w-fit transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
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

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
