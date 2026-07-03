"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Flame, Gem } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { QueenIcon } from "./components/QueenIcon";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useTranslation } from "react-i18next";
import type { Difficulty } from "./lib/types";

const DIFFICULTIES: {
  id: Difficulty;
  icon: React.ReactNode;
  color: string;
  sizeLabel: string;
}[] = [
  { id: "easy", icon: <Clock size={13} />, color: "#10b981", sizeLabel: "6×6" },
  { id: "medium", icon: <Zap size={13} />, color: "#f59e0b", sizeLabel: "7×7" },
  { id: "hard", icon: <Flame size={13} />, color: "#f97316", sizeLabel: "8×8" },
  { id: "expert", icon: <Gem size={13} />, color: "#ef4444", sizeLabel: "9×9" },
];

interface QueensHomeScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

export function QueensHomeScreen({ onStartGame }: QueensHomeScreenProps) {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-5 w-full max-w-[320px] px-4">

        {/* Title & Icon */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ background: theme.accent }}
          >
            <QueenIcon className="h-12 w-12" />
          </div>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/20 uppercase mb-2">
            {t("queens.tagline")}
          </p>
          <h1 className="text-[52px] font-extralight tracking-[0.08em] text-white/88 leading-none">
            {t("queens.title")}
          </h1>
        </motion.div>

        {/* Difficulty grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="w-full"
        >
          <GlassCard intensity="medium" className="p-4 w-full">
            <p className="text-[10px] text-white/25 uppercase tracking-[0.18em] mb-4 font-medium">
              {t("queens.select_difficulty")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DIFFICULTIES.map(({ id, icon, color, sizeLabel }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06 }}
                  onClick={() => onStartGame(id)}
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
                  <div className="flex items-center gap-1.5 mb-1">
                    <span style={{ color }}>{icon}</span>
                    <span className="text-[13px] font-semibold text-white/80">
                      {t(`queens.difficulty_${id}`)}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/30">
                    {sizeLabel} · {t(`queens.difficulty_${id}_desc`)}
                  </span>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                    style={{ boxShadow: `inset 0 0 18px ${color}14` }}
                  />
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48 }}
          className="flex flex-col items-center gap-2.5 w-full"
        >
          <p className="text-[9px] text-white/12 tracking-[0.22em] uppercase">
            {t("queens.footer")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
