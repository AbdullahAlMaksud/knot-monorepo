"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member1.jpg",
    description:
      "With over 15 years of experience in dermatology, Dr. Johnson specializes in cosmetic and medical dermatology.",
  },
  {
    id: 2,
    name: "Dr. Aisha Rahman",
    role: "Research Director",
    credential: "PhD, Cosmetic Science",
    image: "/images/team/member2.jpg",
    description:
      "Dr. Rahman brings extensive research expertise in natural ingredients and sustainable skincare.",
  },
  {
    id: 3,
    name: "Dr. Marcus Chen",
    role: "Biochemist",
    credential: "PhD, Biochemistry",
    image: "/images/team/member3.jpg",
    description:
      "Dr. Chen's deep expertise in biochemistry drives the molecular science behind every B'You formula.",
  },
  {
    id: 4,
    name: "Dr. Priya Nair",
    role: "Clinical Trials Lead",
    credential: "MD, Clinical Research",
    image: "/images/team/member4.jpg",
    description:
      "Dr. Nair oversees all clinical validation studies at B'You, ensuring every product is backed by robust evidence.",
  },
];

// 2 cards visible at once; snaps every 2 cards
const CARDS_PER_SNAP = 2;
const TOTAL_PAGES = Math.ceil(teamMembers.length / CARDS_PER_SNAP);

interface Member {
  id: number;
  name: string;
  role: string;
  credential: string;
  image: string;
  description: string;
}

/* Each card takes exactly half the outer container — no page wrappers */
const MemberCard = ({
  member,
  widthPx,
}: {
  member: Member;
  widthPx: number;
}) => (
  <div
    className="group flex flex-col items-center text-center shrink-0 px-2 sm:px-3"
    style={{ width: widthPx ? widthPx / 2 : undefined, minWidth: 0 }}
  >
    <div className="relative w-full rounded-2xl overflow-hidden mb-4 aspect-[3/4]">
      <Image
        src={member.image}
        alt={member.name}
        fill
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none select-none"
      />
    </div>
    <div className="w-full select-none">
      <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-xl lg:text-2xl">
        {member.name}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-2">{member.role}</p>
      <span className="inline-block bg-black text-white font-medium rounded-full uppercase tracking-wide text-[9px] sm:text-xs px-3 sm:px-5 py-1.5 sm:py-2">
        {member.credential}
      </span>
    </div>
  </div>
);

/* ── Main ── */
const Team2 = () => {
  const outerRef = useRef<HTMLDivElement>(null); // overflow:hidden viewport
  const trackRef = useRef<HTMLDivElement>(null); // the flat, moving strip

  const mobileRef = useRef<HTMLDivElement>(null); // mobile native scroll

  const [currentPage, setCurrentPage] = useState(0);
  const [outerWidth, setOuterWidth] = useState(0); // measured in px

  // Custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Drag bookkeeping — refs only, no re-renders during drag
  const drag = useRef({ active: false, startX: 0, baseX: 0, liveX: 0 });

  // Lerp animation
  const animX = useRef(0);
  const targetX = useRef(0);
  const raf = useRef<number | null>(null);

  /* helpers */
  const maxNeg = useCallback(
    () => -(TOTAL_PAGES - 1) * outerWidth,
    [outerWidth]
  );
  const clamp = useCallback(
    (v: number) => Math.max(maxNeg(), Math.min(0, v)),
    [maxNeg]
  );
  const setTransform = (x: number) => {
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${x}px)`;
  };

  /* Lerp loop */
  const startLerp = useCallback(() => {
    if (raf.current !== null) return;
    const tick = () => {
      const diff = targetX.current - animX.current;
      if (Math.abs(diff) < 0.3) {
        animX.current = targetX.current;
        setTransform(animX.current);
        raf.current = null;
        return;
      }
      animX.current += diff * 0.13;
      setTransform(animX.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  /* Snap to page */
  const snapToPage = useCallback(
    (page: number) => {
      const p = Math.max(0, Math.min(TOTAL_PAGES - 1, page));
      targetX.current = clamp(-p * outerWidth);
      setCurrentPage(p);
      startLerp();
    },
    [clamp, outerWidth, startLerp]
  );

  /* Measure outer width — needed so cards can be exactly 50% */
  useEffect(() => {
    const measure = () => {
      const w = outerRef.current?.clientWidth ?? 0;
      setOuterWidth(w);
      // Keep current page position after resize
      const x = clamp(-currentPage * w);
      animX.current = x;
      targetX.current = x;
      setTransform(x);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Mouse drag */
  const updateCursor = (e: React.MouseEvent) => {
    const cursor = cursorRef.current;
    const container = outerRef.current?.parentElement;
    if (!cursor || !container) return;
    const r = container.getBoundingClientRect();
    cursor.style.left = `${e.clientX - r.left}px`;
    cursor.style.top = `${e.clientY - r.top}px`;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
    drag.current = {
      active: true,
      startX: e.clientX,
      baseX: animX.current,
      liveX: animX.current,
    };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCursor(e);
    if (!drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    const next = clamp(drag.current.baseX + delta);
    drag.current.liveX = next;
    animX.current = next;
    targetX.current = next;
    setTransform(next);
  };

  const onMouseUp = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const page = Math.round(-drag.current.liveX / outerWidth);
    snapToPage(page);
  }, [outerWidth, snapToPage]);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [onMouseUp]);

  /* Mobile scroll indicator */
  const onMobileScroll = () => {
    const el = mobileRef.current;
    if (!el) return;
    setCurrentPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 tracking-wider mb-3 text-sm">
            Our Advisory Board
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
            Meet the Experts &amp; Advisors Behind B&apos;You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Discover the global formulation experts and skincare advisors whose
            experience and research shape every B&apos;You product with science,
            safety, and precision.
          </p>
        </div>

        {/* Carousel area */}
        <div
          className="relative"
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => {
            setCursorVisible(false);
            onMouseUp();
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          style={{ cursor: "none" }}
        >
          {/* Custom DRAG cursor */}
          <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none absolute z-30 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-[10px] font-semibold uppercase tracking-widest -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >
            drag
          </div>

          {/* DESKTOP: flat track — all cards in one row, each 50% wide */}
          <div ref={outerRef} className="hidden md:block overflow-hidden select-none">
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {teamMembers.map((m) => (
                <MemberCard key={m.id} member={m} widthPx={outerWidth} />
              ))}
            </div>
          </div>

          {/* MOBILE: native scroll — grouped 2 per snap */}
          <div
            ref={mobileRef}
            onScroll={onMobileScroll}
            className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Array.from({ length: TOTAL_PAGES }, (_, pi) => (
              <div
                key={pi}
                className="flex gap-3 min-w-full snap-start shrink-0"
              >
                {teamMembers
                  .slice(pi * CARDS_PER_SNAP, (pi + 1) * CARDS_PER_SNAP)
                  .map((m) => (
                    <MemberCard key={m.id} member={m} widthPx={0} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => snapToPage(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label="Previous"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => snapToPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === currentPage ? "w-5 h-2 bg-black" : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => snapToPage(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES - 1}
            aria-label="Next"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Team2;
