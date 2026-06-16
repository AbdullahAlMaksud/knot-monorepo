"use client";

import { motion } from "framer-motion";

interface SudokuLogoProps {
  className?: string;
  size?: number;
}

export function SudokuLogo({ className, size = 120 }: SudokuLogoProps) {
  const W = 26;
  const boxes = [
    // Row 0
    { id: 0, x: 0,  y: 0,  type: "filled",  text: "5", color: "bg" },
    { id: 1, x: 28, y: 0,  type: "stroke",  text: "4", color: "accent" },
    { id: 2, x: 56, y: 0,  type: "stroke",  text: "2", color: "accent" },
    // Row 1
    { id: 3, x: 0,  y: 28, type: "stroke",  text: "1", color: "accent" },
    { id: 4, x: 28, y: 28, type: "stroke",  text: "8", color: "accent" },
    { id: 5, x: 62, y: 28, type: "filled",  text: "",  color: "accent", shift: true },
    // Row 2
    { id: 6, x: 0,  y: 56, type: "filled",  text: "9", color: "bg" },
    { id: 7, x: 28, y: 56, type: "stroke",  text: "6", color: "accent" },
    { id: 8, x: 56, y: 56, type: "stroke",  text: "3", color: "accent" },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(60, 60) rotate(-14) translate(-42, -42)">
        {boxes.map((box, i) => {
          const cx = box.x + W / 2;
          const cy = box.y + W / 2;

          return (
            <g key={box.id}>
              {/* Box Shape */}
              <motion.rect
                x={box.x}
                y={box.y}
                width={W}
                height={W}
                rx={5}
                ry={5}
                stroke="currentColor"
                strokeWidth={2.5}
                fill={box.type === "filled" ? "currentColor" : "transparent"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                  delay: i * 0.05,
                }}
                style={{ originX: `${cx}px`, originY: `${cy}px` }}
              />

              {/* Box Digit Text */}
              {box.text && (
                <motion.text
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fill={box.color === "bg" ? "var(--bg-app, #080808)" : "currentColor"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.05 + 0.15,
                  }}
                  style={{
                    originX: `${cx}px`,
                    originY: `${cy}px`,
                    pointerEvents: "none",
                    userSelect: "none"
                  }}
                >
                  {box.text}
                </motion.text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
