"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { hexToRgba } from "../lib/themes";
import { QueenIcon } from "./QueenIcon";
import type { CellState } from "../lib/types";

type QueensCellProps = {
  state: CellState;
  regionColor: string;
  isConflict: boolean;
  row: number;
  col: number;
  regionEdges: { top: boolean; right: boolean; bottom: boolean; left: boolean };
  onClick: () => void;
  disabled?: boolean;
  isLight?: boolean;
};

export function QueensCell({
  state,
  regionColor,
  isConflict,
  row,
  col,
  regionEdges,
  onClick,
  disabled,
  isLight,
}: QueensCellProps) {
  const borderDark = isLight ? "rgba(15,23,42,0.25)" : "rgba(10,10,20,0.55)";
  const borderInner = hexToRgba(regionColor, isLight ? 0.2 : 0.35);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Row ${row + 1}, column ${col + 1}, ${state}`}
      className={cn(
        "relative aspect-square w-full transition-transform duration-150 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        "hover:brightness-125 active:scale-[0.95]",
        isConflict && "queens-conflict-shake"
      )}
      style={{
        backgroundColor: hexToRgba(regionColor, isLight ? 0.2 : 0.32),
        borderTop: `${regionEdges.top ? 2 : 1}px solid ${regionEdges.top ? borderDark : borderInner}`,
        borderLeft: `${regionEdges.left ? 2 : 1}px solid ${regionEdges.left ? borderDark : borderInner}`,
        borderRight: `${regionEdges.right ? 2 : 1}px solid ${regionEdges.right ? borderDark : borderInner}`,
        borderBottom: `${regionEdges.bottom ? 2 : 1}px solid ${regionEdges.bottom ? borderDark : borderInner}`,
        boxShadow: isConflict
          ? `inset 0 0 0 2px #fb7185, 0 0 14px ${hexToRgba("#fb7185", 0.5)}`
          : "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <AnimatePresence mode="wait">
        {state === "queen" && (
          <motion.div
            key="queen"
            initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <QueenIcon
              className={cn(
                "h-[58%] w-[58%] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]",
                isConflict ? "text-[#fb7185]" : isLight ? "text-slate-800" : "text-white"
              )}
            />
          </motion.div>
        )}
        {state === "marked" && (
          <motion.div
            key="marked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className="text-[42%] font-semibold"
              style={{ color: isLight ? "rgba(15,23,42,0.45)" : "rgba(245,246,251,0.55)" }}
            >
              &times;
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
