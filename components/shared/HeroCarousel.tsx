"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface HeroCarouselProps {
  mediaItems: MediaItem[];
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function HeroCarousel({
  mediaItems,
  title,
  description,
  buttonText,
  buttonLink = "/shop",
  autoPlay = true,
  autoPlayInterval = 5000,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || mediaItems.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, mediaItems.length, autoPlayInterval]);

  // Reset interval when user manually changes slide
  const resetAutoPlay = () => {
    if (!autoPlay || mediaItems.length <= 1) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, autoPlayInterval);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    resetAutoPlay();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  if (mediaItems.length === 0) return null;

  return (
    <section className="relative h-[600px] sm:h-[700px] lg:h-[900px] overflow-hidden">
      {/* Media Carousel */}
      <div className="absolute inset-0">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.type === "video" ? (
              <video
                className="w-full h-full object-cover"
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.src})` }}
              >
                <div className="w-full h-full bg-black/20" />
              </div>
            )}
          </div>
          ))}
      </div>

      {/* Navigation Arrows */}
      {mediaItems.length > 1 && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Content Overlay */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-10">
        <div className="text-white max-w-xl">
          <h1 className="text-[32px] tracking-[0.2em] font-semibold mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-sm mb-6 tracking-[0.2em]">
              {description}
            </p>
          )}
          {buttonText && (
            <Button asChild className="rounded-full bg-white text-black hover:bg-gray-100">
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Dots Indicator */}
      {mediaItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {mediaItems.map((_, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              onClick={() => goToSlide(index)}
              className={`h-2 min-w-0 p-0 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
