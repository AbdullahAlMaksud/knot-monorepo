"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, XCircle, RotateCcw, Home, ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { formatTime, loadStats } from "@/shared/lib/storage";
import type { Difficulty } from "@/shared/lib/sudoku";

const DIFF_ORDER: Difficulty[] = ["easy", "medium", "hard", "expert"];

interface WinModalProps {
  onClose: () => void;
}

export function WinModal({ onClose }: WinModalProps) {
  const { elapsed, mistakes, difficulty, startGame, resetGame } = useGameStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const stats = loadStats();
  const currentStats = difficulty ? stats[difficulty] : null;
  const isPersonalBest = !!(currentStats?.bestTime && currentStats.bestTime === elapsed);
  const nextDiff = difficulty ? DIFF_ORDER[DIFF_ORDER.indexOf(difficulty) + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(14px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 20, stiffness: 260, delay: 0.05 }}
        className="w-full max-w-[268px] mx-4"
      >
        <GlassCard intensity="high" className="p-5 flex flex-col items-center text-center gap-4">

          {/* Trophy icon */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.15 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `${theme.accent}1e`,
                border: `1.5px solid ${theme.accent}44`,
                boxShadow: `0 0 24px ${theme.glow}`,
              }}
            >
              <Trophy size={26} style={{ color: theme.accent }} />
            </motion.div>
            {isPersonalBest && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                style={{ background: theme.accent, color: theme.accentFg }}
              >
                PB!
              </motion.div>
            )}
          </div>

          {/* Title */}
          <div>
            <h2 className="text-[17px] font-semibold text-white/90 leading-tight">
              Puzzle Complete
            </h2>
            <p className="text-[11px] text-white/35 capitalize mt-0.5">
              {difficulty} difficulty
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            {[
              { label: "Time", value: formatTime(elapsed), icon: <Clock size={11} />, color: theme.accent },
              { label: "Mistakes", value: String(mistakes), icon: <XCircle size={11} />, color: mistakes > 0 ? "#ef4444" : "rgba(255,255,255,0.5)" },
            ].map(({ label, value, icon, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-xl py-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {icon}
                  <span className="text-[9px] uppercase tracking-widest">{label}</span>
                </div>
                <span className="text-[22px] font-thin tabular-nums leading-none" style={{ color }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => difficulty && startGame(difficulty)}
              className="w-full py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              style={{ background: theme.accent, color: theme.accentFg }}
            >
              <RotateCcw size={13} />
              Play Again
            </button>

            {nextDiff && (
              <button
                onClick={() => startGame(nextDiff)}
                className="w-full py-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1 transition-all active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Try {nextDiff.charAt(0).toUpperCase() + nextDiff.slice(1)}
                <ChevronRight size={13} />
              </button>
            )}

            <button
              onClick={resetGame}
              className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <Home size={12} />
              Home
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
