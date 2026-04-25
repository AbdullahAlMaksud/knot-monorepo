"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";

import DraggableSlider from "@/components/shared/DraggableSlider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RealStoriesSliderItem {
  id: string | number;
  thumbnailSrc?: string;
  alt: string;
  href?: string;
  videoSrc: string;
}

export interface RealStoriesSliderSectionProps {
  items?: RealStoriesSliderItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

const defaultItems: RealStoriesSliderItem[] = [
  {
    id: 1,
    thumbnailSrc: "/images/home/care 1.jpg",
    alt: "Customer applying skincare serum",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 2,
    thumbnailSrc: "/images/home/care 2.jpg",
    alt: "Customer holding facial oil bottle",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 3,
    thumbnailSrc: "/images/home/care 3.jpg",
    alt: "Customer applying drops in front of mirror",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 4,
    thumbnailSrc: "/images/home/care 4.jpg",
    alt: "Customer smiling while using skincare",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 5,
    thumbnailSrc: "/images/home/care 5.jpg",
    alt: "Customer applying cream to cheeks",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 6,
    thumbnailSrc: "/images/home/care 6.jpg",
    alt: "Customer skincare routine in soft light",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 7,
    thumbnailSrc: "/images/contact/contact1.jpg",
    alt: "Customer holding skincare bottle near face",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 8,
    thumbnailSrc: "/images/contact/contact2.jpg",
    alt: "Customer enjoying post-skincare glow",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
];

function StoryCard({
  item,
  onPress,
}: {
  item: RealStoriesSliderItem;
  onPress: (item: RealStoriesSliderItem) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Play ${item.alt}`}
      onClick={() => onPress(item)}
      data-slider-clickable="true"
      className="block w-full text-left focus-visible:outline-none"
    >
      <div className="group relative h-[26rem] overflow-hidden rounded-[1.75rem] bg-[#e9e2db] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 sm:h-[32rem] lg:h-[34.5rem]">
        {item.thumbnailSrc ? (
          <Image
            src={item.thumbnailSrc}
            alt={item.alt}
            fill
            sizes="(min-width: 1536px) 17vw, (min-width: 1280px) 18vw, (min-width: 1024px) 19vw, (min-width: 640px) 38vw, 72vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-gray-600 via-gray-700 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/18 via-transparent to-white/6" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-[4.8rem] items-center justify-center rounded-full border-[2.5px] border-black/80 bg-black/8 text-white backdrop-blur-[1px] transition duration-300 group-hover:scale-110">
            <Play size={24} fill="currentColor" className="ml-1 text-black" />
          </div>
        </div>
      </div>
    </button>
  );
}

function StoryVideoDialog({
  item,
  onClose,
}: {
  item: RealStoriesSliderItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/82 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-black shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur hover:bg-white/22"
          >
            <X className="size-5" />
          </button>
          <div className="aspect-video w-full bg-black">
            <video
              key={item.id}
              src={item.videoSrc}
              poster={item.thumbnailSrc}
              className="h-full w-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function RealStoriesSliderSection({
  items = defaultItems,
  eyebrow = "REAL STORIES. REAL RESULTS.",
  title = "See how our customers share their journey with Byou.",
  description,
  buttonText,
  buttonHref,
  className,
}: RealStoriesSliderSectionProps) {
  const [activeVideo, setActiveVideo] = useState<RealStoriesSliderItem | null>(
    null,
  );
  const [initialSliderIndex, setInitialSliderIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateInitialIndex = () => {
      setInitialSliderIndex(
        mediaQuery.matches ? Math.min(4, items.length - 1) : 0,
      );
    };

    updateInitialIndex();
    mediaQuery.addEventListener("change", updateInitialIndex);

    return () => {
      mediaQuery.removeEventListener("change", updateInitialIndex);
    };
  }, [items.length]);

  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28",
          className,
        )}
      >
        <div className="absolute inset-y-0 right-0 hidden w-[40.5%] bg-black lg:block" />

        <div className="relative mx-auto max-w-[1760px] overflow-hidden pr-4 sm:pr-6 lg:pl-0 lg:pr-8 xl:pr-12">
          <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,390px)] lg:items-center lg:gap-0">
            <div className="relative min-w-0 overflow-visible">
              <div className="min-w-0">
                <DraggableSlider
                  items={items}
                  getItemKey={(item) => item.id}
                  renderItem={(item) => (
                    <StoryCard item={item} onPress={setActiveVideo} />
                  )}
                  initialIndex={initialSliderIndex}
                  ariaLabel="Customer story media slider"
                  showArrows={false}
                  showDots={false}
                  customCursorLabel="DRAG"
                  snapAlign="end"
                  snapOffset={24}
                  viewportClassName="pb-1 pt-4 pr-0"
                  trackClassName="gap-4 sm:gap-5 lg:gap-7"
                  slideClassName="w-[72vw] max-w-[320px] sm:w-[42vw] sm:max-w-[330px] lg:w-[14rem] xl:w-[15.1rem] 2xl:w-[16rem]"
                />
              </div>
            </div>

            <div className="relative z-10 bg-black px-8 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[34.5rem] lg:bg-transparent lg:px-0 lg:py-0 lg:pl-14 xl:pl-16">
              <div className="flex h-full flex-col justify-center">
                <p className="mb-5 text-sm tracking-[0.24em] text-white/85 uppercase sm:text-[0.95rem]">
                  {eyebrow}
                </p>
                <h2 className="max-w-[12ch] text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.045em] sm:text-[3.35rem] lg:text-[4rem] xl:text-[4.35rem]">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-6 max-w-md text-base leading-7 text-white/74 sm:text-lg">
                    {description}
                  </p>
                ) : null}
                {buttonText ? (
                  buttonHref ? (
                    <Button
                      asChild
                      variant="secondary"
                      className="mt-8 w-fit rounded-full bg-white px-6 text-black hover:bg-gray-200"
                    >
                      <Link href={buttonHref}>{buttonText}</Link>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-8 w-fit rounded-full bg-white px-6 text-black hover:bg-gray-200"
                    >
                      {buttonText}
                    </Button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <StoryVideoDialog
        item={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
