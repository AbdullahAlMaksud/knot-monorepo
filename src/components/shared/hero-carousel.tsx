"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetWebsiteBannersByRoute } from "@/screens/settings/services/banner/query";
import type { WebsiteBanner } from "@/screens/settings/services/banner/type";
import {
  getBannerMediaItem,
  getBannerPageNameFromPath,
} from "@/screens/settings/services/banner/utils";

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface HeroSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface HeroCarouselProps {
  mediaItems?: MediaItem[];
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  searchBar?: HeroSearchBarProps;
}

interface HeroSlide extends MediaItem {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  buttonText?: string;
  link?: string;
}

const FALLBACK_HERO_SLIDES: Record<string, HeroSlide[]> = {
  home: [
    {
      type: "image",
      src: "/images/home/hero-bg.jpg",
      title: (
        <>
          Unveil Your Natural
          <br />
          Glow
        </>
      ),
      description: (
        <>
          Byou brings you simple, pure, and effective beauty
          <br />
          essentials designed to highlight your true self.
        </>
      ),
      buttonText: "Choose Your Glow",
      link: "/shop",
    },
    {
      type: "image",
      src: "/images/about/about-bg.jpg",
      title: (
        <>
          Unveil Your Natural
          <br />
          Glow
        </>
      ),
      description: (
        <>
          Byou brings you simple, pure, and effective beauty
          <br />
          essentials designed to highlight your true self.
        </>
      ),
      buttonText: "Choose Your Glow",
      link: "/shop",
    },
  ],
  about: [
    {
      type: "image",
      src: "/images/about/about-bg.jpg",
      title: "Our Story",
      description: (
        <>
          B&apos;You is built on a simple belief: skincare should be personal,
          and place matters. Bangladesh&apos;s heat, humidity, pollution, and
          lifestyle demand formulations designed specifically for this
          environment-not products adapted from elsewhere. That&apos;s why we
          create premium, science-backed skincare developed exclusively for
          Bangladeshi skin. Each formula is carefully researched, dermatologist
          certified, and crafted to deliver safety, comfort, and visible results
          in real local conditions. Because true confidence begins with healthy
          skin.
        </>
      ),
      buttonText: "Shop Now",
      link: "/shop",
    },
  ],
  lab: [
    {
      type: "image",
      src: "/images/lab/lab-bg.jpg",
      title: (
        <>
          Science Meets
          <br />
          Beauty
        </>
      ),
      description: (
        <>
          Welcome to Byou Labs, where innovation, research, and expert insights
          come together to create the future of skincare.
        </>
      ),
      buttonText: "Choose Your Glow",
      link: "/shop",
    },
  ],
};

