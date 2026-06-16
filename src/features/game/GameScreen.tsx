"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";
import { SudokuGrid } from "./SudokuGrid";
import { NumberPad } from "./NumberPad";
import { WinModal } from "./WinModal";
import { GlassButton } from "@/components/ui/GlassButton";
import { useGameStore, registerSoundFn } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useSound } from "@/shared/hooks/useSound";
import { formatTime } from "@/shared/lib/storage";

interface TopBarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
}

function TopBarButton({ onClick, icon, tooltip }: TopBarButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <GlassButton
        variant="ghost"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-9 h-9 flex items-center justify-center p-0 rounded-xl"
      >
        {icon}
      </GlassButton>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-[42px] pointer-events-none z-50"
          >
            <div className="whitespace-nowrap backdrop-blur-xl bg-black/75 border border-white/10 text-white/75 text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-xl">
              {tooltip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GameScreen() {
  const { elapsed, mistakes, difficulty, complete, resetGame, startGame, board } = useGameStore();
  const { getTheme } = useThemeStore();
  const { showMistakes } = useSettingsStore();
  const theme = getTheme();
  const { play } = useSound();

  // Register sound callback into the store (avoids hooks-in-store issue)
  useEffect(() => {
    registerSoundFn(play);
  }, [play]);

  const filled = board?.flat().filter((v) => v !== 0).length ?? 0;
  const total = 81;
  const progress = (filled / total) * 100;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-2.5 py-2 px-4">

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between w-full max-w-[400px]"
      >
        <TopBarButton onClick={resetGame} icon={<Home size={15} />} tooltip="Home" />

        <span
          className="text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: theme.accent }}
        >
          {difficulty}
        </span>

        <TopBarButton
          onClick={() => difficulty && startGame(difficulty)}
          icon={<RotateCcw size={15} />}
          tooltip="New Game"
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-5"
      >
        {[
          {
            value: formatTime(elapsed),
            label: "time",
            color: theme.accent,
          },
          {
            value: showMistakes ? String(mistakes) : "—",
            label: "errors",
            color: mistakes > 0 && showMistakes ? "#ef4444" : "rgba(255,255,255,0.5)",
          },
          {
            value: `${filled}`,
            label: "filled",
            color: "rgba(255,255,255,0.55)",
            suffix: `/${total}`,
          },
        ].map(({ value, label, color, suffix }, i) => (
          <div key={label} className="flex items-center gap-5">
            {i > 0 && <div className="w-px h-5 bg-white/10" />}
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-extralight tabular-nums leading-none" style={{ color }}>
                {value}
                {suffix && <span className="text-[12px] text-white/20">{suffix}</span>}
              </span>
              <span className="text-[9px] text-white/22 uppercase tracking-[0.14em] mt-0.5">{label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-[400px] h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: theme.accent, opacity: 0.55 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", damping: 22, stiffness: 120 }}
        />
      </div>

      {/* Sudoku Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[400px]"
      >
        <SudokuGrid />
      </motion.div>

      {/* Number Pad */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="w-full max-w-[400px]"
      >
        <NumberPad />
      </motion.div>

      {/* Keyboard hint */}
      <p className="text-[9px] text-white/12 tracking-[0.15em] select-none uppercase">
        arrows · 1-9 · N note · D theme · F fullscreen · P pin
      </p>

      {/* Win Modal */}
      <AnimatePresence>
        {complete && <WinModal onClose={resetGame} />}
      </AnimatePresence>
    </div>
  );
}
