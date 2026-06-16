"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { useGameStore } from "@/shared/stores/gameStore";
import { loadGame } from "@/shared/lib/storage";
import { DifficultySelector } from "./DifficultySelector";

export function HomeScreen() {
  const { restoreGame } = useGameStore();
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const saved = loadGame();
    setHasSaved(!!saved && !saved.complete);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-5 w-full max-w-[320px] px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="text-center"
        >
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/20 uppercase mb-2">
            Focus
          </p>
          <h1 className="text-[52px] font-extralight tracking-[0.08em] text-white/88 leading-none">
            sudoku
          </h1>
        </motion.div>

        {/* Difficulty grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="w-full"
        >
          <DifficultySelector />
        </motion.div>

        {/* Resume + footer */}
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
              ↩ Resume last game
            </GlassButton>
          )}
          <p className="text-[9px] text-white/12 tracking-[0.22em] uppercase">
            Focus · Rest · Repeat
          </p>
        </motion.div>
      </div>
    </div>
  );
}

