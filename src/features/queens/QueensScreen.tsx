"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, RotateCcw, Undo2, HelpCircle } from "lucide-react";
import { QueensBoard } from "./components/QueensBoard";
import { QueenIcon } from "./components/QueenIcon";
import { QueensWinModal } from "./components/QueensWinModal";
import { QueensHowToPlay } from "./components/QueensHowToPlay";
import { QueensConfetti } from "./components/QueensConfetti";
import { GlassButton } from "@/components/ui/GlassButton";
import { useQueensEngine } from "./hooks/useQueensEngine";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useTranslation } from "react-i18next";
import { todaySeedString } from "./lib/rng";
import { QueensHomeScreen } from "./QueensHomeScreen";
import type { Difficulty } from "./lib/types";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface QueensScreenProps {
  onBack: () => void;
}

export function QueensScreen({ onBack }: QueensScreenProps) {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { t } = useTranslation();

  const {
    mode,
    difficulty,
    board,
    cells,
    conflicts,
    mistakes,
    elapsed,
    solved,
    generating,
    streak,
    cycleCell,
    undo,
    canUndo,
    clearBoard,
    startNewGame,
  } = useQueensEngine();

  const [showHome, setShowHome] = useState(true);
  const [howToOpen, setHowToOpen] = useState(false);
  const [winOpen, setWinOpen] = useState(false);

  if (solved && !winOpen) setWinOpen(true);

  const handleStartGame = (diff: Difficulty) => {
    setShowHome(false);
    startNewGame("practice", diff);
  };

  const handleBackToHome = () => {
    setShowHome(true);
    setWinOpen(false);
  };

  if (showHome) {
    return <QueensHomeScreen onStartGame={handleStartGame} />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-2.5 py-2 px-4">

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between w-full max-w-[400px]"
      >
        <div className="flex items-center gap-1">
          <TopBarButton
            onClick={handleBackToHome}
            icon={<Home size={15} />}
            tooltip={t("queens.back")}
            theme={theme}
          />
          <TopBarButton
            onClick={() => setHowToOpen(true)}
            icon={<HelpCircle size={15} />}
            tooltip={t("queens.how_to_play")}
            theme={theme}
          />
        </div>

        <span
          className="text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: theme.accent }}
        >
          {t(`queens.difficulty_${difficulty}`)}
        </span>

        <div className="flex items-center gap-1">
          <TopBarButton
            onClick={undo}
            icon={<Undo2 size={15} />}
            tooltip={t("queens.undo")}
            theme={theme}
            disabled={!canUndo}
          />
          <TopBarButton
            onClick={() => startNewGame("practice", difficulty)}
            icon={<RotateCcw size={15} />}
            tooltip={t("queens.new_game")}
            theme={theme}
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-5"
      >
        {[
          { value: formatTime(elapsed), label: t("queens.time"), color: theme.accent },
          {
            value: mistakes.toString(),
            label: t("queens.mistakes"),
            color: mistakes > 0 ? "#ef4444" : "rgba(255,255,255,0.5)",
          },
        ].map(({ value, label, color }, i) => (
          <div key={label} className="flex items-center gap-5">
            {i > 0 && <div className="w-px h-5 bg-white/10" />}
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-extralight tabular-nums leading-none" style={{ color }}>
                {value}
              </span>
              <span className="text-[9px] text-white/22 uppercase tracking-[0.14em] mt-0.5">{label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[min(92vw,66vh,420px)]"
      >
        {board && !generating ? (
          <QueensBoard
            board={board}
            cells={cells}
            conflicts={conflicts}
            onCellClick={cycleCell}
            disabled={solved}
            isLight={theme.isLight}
          />
        ) : (
          <div
            className="flex aspect-square w-full items-center justify-center rounded-2xl"
            style={{
              background: theme.isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.1)",
              border: `1px solid ${theme.isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.22)"}`,
            }}
          >
            <QueenIcon className="h-10 w-10 animate-pulse" />
          </div>
        )}
      </motion.div>

      {/* Mode label */}
      <p className="text-center text-xs text-white/35">
        {t(`queens.difficulty_${difficulty}`)} · {t("queens.tap_hint")}
      </p>

      {/* How to play dialog */}
      <QueensHowToPlay open={howToOpen} onClose={() => setHowToOpen(false)} />

      {/* Win modal */}
      <AnimatePresence>
        {winOpen && (
          <QueensWinModal
            elapsed={elapsed}
            mistakes={mistakes}
            streak={streak.streak}
            showStreak={mode === "daily"}
            onNewPuzzle={() => {
              setWinOpen(false);
              startNewGame("practice", difficulty);
            }}
            onClose={() => setWinOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Confetti */}
      <QueensConfetti active={solved && winOpen} />
    </div>
  );
}

// ── TopBarButton ──────────────────────────────────────────────────────────
function TopBarButton({
  onClick,
  icon,
  tooltip,
  theme,
  disabled,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  theme: { accent: string; isLight?: boolean };
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <GlassButton
        variant="ghost"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-9 h-9 flex items-center justify-center p-0 rounded-xl"
        disabled={disabled}
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
            <div
              className="whitespace-nowrap backdrop-blur-xl bg-black/75 border text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-xl"
              style={{ color: "rgba(255, 255, 255, 0.75)", borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              {tooltip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
