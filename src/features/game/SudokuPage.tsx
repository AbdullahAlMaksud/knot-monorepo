"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { useGameStore } from "@/shared/stores/gameStore";
import { useTranslation } from "react-i18next";
import { SudokuLogo } from "@/components/ui";
import { DifficultySelector } from "./DifficultySelector";
import { GameScreen } from "./GameScreen";
import { loadGame } from "@/shared/lib/storage";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SudokuPage() {
  const { restoreGame } = useGameStore();
  const gameView = useGameStore((s) => s.view);
  const { t } = useTranslation();
  const [hasSaved, setHasSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = loadGame();
    setHasSaved(!!saved && !saved.complete);
  }, []);

  // When game is reset, go back to home
  useEffect(() => {
    if (gameView === "home") {
      // keep showing the selector
    }
  }, [gameView, router]);

  if (gameView === "game") {
    return <GameScreen />;
  }

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
            onClick={() => router.push("/")}
          >
            ← {t("queens.back")}
          </GlassButton>
        </motion.div>
      </div>
    </div>
  );
}
