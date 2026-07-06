import { motion } from "framer-motion";
import { Clock, Zap, Flame, Gem } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGameStore } from "@/shared/stores/gameStore";
import { loadStats, formatTime } from "@/shared/lib/storage";
import type { Difficulty } from "@/shared/lib/sudoku";
import { useTranslation } from "react-i18next";
import { translateNumber } from "@/shared/lib/i18n";

const DIFFICULTIES: {
  id: Difficulty;
  icon: React.ReactNode;
  color: string;
}[] = [
    { id: "easy", icon: <Clock size={13} />, color: "#10b981" },
    { id: "medium", icon: <Zap size={13} />, color: "#f59e0b" },
    { id: "hard", icon: <Flame size={13} />, color: "#f97316" },
    { id: "expert", icon: <Gem size={13} />, color: "#ef4444" },
  ];

interface DifficultySelectorProps {
  onSelectDifficulty?: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ onSelectDifficulty }: DifficultySelectorProps) {
  const { startGame } = useGameStore();
  const stats = loadStats();
  const { t, i18n } = useTranslation();

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
        {t("difficulty.difficulty_label")}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {DIFFICULTIES.map(({ id, icon, color }, i) => {
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
                <span className="text-[13px] font-semibold text-white/80">
                  {t(`difficulty.${id}`)}
                </span>
              </div>

              {/* Description */}
              <span className="text-[10px] text-white/30">
                {id === "easy" && t("difficulty.clues", { count: translateNumber(36, i18n.language) }) + (i18n.language === "bn" ? " · আরামদায়ক" : " · relaxed")}
                {id === "medium" && t("difficulty.clues", { count: translateNumber(30, i18n.language) }) + (i18n.language === "bn" ? " · ভারসাম্যপূর্ণ" : " · balanced")}
                {id === "hard" && t("difficulty.clues", { count: translateNumber(24, i18n.language) }) + (i18n.language === "bn" ? " · তীব্র" : " · intense")}
                {id === "expert" && t("difficulty.clues", { count: translateNumber(18, i18n.language) }) + (i18n.language === "bn" ? " · চরম" : " · extreme")}
              </span>

              {/* Stats */}
              {won > 0 && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[9px] text-white/22">
                    {t("scores.won_count", { count: translateNumber(won, i18n.language) })}
                  </span>
                  {best > 0 && (
                    <span className="text-[9px]" style={{ color: `${color}aa` }}>
                      · {translateNumber(formatTime(best), i18n.language)}
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
