"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QueenIcon } from "./QueenIcon";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useTranslation } from "react-i18next";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

type QueensWinModalProps = {
  elapsed: number;
  mistakes: number;
  streak: number;
  showStreak: boolean;
  onNewPuzzle: () => void;
  onClose: () => void;
};

export function QueensWinModal({
  elapsed,
  mistakes,
  streak,
  showStreak,
  onNewPuzzle,
  onClose,
}: QueensWinModalProps) {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-[92vw] max-w-sm rounded-2xl p-6"
          style={{
            background: theme.isLight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.1)",
            border: `1px solid ${theme.isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.22)"}`,
            backdropFilter: "blur(26px) saturate(160%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Crown icon */}
          <div
            className="queens-win-glow mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: theme.accent }}
          >
            <QueenIcon className="h-9 w-9" style-override={theme.accentFg} />
          </div>

          <div className="mb-4 text-center">
            <h2
              className="text-xl font-semibold"
              style={{ color: theme.isLight ? "#0f172a" : "#f5f6fb" }}
            >
              {t("queens.win_title")}
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: theme.isLight ? "rgba(15,23,42,0.6)" : "rgba(245,246,251,0.62)" }}
            >
              {t("queens.win_subtitle")}
            </p>
          </div>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: theme.isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.055)",
                border: `1px solid ${theme.isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.14)"}`,
              }}
            >
              <p className="text-[11px]" style={{ color: theme.isLight ? "rgba(15,23,42,0.5)" : "rgba(245,246,251,0.62)" }}>
                {t("queens.time")}
              </p>
              <p className="font-mono text-lg font-semibold" style={{ color: theme.isLight ? "#0f172a" : "#f5f6fb" }}>
                {formatTime(elapsed)}
              </p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: theme.isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.055)",
                border: `1px solid ${theme.isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.14)"}`,
              }}
            >
              <p className="text-[11px]" style={{ color: theme.isLight ? "rgba(15,23,42,0.5)" : "rgba(245,246,251,0.62)" }}>
                {t("queens.mistakes")}
              </p>
              <p className="font-mono text-lg font-semibold" style={{ color: theme.isLight ? "#0f172a" : "#f5f6fb" }}>
                {mistakes}
              </p>
            </div>
          </div>

          {showStreak && (
            <div className="mb-4 flex items-center justify-center gap-1.5 text-sm" style={{ color: theme.accent }}>
              🔥 {t("queens.streak", { count: streak })}
            </div>
          )}

          <button
            onClick={onNewPuzzle}
            className="w-full rounded-xl py-2.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.97]"
            style={{
              background: theme.accent,
              color: theme.accentFg,
              boxShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            {t("queens.play_again")}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
