"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Code } from "lucide-react";

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl font-semibold mb-6">
          Simple, safe, and effective, glowing skin for everyone
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto mb-8">
          Our face mists and serums are made with a gentle, halal-friendly
          formula that works even for sensitive skin. With no unnecessary
          additives, Byou helps you achieve a natural, radiant glow and feel
          confident in your own skin, without the extra frills.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Shope Now
        </Link>
      </div>

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div
          ref={containerRef}
          className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* After Image (Full) */}
          <div className="absolute inset-0">
            <Image
              src="/images/home/after.jpg"
              alt="After"
              fill
              className="object-cover"
              priority
            />
            {/* After Label */}
            <div className="absolute bottom-6 right-6">
              <span className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold text-gray-800">
                After
              </span>
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="/images/home/before.jpg"
              alt="Before"
              fill
              className="object-cover"
              priority
            />
            {/* Before Label */}
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold text-gray-800">
                Before
              </span>
            </div>
          </div>

          {/* Slider Line */}
          <div
            className="absolute inset-y-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          />

          {/* Slider Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing z-10"
            style={{
              left: `${sliderPosition}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Code />
          </div>
        </div>
      </div>
    </section>
  );
}
