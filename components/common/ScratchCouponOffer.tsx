"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Copy, Check, Gift, Clock } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { getStoredCart } from "@/lib/cart/types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { toast } from "sonner";

export default function ScratchCouponOffer() {
  const router = useRouter();
  const { items } = useCart();
  const { user } = useAuthUser();
  const [mounted, setMounted] = useState(false);

  // States
  const [showModal, setShowModal] = useState(false);
  const [isScratchedFully, setIsScratchedFully] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // In seconds
  const [copied, setCopied] = useState(false);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Check for debug flag in URL
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsDebug(
        window.location.search.includes("debug_timer") ||
        localStorage.getItem("byou_debug_timer") === "true"
      );
    }
  }, []);

  const THRESHOLD = isDebug ? 15 * 1000 : 1 * 60 * 1000; // 15s for debug, 1m for production
  const REAPPEAR_THRESHOLD = isDebug ? 30 * 1000 : 5 * 60 * 1000; // 30s for debug, 5m for production
  const COUPON_CODE = "SERUM20";

  // Lock body scroll when modal is open
  useBodyScrollLock(showModal);

  // Main timer and observer loop
  const userId = user?.id;

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const isLoggedIn = !!userId;

      // Read items directly from localStorage to prevent hydration race conditions
      const currentItems = getStoredCart();
      const hasItems = currentItems.length > 0;

      // 1. Check logged-in or empty cart -> Clear states
      if (isLoggedIn || !hasItems) {
        localStorage.removeItem("byou_cart_abandoned_start");
        localStorage.removeItem("byou_scratch_offer_last_closed_at");
        localStorage.removeItem("byou_coupon_expiry_time");
        if (showModal) setShowModal(false);
        if (timeLeft > 0) setTimeLeft(0);
        return;
      }

      // Check if coupon claimed in this session
      const claimedInSession = sessionStorage.getItem("byou_scratch_offer_claimed_in_session") === "true";
      if (claimedInSession) {
        if (showModal) setShowModal(false);
        const couponExpiry = localStorage.getItem("byou_coupon_expiry_time");
        if (couponExpiry) {
          const remaining = Number(couponExpiry) - now;
          if (remaining <= 0) {
            localStorage.removeItem("byou_coupon_expiry_time");
            setTimeLeft(0);
          } else {
            setTimeLeft(Math.ceil(remaining / 1000));
          }
        } else {
          if (timeLeft > 0) setTimeLeft(0);
        }
        return;
      }

      // 2. Guest user with items -> Handle abandoned cart timer
      let abandonedStart = localStorage.getItem("byou_cart_abandoned_start");
      if (!abandonedStart) {
        abandonedStart = now.toString();
        localStorage.setItem("byou_cart_abandoned_start", abandonedStart);
      }

      const elapsed = now - Number(abandonedStart);
      const couponExpiry = localStorage.getItem("byou_coupon_expiry_time");
      const lastClosedAt = localStorage.getItem("byou_scratch_offer_last_closed_at");

      const isReappearEligible = !lastClosedAt || (now - Number(lastClosedAt) >= REAPPEAR_THRESHOLD);

      // Trigger modal if elapsed threshold is met, not dismissed recently, and coupon timer not running yet
      if (elapsed >= THRESHOLD && !couponExpiry && !showModal && isReappearEligible) {
        setShowModal(true);
      }

      // 3. Update corner countdown timer if coupon has been generated
      if (couponExpiry) {
        const remaining = Number(couponExpiry) - now;
        if (remaining <= 0) {
          localStorage.removeItem("byou_coupon_expiry_time");
          setTimeLeft(0);
        } else {
          setTimeLeft(Math.ceil(remaining / 1000));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted, userId, showModal, THRESHOLD, REAPPEAR_THRESHOLD, timeLeft]);

  // Canvas Initializer
  useEffect(() => {
    if (!showModal || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Standard width/height for scratch container
    canvas.width = 280;
    canvas.height = 120;

    // Fill with premium gold/sand gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#C5A880"); // Muted gold
    gradient.addColorStop(0.5, "#E5D3B3"); // Sand/Champagne
    gradient.addColorStop(1, "#A88B58"); // Deep gold
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid texture lines for a scratchcard look
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // Add guide text
    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH HERE TO REVEAL", canvas.width / 2, canvas.height / 2);

    setIsScratchedFully(false);
    isDrawingRef.current = false;

    // Scratch event handlers
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Check percentage cleared
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparent++;
        }
      }

      const percent = (transparent / (pixels.length / 4)) * 100;
      if (percent > 45) {
        setIsScratchedFully(true);
      }
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        // Prevent scrolling on touch screens
        e.preventDefault();
      }
      isDrawingRef.current = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      if ("touches" in e) {
        e.preventDefault();
      }
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleEnd = () => {
      isDrawingRef.current = false;
    };

    // Attach listeners
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);

      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [showModal]);

  // Close modal -> do not start timer, just record closed timestamp for reappear logic
  const handleClose = () => {
    localStorage.setItem("byou_scratch_offer_last_closed_at", Date.now().toString());
    localStorage.removeItem("byou_coupon_expiry_time");
    setTimeLeft(0);
    setShowModal(false);
  };

  // Claim button click -> navigate to checkout, apply coupon automatically
  const handleClaim = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    toast.success("Coupon code copied! Redirecting to checkout...");

    sessionStorage.setItem("byou_scratch_offer_claimed_in_session", "true");
    sessionStorage.setItem("byou_claimed_coupon_code", COUPON_CODE);

    const expiry = Date.now() + 10 * 60 * 1000;
    localStorage.setItem("byou_coupon_expiry_time", expiry.toString());
    setTimeLeft(10 * 60);

    localStorage.removeItem("byou_scratch_offer_last_closed_at");

    setShowModal(false);
    router.push("/checkout");
  };

  // Copy code from floating widget
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    toast.success("Coupon code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format remaining time (seconds -> mm:ss)
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!mounted) return null;

  return (
    <>
      {/* 1. Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-[#FCFBF9] border border-[#EBE8E0] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-in fade-in zoom-in duration-300">

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-md transition-colors"
              aria-label="Close exclusive offer modal"
            >
              <X size={20} />
            </button>

            {/* Left Column - Product Image */}
            <div className="w-full md:w-5/12 h-48 md:h-auto relative bg-[#F4F1EA] flex-shrink-0">
              <Image
                src="/images/products/face_serum_offer.png"
                alt="Face Serum Exclusive Offer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5" />
            </div>

            {/* Right Column - Scratch Card Content */}
            <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] tracking-widest text-[#A88B58] font-semibold uppercase">
                    Just Be YOU
                  </span>
                  <span className="h-[1px] w-8 bg-[#A88B58]" />
                </div>

                <h2 className="text-2xl md:text-3xl font-heading text-black leading-tight mb-3">
                  Face Serum Exclusive Offer
                </h2>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-6 font-sans">
                  We noticed you left something in your cart! Scratch the card below to reveal a special discount code prepared just for you.
                </p>
              </div>

              {/* Scratch card area */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-[280px] h-[120px] rounded-lg overflow-hidden select-none">

                  {/* Under layer (revealed coupon) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5] border-2 border-dashed border-[#C5A880] rounded-lg">
                    <span className="text-[10px] tracking-wider text-gray-500 font-semibold mb-1 uppercase">
                      Your Exclusive Code
                    </span>
                    <span className="text-3xl font-bold tracking-widest text-black select-all">
                      {COUPON_CODE}
                    </span>
                    <span className="text-[10px] text-green-700 font-semibold mt-1">
                      GET 20% OFF ALL PRODUCTS
                    </span>
                  </div>

                  {/* Canvas scratch layer */}
                  <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 z-10 cursor-pointer transition-opacity duration-500 ${isScratchedFully ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                  />
                </div>

                <p className="text-[11px] text-gray-400 mt-2 italic font-sans">
                  {isScratchedFully
                    ? "Offer revealed! Click claim to apply."
                    : "Drag your mouse or finger across the block to scratch."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-4">
                <button
                  onClick={handleClaim}
                  disabled={!isScratchedFully}
                  className="w-full py-3 bg-black hover:bg-black/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-full text-sm transition-colors shadow-md"
                >
                  Claim 20% Off Now
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-2 bg-transparent text-gray-500 hover:text-black font-medium text-xs transition-colors"
                >
                  No thanks, keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Countdown Timer (Corner Bubble) */}
      {timeLeft > 0 && (
        <div className="fixed bottom-6 right-6 z-[90] font-sans group">
          <div className="relative flex items-center justify-end">

            {/* The Floating Bubble */}
            <div className="flex items-center gap-2 bg-black border border-[#C5A880] text-white py-2.5 px-4 rounded-full shadow-2xl h-11 w-32 group-hover:w-[260px] overflow-hidden transition-all duration-500 ease-in-out">

              {/* Default Left Section (Icon & Countdown) */}
              <div className="flex items-center gap-1.5 shrink-0 select-none">
                <Gift className="size-4 text-[#C5A880] animate-bounce shrink-0" />
                <span className="font-mono text-sm tracking-wider font-semibold text-[#E5D3B3] shrink-0">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Divider (visible on hover) */}
              <div className="h-4 w-[1px] bg-[#C5A880]/40 mx-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shrink-0" />

              {/* Revealed Code & Copy Button (visible on hover) */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 overflow-hidden shrink-0">
                <span className="font-mono font-bold text-xs tracking-wider text-white">
                  {COUPON_CODE}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 bg-[#C5A880]/20 hover:bg-[#C5A880]/40 text-[#E5D3B3] hover:text-white rounded-md transition-colors shrink-0"
                  title="Copy Coupon Code"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                </button>
              </div>
            </div>

            {/* Hover Tooltip (Bengali prompt text) */}
            <div className="absolute bottom-14 right-0 bg-[#FAF8F5] border border-[#EBE8E0] text-black text-[11px] font-medium py-1 px-3 rounded-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Click to copy coupon
            </div>
          </div>
        </div>
      )}
    </>
  );
}
