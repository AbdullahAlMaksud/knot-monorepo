"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SliderKey = string | number;

export interface DraggableSliderProps<T> {
  items: T[];
  getItemKey: (item: T, index: number) => SliderKey;
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  ariaLabel: string;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  emptyState?: ReactNode;
  initialIndex?: number;
  showArrows?: boolean;
  showDots?: boolean;
  customCursorLabel?: string;
  snapAlign?: "start" | "center" | "end";
  snapOffset?: number;
}

interface DragState {
  pointerId: number | null;
  startX: number;
  startScrollLeft: number;
  startIndex: number;
  hasDragged: boolean;
  clickTarget: HTMLElement | null;
}

export default function DraggableSlider<T>({
  items,
  getItemKey,
  renderItem,
  ariaLabel,
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  emptyState = null,
  initialIndex = 0,
  showArrows = true,
  showDots = true,
  customCursorLabel,
  snapAlign = "center",
  snapOffset = 0,
}: DraggableSliderProps<T>) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    startIndex: 0,
    hasDragged: false,
    clickTarget: null,
  });
  const suppressClickRef = useRef(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isCustomCursorEnabled = Boolean(customCursorLabel);

  const slideSnapClassName =
    snapAlign === "start"
      ? "snap-start"
      : snapAlign === "end"
        ? "snap-end"
        : "snap-center";

  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      const root = rootRef.current;

      if (!root) return;

      const bounds = root.getBoundingClientRect();

      setCursorPosition({
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      });
    },
    [],
  );

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;
      const slide = slideRefs.current[index];

      if (!viewport || !slide) return;

      const targetOffset =
        snapAlign === "start"
          ? slide.offsetLeft - snapOffset
          : snapAlign === "end"
            ? slide.offsetLeft -
              (viewport.clientWidth - slide.clientWidth) +
              snapOffset
            : slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2;

      viewport.scrollTo({
        left: Math.max(0, targetOffset),
        behavior,
      });
    },
    [snapAlign, snapOffset],
  );

  const getClosestIndex = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport || slideRefs.current.length === 0) return 0;

    const viewportAnchor =
      snapAlign === "start"
        ? viewport.scrollLeft + snapOffset
        : snapAlign === "end"
          ? viewport.scrollLeft + viewport.clientWidth - snapOffset
          : viewport.scrollLeft + viewport.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const slideAnchor =
        snapAlign === "start"
          ? slide.offsetLeft
          : snapAlign === "end"
            ? slide.offsetLeft + slide.clientWidth
            : slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideAnchor - viewportAnchor);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [snapAlign, snapOffset]);

  const updateActiveIndex = useCallback(() => {
    const closestIndex = getClosestIndex();

    setActiveIndex((current) =>
      current === closestIndex ? current : closestIndex,
    );
  }, [getClosestIndex]);

  useEffect(() => {
    if (items.length === 0) return;

    const index = Math.max(0, Math.min(initialIndex, items.length - 1));
    const frame = window.requestAnimationFrame(() => {
      scrollToIndex(index, "auto");
      setActiveIndex(index);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialIndex, items.length, scrollToIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const handleScroll = () => updateActiveIndex();
    const handleResize = () => updateActiveIndex();

    updateActiveIndex();

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateActiveIndex]);

  const finishDragging = useCallback(
    (pointerId?: number) => {
      const viewport = viewportRef.current;

      if (pointerId !== undefined && viewport?.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }

      suppressClickRef.current = dragStateRef.current.hasDragged;
      dragStateRef.current.pointerId = null;
      dragStateRef.current.hasDragged = false;
      dragStateRef.current.clickTarget = null;
      setIsDragging(false);
      updateActiveIndex();
    },
    [updateActiveIndex],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const viewport = viewportRef.current;
    const clickTarget = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-slider-clickable='true']");

    if (!viewport) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      startIndex: getClosestIndex(),
      hasDragged: false,
      clickTarget: clickTarget instanceof HTMLElement ? clickTarget : null,
    };

    if (isCustomCursorEnabled && event.pointerType === "mouse") {
      updateCursorPosition(event.clientX, event.clientY);
      setIsCursorVisible(true);
    }

    suppressClickRef.current = false;
    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;

    if (isCustomCursorEnabled && event.pointerType === "mouse") {
      updateCursorPosition(event.clientX, event.clientY);
    }

    if (Math.abs(deltaX) > 4) {
      dragStateRef.current.hasDragged = true;
    }

    viewport.scrollLeft = dragState.startScrollLeft - deltaX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    if (!dragStateRef.current.hasDragged && dragStateRef.current.clickTarget) {
      dragStateRef.current.clickTarget.click();
    }

    if (dragStateRef.current.hasDragged) {
      const { startIndex, startX } = dragStateRef.current;
      const deltaX = event.clientX - startX;
      const direction = deltaX < 0 ? 1 : -1;
      const closestIndex = getClosestIndex();
      const fallbackIndex = Math.max(
        0,
        Math.min(startIndex + direction, items.length - 1),
      );
      const targetIndex =
        closestIndex === startIndex ? fallbackIndex : closestIndex;

      setActiveIndex(targetIndex);
      scrollToIndex(targetIndex);
    }

    finishDragging(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (items.length <= 1) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(Math.min(activeIndex + 1, items.length - 1));
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(Math.max(activeIndex - 1, 0));
    }
  };

  if (items.length === 0) {
    return emptyState;
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full min-w-0 space-y-5",
        isCustomCursorEnabled &&
          "md:cursor-none md:[&_button]:cursor-none md:[&_a]:cursor-none md:[&_*]:cursor-none",
        className,
      )}
      onPointerEnter={(event) => {
        if (!isCustomCursorEnabled || event.pointerType !== "mouse") return;
        updateCursorPosition(event.clientX, event.clientY);
        setIsCursorVisible(true);
      }}
      onPointerLeave={(event) => {
        if (!isCustomCursorEnabled || event.pointerType !== "mouse") return;
        if (isDragging) return;
        setIsCursorVisible(false);
      }}
      onPointerMove={(event) => {
        if (!isCustomCursorEnabled || event.pointerType !== "mouse") return;
        updateCursorPosition(event.clientX, event.clientY);
        setIsCursorVisible(true);
      }}
    >
      <div
        ref={viewportRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "no-scrollbar w-full min-w-0 overflow-x-auto scroll-smooth outline-none",
          isCustomCursorEnabled
            ? "select-none md:cursor-none"
            : isDragging
              ? "cursor-grabbing select-none"
              : "cursor-grab",
          viewportClassName,
        )}
        style={{
          scrollPaddingLeft:
            snapAlign === "start" && snapOffset > 0
              ? `${snapOffset}px`
              : undefined,
          scrollPaddingRight:
            snapAlign === "end" && snapOffset > 0
              ? `${snapOffset}px`
              : undefined,
        }}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          suppressClickRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
        onKeyDown={handleKeyDown}
        onPointerCancel={(event) => {
          if (dragStateRef.current.pointerId !== event.pointerId) return;
          finishDragging(event.pointerId);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className={cn(
            "flex w-max min-w-full snap-x snap-mandatory gap-4",
            trackClassName,
          )}
        >
          {items.map((item, index) => (
            <div
              key={getItemKey(item, index)}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={cn(slideSnapClassName, "shrink-0", slideClassName)}
            >
              {renderItem(item, index, index === activeIndex)}
            </div>
          ))}
        </div>
      </div>

      {isCustomCursorEnabled ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 md:flex",
            isCursorVisible ? "opacity-100" : "opacity-0",
            isDragging ? "scale-105" : "scale-100",
          )}
          style={{
            transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="size-3 rounded-full bg-black/75" />
            <span className="size-[4.5rem] rounded-full bg-black text-[0.6rem] font-semibold tracking-[0.26em] text-white uppercase flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              {customCursorLabel}
            </span>
            <span className="size-3 rounded-full bg-black/75" />
          </div>
        </div>
      ) : null}

      {(showArrows || (showDots && items.length > 1)) && (
        <div className="flex items-center justify-between gap-4">
          {showArrows ? (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full border border-white/10 bg-white/8 text-white hover:bg-white/16"
                onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full border border-white/10 bg-white/8 text-white hover:bg-white/16"
                onClick={() =>
                  scrollToIndex(Math.min(activeIndex + 1, items.length - 1))
                }
                aria-label="Next slide"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          ) : (
            <div />
          )}

          {showDots && items.length > 1 ? (
            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <button
                  key={getItemKey(item, index)}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    "h-2 rounded-full bg-white/35 transition-all hover:bg-white/60",
                    index === activeIndex ? "w-8 bg-white" : "w-2",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
