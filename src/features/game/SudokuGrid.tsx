"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/shared/stores/gameStore";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { getConflicts } from "@/shared/lib/sudoku";
import { cn } from "@/shared/lib/utils";

export function SudokuGrid() {
  const { board, given, selected, solution, notes, selectCell } = useGameStore();
  const { highlightEnabled } = useSettingsStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const shakeRef = useRef<number | null>(null);

  if (!board || !given) return null;

  const conflicts = getConflicts(board);
  const [sr, sc] = selected ?? [-1, -1];
  const selVal = sr >= 0 ? board[sr][sc] : 0;

  // Border classes per cell position
  const getBorderClass = (r: number, c: number) => {
    const classes: string[] = [];
    if (c === 2 || c === 5) classes.push("!border-r-[1.5px] !border-r-white/22");
    if (r === 2 || r === 5) classes.push("!border-b-[1.5px] !border-b-white/22");
    if (c === 8) classes.push("!border-r-0");
    if (r === 8) classes.push("!border-b-0");
    return classes.join(" ");
  };

  return (
    <div
      className="aspect-square w-full max-w-[400px] rounded-2xl overflow-hidden"
      style={{
        boxShadow: `0 0 0 1.5px ${theme.isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"}, 0 0 40px ${theme.glow}`,
        background: theme.isLight ? "rgba(15,23,42,0.025)" : "rgba(255,255,255,0.025)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="grid grid-cols-9 h-full w-full">
        {board.map((row, r) =>
          row.map((_, c) => {
            const idx = r * 9 + c;
            const v = board[r][c];
            const isGiven = given[r][c];
            const isSelected = sr === r && sc === c;
            const isSameBox =
              Math.floor(sr / 3) === Math.floor(r / 3) &&
              Math.floor(sc / 3) === Math.floor(c / 3);
            const isRelated =
              highlightEnabled && (sr === r || sc === c || isSameBox) && !isSelected;
            const isSameNum =
              highlightEnabled && selVal !== 0 && v === selVal && !isSelected;
            const isConflict = conflicts.has(idx) && !isGiven;
            const noteSet = notes[idx];

            // Background colour logic
            let bg = "transparent";
            if (isSelected)   bg = `${theme.accent}2a`;
            else if (isSameNum) bg = `${theme.accent}16`;
            else if (isRelated) bg = theme.isLight ? "rgba(15,23,42,0.035)" : "rgba(255,255,255,0.035)";

            // Text colour logic
            let textColor = theme.isLight ? "rgba(15,23,42,0.88)" : "rgba(255,255,255,0.88)";
            if (!isGiven && v !== 0) {
              textColor = isConflict ? "#ef4444" : theme.accent;
            }

            return (
              <button
                key={idx}
                onClick={() => selectCell(r, c)}
                tabIndex={-1}
                aria-label={`Row ${r + 1} Col ${c + 1}${v ? ` value ${v}` : ""}`}
                className={cn(
                  "relative flex items-center justify-center",
                  "border-r border-r-white/[0.07] border-b border-b-white/[0.07]",
                  "transition-colors duration-100 outline-none select-none",
                  "cursor-pointer focus-visible:ring-0",
                  getBorderClass(r, c)
                )}
                style={{ background: bg }}
              >
                {/* Selected cell ring */}
                {isSelected && (
                  <span
                    className="absolute inset-[1px] rounded-[3px] pointer-events-none"
                    style={{
                      boxShadow: `0 0 0 1.5px ${theme.accent}88, inset 0 0 10px ${theme.glow}`,
                    }}
                  />
                )}

                {/* Cell value */}
                {v !== 0 && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${idx}-${v}`}
                      initial={{ scale: 0.45, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.45, opacity: 0 }}
                      transition={{ duration: 0.11, ease: "easeOut" }}
                      className="leading-none pointer-events-none"
                      style={{
                        fontSize: "clamp(11px, 2.4vw, 18px)",
                        fontWeight: isGiven ? 700 : 500,
                        color: textColor,
                      }}
                    >
                      {v}
                    </motion.span>
                  </AnimatePresence>
                )}

                {/* Notes mini-grid */}
                {v === 0 && noteSet && noteSet.size > 0 && (
                  <div className="grid grid-cols-3 w-full h-full p-px pointer-events-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <span
                        key={n}
                        className="flex items-center justify-center leading-none"
                        style={{
                          fontSize: "clamp(4px, 0.85vw, 7px)",
                          color: noteSet.has(n) ? `${theme.accent}bb` : "transparent",
                          fontWeight: 500,
                        }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
