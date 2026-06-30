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
  mobileSrc?: string;
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
  aspectRatio?: string;
}

interface HeroSlide extends MediaItem {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  buttonText?: string;
  link?: string;
  badge?: string;
  features?: string[];
  textColor?: "black" | "white";
}

const FALLBACK_HERO_SLIDES: Record<string, HeroSlide[]> = {
  home: [
    {
      type: "image",
      src: "/images/home/hero-bg.jpg",
      mobileSrc: "/images/home/hero-bg-mobile.jpg",
      title: "Hydrating Factors 7.3%",
      subtitle: "Hair Shampoo",
      description: "Formulated for dull, dry & frizzy hair. Helps increase hydration by gently cleansing scalp and hair.",
      features: ["NON-STRIPPING", "GENTLE", "SULFATE-FREE"],
      badge: "NEW LAUNCH",
      buttonText: "Shop Now",
      link: "/shop",
      textColor: "black",
    },
    {
      type: "image",
      src: "/images/about/about-bg.jpg",
      mobileSrc: "/images/about/about-bg-mobile.jpg",
      title: "Unveil Your Natural Glow",
      subtitle: "Skincare Essentials",
      description: "Byou brings you simple, pure, and effective beauty essentials designed to highlight your true self.",
      features: ["DERMATOLOGIST CERTIFIED", "LOCALLY CRAFTED", "SCIENCE-BACKED"],
      badge: "BEST SELLER",
      buttonText: "Choose Your Glow",
      link: "/shop",
      textColor: "black",
    },
  ],
  about: [
    {
      type: "image",
      src: "/images/about/about-bg.jpg",
      mobileSrc: "/images/about/about-bg-mobile.jpg",
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
      textColor: "black",
    },
  ],
  lab: [
    {
      type: "image",
      src: "/images/lab/lab-bg.jpg",
      mobileSrc: "/images/lab/lab-bg-mobile.jpg",
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
      textColor: "black",
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
  const overlayClass = slide.textColor === "black"
    ? "bg-white/10 sm:bg-white/5"
    : "bg-black/35 sm:bg-black/25";

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
          <div className={`absolute inset-0 ${overlayClass}`} />
        </div>
      ) : (
        <>
          {/* Desktop Image */}
          <div
            className="h-full w-full bg-cover bg-center hidden md:block"
            style={{ backgroundImage: `url(${slide.src})` }}
          >
            <div className={`h-full w-full ${overlayClass}`} />
          </div>
          {/* Mobile Image */}
          <div
            className="h-full w-full bg-cover bg-center md:hidden block"
            style={{ backgroundImage: `url(${slide.mobileSrc || slide.src})` }}
          >
            <div className={`h-full w-full ${overlayClass}`} />
          </div>
        </>
      )}
    </>
  );

  const baseClassName = `absolute inset-0 block transition-opacity duration-1000 ${isActive
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
  aspectRatio,
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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (resolvedSlides.length === 0) return null;

  const dotActiveColor = activeSlide?.textColor === "black" ? "bg-black" : "bg-white";
  const dotInactiveColor =
    activeSlide?.textColor === "black"
      ? "bg-black/30 hover:bg-black/55"
      : "bg-white/30 hover:bg-white/55";

  const buttonClass =
    activeSlide?.textColor === "black"
      ? "min-w-40 rounded-full bg-black px-6 text-white hover:bg-black/85 sm:min-w-45"
      : "min-w-40 rounded-full bg-white px-6 text-black hover:bg-gray-100 sm:min-w-45";

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full overflow-hidden ${!aspectRatio ? "aspect-[4/5] md:aspect-[21/9]" : ""
        }`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
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
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 text-white shadow-md hover:bg-gray-100 h-9 w-9 sm:h-12 sm:w-12 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 text-white shadow-md hover:bg-gray-100 h-9 w-9 sm:h-12 sm:w-12 flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </>
      )}

      {/* Content Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div
            className={`max-w-xl lg:max-w-2xl ${hasOverlayInteraction ? "pointer-events-auto" : ""
              }`}
          >
            {activeSlide?.badge ? (
              <span
                className={`inline-block px-2.5 py-1 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3 rounded-sm ${activeSlide.textColor === "black"
                  ? "bg-black text-white"
                  : "bg-white text-black"
                  }`}
              >
                {activeSlide.badge}
              </span>
            ) : null}

            {activeSlide?.title ? (
              <h1
                className={`mb-1 text-xl leading-[0.95] font-semibold tracking-[0.04em] sm:mb-2 sm:text-3xl sm:tracking-[0.08em] lg:text-4xl ${activeSlide.textColor === "black" ? "text-black" : "text-white"
                  }`}
              >
                {activeSlide.title}
              </h1>
            ) : null}

            {activeSlide?.subtitle ? (
              <h2
                className={`mb-2 text-sm sm:text-xl font-medium tracking-wide ${activeSlide.textColor === "black"
                  ? "text-black/80"
                  : "text-white/80"
                  }`}
              >
                {activeSlide.subtitle}
              </h2>
            ) : null}

            {(activeSlide?.title || activeSlide?.subtitle) && (
              <hr
                className={`w-12 border-t-2 my-3 ${activeSlide.textColor === "black"
                  ? "border-black/20"
                  : "border-white/20"
                  }`}
              />
            )}

            {activeSlide?.description ? (
              <p
                className={`mb-4 max-w-xs text-xs leading-relaxed tracking-normal sm:mb-6 sm:max-w-md sm:text-base ${activeSlide.textColor === "black"
                  ? "text-black/70"
                  : "text-white/90"
                  }`}
              >
                {activeSlide.description}
              </p>
            ) : null}

            {activeSlide?.features && activeSlide.features.length > 0 ? (
              <>
                {/* Desktop Features: Horizontal list with separators */}
                <div
                  className={`hidden sm:flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 text-xs font-semibold tracking-wider uppercase ${activeSlide.textColor === "black"
                    ? "text-black/80"
                    : "text-white/80"
                    }`}
                >
                  {activeSlide.features.map((feature, i) => (
                    <span key={feature} className="flex items-center">
                      {feature}
                      {i < activeSlide.features!.length - 1 && (
                        <span
                          className={`ml-3 ${activeSlide.textColor === "black"
                            ? "text-black/30"
                            : "text-white/30"
                            }`}
                        >
                          |
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                {/* Mobile Features: Vertical list with checkmarks */}
                <div
                  className={`flex sm:hidden flex-col gap-1.5 mb-5 text-[10px] font-semibold tracking-wider uppercase ${activeSlide.textColor === "black"
                    ? "text-black/80"
                    : "text-white/80"
                    }`}
                >
                  {activeSlide.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-1">
                      <span>✓</span>
                      <span>{feature}</span>
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {searchBar ? (
              <div className="relative mt-1 w-full max-w-md sm:mt-2">
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
                <Button asChild className={buttonClass}>
                  <LinkWrapper href={activeSlide.link}>
                    {activeSlide.buttonText}
                  </LinkWrapper>
                </Button>
              ) : (
                <Button className={buttonClass}>{activeSlide.buttonText}</Button>
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
              className={`min-w-0 rounded-full p-0 transition-all ${index === activeIndex
                ? `h-2 w-8 ${dotActiveColor}`
                : `h-2 w-2 ${dotInactiveColor}`
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
