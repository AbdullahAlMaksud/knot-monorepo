"use client";

import { motion } from "framer-motion";
import { Eraser, PenLine } from "lucide-react";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { cn } from "@/shared/lib/utils";

export function NumberPad() {
  const { inputNumber, eraseCell, noteMode, toggleNoteMode, board } = useGameStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();

  // Count how many of each number are placed
  const counts = Array(10).fill(0);
  board?.flat().forEach((v) => { if (v) counts[v]++; });

  return (
    <div className="flex flex-col gap-2 w-full max-w-[400px]">
      {/* 9 number buttons */}
      <div className="grid grid-cols-9 gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => {
          const done = counts[n] >= 9;
          const remaining = 9 - counts[n];
          return (
            <motion.button
              key={n}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: done ? 0.18 : 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
              onClick={() => inputNumber(n)}
              disabled={done}
              aria-label={`Number ${n}`}
              className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-center",
                "border transition-all duration-120 relative overflow-hidden group",
                "outline-none focus-visible:ring-0",
                done
                  ? "border-white/5 bg-transparent cursor-not-allowed"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/22 active:scale-90 cursor-pointer"
              )}
            >
              <span
                className="text-sm font-semibold leading-none"
                style={{ color: done ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.84)" }}
              >
                {n}
              </span>
              {!done && remaining < 9 && remaining > 0 && (
                <span
                  className="text-[7px] leading-none mt-0.5"
                  style={{ color: `${theme.accent}77` }}
                >
                  {remaining}
                </span>
              )}
              {/* Hover glow */}
              {!done && (
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                  style={{ background: `radial-gradient(circle at center, ${theme.glow}, transparent 70%)` }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Action row: Erase + Note mode */}
      <div className="flex gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          onClick={eraseCell}
          className="flex-1 h-9 rounded-xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-white/45 hover:text-white/75 outline-none"
        >
          <Eraser size={13} />
          <span className="text-[11px] font-medium">Erase</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          onClick={toggleNoteMode}
          className={cn(
            "flex-1 h-9 rounded-xl border transition-all active:scale-95 flex items-center justify-center gap-1.5 outline-none",
            noteMode
              ? "text-[var(--accent-color)] border-[var(--accent-color)] bg-[color-mix(in_srgb,var(--accent-color)_18%,transparent)]"
              : "border-white/10 bg-white/[0.035] hover:bg-white/[0.08] hover:border-white/20 text-white/45 hover:text-white/75"
          )}
          style={noteMode ? { borderColor: theme.accent, color: theme.accent, background: `${theme.accent}22` } : {}}
        >
          <PenLine size={13} />
          <span className="text-[11px] font-medium">
            Notes{noteMode ? " ●" : ""}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
