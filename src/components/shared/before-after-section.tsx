"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Code } from "lucide-react";
import SectionIntroCta from "@/components/common/section-intro-cta";

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
      <SectionIntroCta
        title="Be the Best Version of You"
        description="B'You products are formulated with gentle, skin-friendly ingredients suitable even for sensitive skin. Free from unnecessary additives, our science-backed formulas focus on safety, effectiveness, and compatibility with Bangladeshi skin and climate. We help improve skin clarity, balance, and overall health-so you can feel confident and be the best version of you."
        strongText="B'You - Just Be You."
        buttonLabel="Shop Now"
        buttonHref="/shop"
      />

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