const isExternalUrl = (value?: string): value is string =>
  Boolean(value && /^https?:\/\//i.test(value));

const isBareDomain = (value?: string): value is string =>
  Boolean(value && /^[a-z0-9-]+(\.[a-z0-9-]+)+([/?#].*)?$/i.test(value));

const normalizeLinkHref = (value: string): string => {
  const trimmed = value.trim();

  if (isExternalUrl(trimmed)) return trimmed;
  if (isBareDomain(trimmed)) return `https://${trimmed}`;

  return trimmed;
};

function LinkWrapper({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">) {
  const normalizedHref = normalizeLinkHref(href);

  if (isExternalUrl(normalizedHref)) {
    return (
      <a
        href={normalizedHref}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={normalizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}

function SlideMedia({
  slide,
  isActive,
}: {
  slide: HeroSlide;
  isActive: boolean;
}) {
  const media = (
    <>
      {slide.type === "video" ? (
        <div className="relative h-full w-full">
          <video
            className="h-full w-full object-cover"
            src={slide.src}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/35 sm:bg-black/25" />
        </div>
      ) : (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.src})` }}
        >
          <div className="h-full w-full bg-black/35 sm:bg-black/25" />
        </div>
      )}
    </>
  );

  const baseClassName = `absolute inset-0 block transition-opacity duration-1000 ${
    isActive
      ? "pointer-events-auto z-10 opacity-100"
      : "pointer-events-none z-0 opacity-0"
  }`;

  if (slide.link && !slide.buttonText) {
    return (
      <LinkWrapper href={slide.link} className={baseClassName}>
        {media}
      </LinkWrapper>
    );
  }

  return <div className={baseClassName}>{media}</div>;
}

function getBannerSlide(banner: WebsiteBanner): HeroSlide | undefined {
  const mediaItem = getBannerMediaItem(banner);
  if (!mediaItem) return undefined;

  return {
    ...mediaItem,
    title: banner.title || undefined,
    description: banner.description || undefined,
    buttonText: banner.buttonText || undefined,
    link: banner.link || undefined,
  } satisfies HeroSlide;
}

export default function HeroCarousel({
  mediaItems = [],
  title,
  description,
  buttonText,
  buttonLink = "/shop",
  autoPlay = true,
  autoPlayInterval = 5000,
  searchBar,
}: HeroCarouselProps) {
  const pathname = usePathname();
  const pageName = getBannerPageNameFromPath(pathname);
  const { data: routeBanners = [] } = useGetWebsiteBannersByRoute(pathname);
  const routeBannerSlides = useMemo(
    () =>
      routeBanners
        .map(getBannerSlide)
        .filter((slide): slide is HeroSlide => Boolean(slide)),
    [routeBanners],
  );
  const fallbackSlides = useMemo(
    () => FALLBACK_HERO_SLIDES[pageName] ?? [],
    [pageName],
  );
  const resolvedSlides = useMemo<HeroSlide[]>(() => {
    if (routeBanners.length > 0) {
      return routeBannerSlides;
    }

    if (mediaItems.length > 0) {
      return mediaItems.map<HeroSlide>((item) => ({
        ...item,
        title,
        description,
        buttonText,
        link: buttonLink,
      }));
    }

    return fallbackSlides;
  }, [
    buttonLink,
    buttonText,
    description,
    fallbackSlides,
    mediaItems,
    routeBanners.length,
    routeBannerSlides,
    title,
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeIndex = currentIndex < resolvedSlides.length ? currentIndex : 0;
  const activeSlide = resolvedSlides[activeIndex];
  const hasOverlayInteraction = Boolean(searchBar || activeSlide?.buttonText);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || resolvedSlides.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resolvedSlides.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, resolvedSlides.length, autoPlayInterval]);

  // Reset interval when user manually changes slide
  const resetAutoPlay = () => {
    if (!autoPlay || resolvedSlides.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resolvedSlides.length);
    }, autoPlayInterval);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + resolvedSlides.length) % resolvedSlides.length,
    );
    resetAutoPlay();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % resolvedSlides.length);
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  if (resolvedSlides.length === 0) return null;

  return (
    <section className="relative h-svh overflow-hidden">
      {/* Media Carousel */}
      <div className="absolute inset-0">
        {resolvedSlides.map((slide, index) => (
          <SlideMedia
            key={`${slide.src}-${index}`}
            slide={slide}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {resolvedSlides.length > 1 && (
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
      <div className="pointer-events-none relative z-10 flex h-full items-end px-4 pb-24 pt-28 sm:items-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={`max-w-xl text-white lg:max-w-2xl ${
              hasOverlayInteraction ? "pointer-events-auto" : ""
            }`}
          >
            {activeSlide?.title ? (
              <h1 className="mb-4 text-4xl leading-[0.95] font-semibold tracking-[0.08em] sm:text-5xl sm:tracking-[0.12em] lg:text-7xl lg:tracking-[0.16em]">
                {activeSlide.title}
              </h1>
            ) : null}
            {activeSlide?.description ? (
              <p className="mb-6 max-w-md text-sm leading-relaxed tracking-normal text-white/90 sm:text-base sm:tracking-[0.08em] lg:max-w-xl lg:text-lg">
                {activeSlide.description}
              </p>
            ) : null}
            {searchBar ? (
              <div className="relative mt-2 w-full max-w-md">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-black/40"
                  size={18}
                  strokeWidth={2}
                />
                <input
                  type="search"
                  value={searchBar.value ?? ""}
                  onChange={(e) => searchBar.onChange?.(e.target.value)}
                  placeholder={searchBar.placeholder ?? "Search..."}
                  className="h-13 w-full rounded-full bg-white pl-12 pr-6 text-[0.96rem] text-black placeholder:text-black/38 focus:outline-none"
                />
              </div>
            ) : activeSlide?.buttonText ? (
              activeSlide.link ? (
                <Button
                  asChild
                  className="min-w-40 rounded-full bg-white px-6 text-black hover:bg-gray-100 sm:min-w-45"
                >
                  <LinkWrapper href={activeSlide.link}>
                    {activeSlide.buttonText}
                  </LinkWrapper>
                </Button>
              ) : (
                <Button className="min-w-40 rounded-full bg-white px-6 text-black hover:bg-gray-100 sm:min-w-45">
                  {activeSlide.buttonText}
                </Button>
              )
            ) : null}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {resolvedSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {resolvedSlides.map((_, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              onClick={() => goToSlide(index)}
              className={`min-w-0 rounded-full p-0 transition-all ${
                index === activeIndex
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
