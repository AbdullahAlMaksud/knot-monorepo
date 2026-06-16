"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Flame, Gem } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGameStore } from "@/shared/stores/gameStore";
import { loadStats, formatTime } from "@/shared/lib/storage";
import type { Difficulty } from "@/shared/lib/sudoku";

const DIFFICULTIES: {
  id: Difficulty;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}[] = [
    { id: "easy", label: "Easy", desc: "36 clues · relaxed", icon: <Clock size={13} />, color: "#10b981" },
    { id: "medium", label: "Medium", desc: "30 clues · balanced", icon: <Zap size={13} />, color: "#f59e0b" },
    { id: "hard", label: "Hard", desc: "24 clues · intense", icon: <Flame size={13} />, color: "#f97316" },
    { id: "expert", label: "Expert", desc: "18 clues · extreme", icon: <Gem size={13} />, color: "#ef4444" },
  ];

interface DifficultySelectorProps {
  onSelectDifficulty?: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ onSelectDifficulty }: DifficultySelectorProps) {
  const { startGame } = useGameStore();
  const stats = loadStats();

  const handleSelect = (id: Difficulty) => {
    if (onSelectDifficulty) {
      onSelectDifficulty(id);
    } else {
      startGame(id);
    }
  };

  return (
    <GlassCard intensity="medium" className="p-4 w-full">
      <p className="text-[10px] text-white/25 uppercase tracking-[0.18em] mb-4 font-medium">
        Difficulty
      </p>
      <div className="grid grid-cols-2 gap-2">
        {DIFFICULTIES.map(({ id, label, desc, icon, color }, i) => {
          const s = stats[id];
          const won = s?.gamesWon ?? 0;
          const best = s?.bestTime ?? 0;
          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.06 }}
              onClick={() => handleSelect(id)}
              className="group relative flex flex-col items-start p-3 rounded-xl text-left overflow-hidden transition-all duration-150 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ color }}>{icon}</span>
                <span className="text-[13px] font-semibold text-white/80">{label}</span>
              </div>

              {/* Description */}
              <span className="text-[10px] text-white/30">{desc}</span>

              {/* Stats */}
              {won > 0 && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[9px] text-white/22">{won} won</span>
                  {best > 0 && (
                    <span className="text-[9px]" style={{ color: `${color}aa` }}>
                      · {formatTime(best)}
                    </span>
                  )}
                </div>
              )}

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                style={{ boxShadow: `inset 0 0 18px ${color}14` }}
              />
            </motion.button>
          );
        })}
      </div>
    </GlassCard>
  );
}
