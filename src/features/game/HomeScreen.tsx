"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Grid3X3, Puzzle, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { loadGame } from "@/shared/lib/storage";
import { DifficultySelector } from "./DifficultySelector";
import { SudokuLogo } from "@/components/ui";
import { useTranslation } from "react-i18next";

type HomeView = "hub" | "sudoku-select";

interface HomeScreenProps {
  onNavigateQueens?: () => void;
}

export function HomeScreen({ onNavigateQueens }: HomeScreenProps) {
  const { restoreGame } = useGameStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const [hasSaved, setHasSaved] = useState(false);
  const [view, setView] = useState<HomeView>("hub");
  const { t } = useTranslation();

  useEffect(() => {
    const saved = loadGame();
    setHasSaved(!!saved && !saved.complete);
  }, []);

  // If showing Sudoku difficulty selector
  if (view === "sudoku-select") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-5 w-full max-w-[320px] px-4">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center text-center"
          >
            <SudokuLogo size={80} className="text-[var(--accent)] mb-4" />
            <p className="text-[10px] font-semibold tracking-[0.3em] text-white/20 uppercase mb-2">
              {t("home.focus")}
            </p>
            <h1 className="text-[52px] font-extralight tracking-[0.08em] text-white/88 leading-none">
              {t("home.sudoku")}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="w-full"
          >
            <DifficultySelector />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            className="flex flex-col items-center gap-2.5 w-full"
          >
            {hasSaved && (
              <GlassButton
                variant="outline"
                size="sm"
                className="w-full text-white/40"
                onClick={() => restoreGame()}
              >
                {t("home.resume")}
              </GlassButton>
            )}
            <GlassButton
              variant="ghost"
              size="sm"
              className="text-white/25"
              onClick={() => setView("hub")}
            >
              ← {t("queens.back")}
            </GlassButton>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game Hub view
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-6 w-full max-w-[380px] px-4">

        {/* Hub Title */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center gap-3">
            <Sparkles size={18} className="text-white/20" />
            <p className="text-[10px] font-semibold tracking-[0.3em] text-white/20 uppercase">
              {t("home.game_hub_title")}
            </p>
            <Sparkles size={18} className="text-white/20" />
          </div>
          <p className="text-[11px] text-white/35">
            {t("home.game_hub_subtitle")}
          </p>
        </motion.div>

        {/* Game Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="w-full flex flex-col gap-3"
        >
          {/* Sudoku Card */}
          <GameCard
            icon={<SudokuLogo size={28} />}
            title={t("home.sudoku")}
            description={t("home.sudoku_desc")}
            accent={theme.accent}
            onClick={() => setView("sudoku-select")}
            delay={0}
          />

          {/* Queens Card */}
          <GameCard
            icon={<Crown size={24} />}
            title={t("queens.title")}
            description={t("home.queens_desc")}
            accent={theme.accent}
            onClick={onNavigateQueens}
            delay={0.06}
          />

          {/* Coming Soon Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard intensity="low" className="p-4 flex items-center gap-4 opacity-40 cursor-default">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.12)" }}
              >
                <Puzzle size={22} className="text-white/25" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white/35">
                  {t("home.coming_soon")}
                </p>
                <p className="text-[10px] text-white/15 mt-0.5">
                  More puzzles on the way...
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48 }}
          className="flex flex-col items-center gap-2.5"
        >
          {hasSaved && (
            <GlassButton
              variant="outline"
              size="sm"
              className="text-white/40"
              onClick={() => restoreGame()}
            >
              {t("home.resume")}
            </GlassButton>
          )}
          <p className="text-[9px] text-white/12 tracking-[0.22em] uppercase">
            {t("home.footer")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ── Game Card component ─────────────────────────────────────────────
function GameCard({
  icon,
  title,
  description,
  accent,
  onClick,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 + delay }}
      onClick={onClick}
      className="group relative w-full flex items-center gap-4 p-4 rounded-2xl text-left overflow-hidden transition-all duration-200 active:scale-[0.98]"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
        style={{ background: accent, color: "#0a0a0a" }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-white/85 capitalize">
          {title}
        </p>
        <p className="text-[11px] text-white/35 mt-0.5">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <div className="text-white/20 group-hover:text-white/50 transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 24px ${accent}12` }}
      />
    </motion.button>
  );
}
