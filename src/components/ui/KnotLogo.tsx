"use client";

import { motion } from "framer-motion";

interface KnotLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function KnotLogo({ className, size = 120, animated = true }: KnotLogoProps) {
  const draw = (delay: number) => ({
    pathLength: { type: "spring" as const, stiffness: 80, damping: 14, delay },
    opacity: { duration: 0.2, delay },
  });

  const fade = (delay: number) => ({
    opacity: { duration: 0.35, delay },
    scale: { type: "spring" as const, stiffness: 120, damping: 14, delay },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer glow ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity={0.12}
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={animated ? fade(0.0) : undefined}
      />

      {/* Background fill for shape */}
      <motion.path
        d="M 50 22 C 30 22, 18 33, 18 45 C 18 55, 26 62, 36 64 C 30 70, 28 78, 34 84 C 40 90, 50 88, 56 82 C 62 90, 68 92, 74 88 C 82 82, 80 72, 73 65 C 82 62, 82 52, 82 46 C 82 33, 70 22, 50 22 Z"
        fill="currentColor"
        fillOpacity="0.06"
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={animated ? { duration: 0.5, delay: 0.0 } : undefined}
      />

      {/* Left/top strand */}
      <motion.path
        d="M 50 16 C 34 16, 20 27, 20 44 C 20 53, 26 60, 36 64 C 26 68, 20 76, 20 84"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.9"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={animated ? draw(0.08) : undefined}
      />
      {/* Right/top strand */}
      <motion.path
        d="M 50 16 C 66 16, 80 27, 80 44 C 80 53, 74 60, 64 64 C 74 68, 80 76, 80 84"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.65"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={animated ? draw(0.22) : undefined}
      />
      {/* Center crossing — over strand */}
      <motion.path
        d="M 35 64 C 40 61, 45 59, 50 58 C 55 59, 60 61, 65 64"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="1"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={animated ? draw(0.34) : undefined}
      />
      {/* Bottom left strand */}
      <motion.path
        d="M 20 84 C 20 90, 28 96, 38 92 C 44 89, 47 84, 50 80"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.9"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={animated ? draw(0.44) : undefined}
      />
      {/* Bottom right strand */}
      <motion.path
        d="M 80 84 C 80 90, 72 96, 62 92 C 56 89, 53 84, 50 80"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.65"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={animated ? draw(0.52) : undefined}
      />

      {/* Center node dot */}
      <motion.circle
        cx="50"
        cy="69"
        r="4.5"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        initial={animated ? { scale: 0, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={animated ? fade(0.65) : undefined}
        style={{ transformOrigin: "50px 69px" }}
      />
      {/* Top node dot */}
      <motion.circle
        cx="50"
        cy="16"
        r="4.5"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        initial={animated ? { scale: 0, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={animated ? fade(0.70) : undefined}
        style={{ transformOrigin: "50px 16px" }}
      />
    </svg>
  );
}
