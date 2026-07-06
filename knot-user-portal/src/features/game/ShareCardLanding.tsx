"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, XCircle, Play, Home } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { formatTime } from "@/shared/lib/storage";
import { useTranslation } from "react-i18next";
import { translateNumber } from "@/shared/lib/i18n";
import type { Difficulty } from "@/shared/lib/sudoku";

export function ShareCardLanding() {
  const [params, setParams] = useState<{
    difficulty: Difficulty;
    time: number;
    errors: number;
  } | null>(null);
  const [show, setShow] = useState(false);
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { startGame } = useGameStore();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const isShared = searchParams.get("shared") === "true";
      const diff = searchParams.get("diff") as Difficulty;
      const timeVal = parseInt(searchParams.get("time") || "0", 10);
      const errorsVal = parseInt(searchParams.get("errors") || "0", 10);

      if (isShared && diff && !isNaN(timeVal)) {
        setParams({ difficulty: diff, time: timeVal, errors: errorsVal });
        setShow(true);
      }
    }
  }, []);

  if (!show || !params) return null;

  const handleAccept = () => {
    // Clear search parameters from URL
    if (typeof window !== "undefined") {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    setShow(false);
    startGame(params.difficulty);
  };

  const handleClose = () => {
    if (typeof window !== "undefined") {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)" }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 220 }}
            className="w-full max-w-[310px]"
          >
            <GlassCard
              intensity="high"
              className="p-6 flex flex-col items-center gap-5 text-center relative border"
              style={{ borderColor: `${theme.accent}33` }}
            >
              {/* Header Badge */}
              <div
                className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1.5"
                style={{
                  background: `${theme.accent}22`,
                  border: `1px solid ${theme.accent}44`,
                  color: theme.accent,
                }}
              >
                <Trophy size={10} />
                Challenge Mode
              </div>

              {/* Title */}
              <div>
                <h2 className="text-xl font-bold text-white/90 leading-tight">
                  {t("game.win.landing.title")}
                </h2>
                <p className="text-[11px] text-white/40 mt-1 leading-normal">
                  {t("game.win.landing.subtitle")}
                </p>
              </div>

              {/* Stats card */}
              <div
                className="w-full rounded-2xl py-4 px-3 flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Stats rows */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/30">
                      {t("difficulty.difficulty_label")}
                    </span>
                    <span className="text-xs font-semibold capitalize" style={{ color: theme.accent }}>
                      {t(`difficulty.${params.difficulty}`)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1 border-x border-white/5">
                    <span className="text-[9px] uppercase tracking-wider text-white/30">
                      {t("game.win.time")}
                    </span>
                    <span className="text-xs font-semibold text-white/80 tabular-nums flex items-center gap-1 justify-center">
                      <Clock size={10} className="opacity-40" />
                      {translateNumber(formatTime(params.time), i18n.language)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/30">
                      {t("game.win.mistakes")}
                    </span>
                    <span className="text-xs font-semibold text-white/80 tabular-nums flex items-center gap-1 justify-center">
                      <XCircle
                        size={10}
                        className="opacity-40"
                        style={params.errors > 0 ? { color: "#ef4444" } : {}}
                      />
                      {translateNumber(params.errors, i18n.language)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 w-full mt-1">
                <button
                  onClick={handleAccept}
                  className="w-full py-3 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  style={{ background: theme.accent, color: theme.accentFg }}
                >
                  <Play size={13} fill="currentColor" />
                  {t("game.win.landing.play_cta")}
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  <Home size={12} />
                  {t("game.win.landing.home_cta")}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
