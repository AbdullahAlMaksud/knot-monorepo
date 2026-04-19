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
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length,
    );
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
    <section className="relative h-svh overflow-hidden">
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
                <div className="w-full h-full bg-black/35 sm:bg-black/25" />
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
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 sm:inline-flex lg:left-6"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 sm:inline-flex lg:right-6"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-end px-4 pb-24 pt-28 sm:items-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl text-white lg:max-w-2xl">
            <h1 className="mb-4 text-4xl leading-[0.95] font-semibold tracking-[0.08em] sm:text-5xl sm:tracking-[0.12em] lg:text-7xl lg:tracking-[0.16em]">
              {title}
            </h1>
            {description && (
              <p className="mb-6 max-w-md text-sm leading-relaxed tracking-normal text-white/90 sm:text-base sm:tracking-[0.08em] lg:max-w-xl lg:text-lg">
                {description}
              </p>
            )}
            {buttonText && (
              <Button
                asChild
                className="min-w-[160px] rounded-full bg-white px-6 text-black hover:bg-gray-100 sm:min-w-[180px]"
              >
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {mediaItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {mediaItems.map((_, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              onClick={() => goToSlide(index)}
              className={`min-w-0 rounded-full p-0 transition-all ${
                index === currentIndex
                  ? "h-2 w-8 bg-white"
                  : "h-2 w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
