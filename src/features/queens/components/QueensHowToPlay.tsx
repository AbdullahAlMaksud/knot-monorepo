"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QueenIcon } from "./QueenIcon";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useTranslation } from "react-i18next";

type HowToPlayDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function QueensHowToPlay({ open, onClose }: HowToPlayDialogProps) {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-[92vw] max-w-md rounded-2xl p-6"
          style={{
            background: theme.isLight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)",
            border: `1px solid ${theme.isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.22)"}`,
            backdropFilter: "blur(26px) saturate(160%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100"
            style={{ color: theme.isLight ? "rgba(15,23,42,0.5)" : "rgba(255,255,255,0.5)" }}
          >
            ✕
          </button>

          <h2
            className="mb-1 text-lg font-semibold"
            style={{ color: theme.isLight ? "#0f172a" : "#f5f6fb" }}
          >
            {t("queens.how_to_play")}
          </h2>
          <p
            className="mb-4 text-sm"
            style={{ color: theme.isLight ? "rgba(15,23,42,0.6)" : "rgba(245,246,251,0.62)" }}
          >
            {t("queens.goal")}
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: theme.isLight ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.1)" }}
              >
                <QueenIcon className="h-5 w-5" style-override={theme.accent} />
              </div>
              <p style={{ color: theme.isLight ? "#0f172a" : "#f5f6fb" }}>
                {t("queens.rule1")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="grid h-9 w-9 shrink-0 grid-cols-3 gap-0.5 rounded-lg p-1.5"
                style={{ background: theme.isLight ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.1)" }}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      background: i === 4 ? "#fb7185" : (theme.isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.15)"),
                    }}
                  />
                ))}
              </div>
              <p style={{ color: theme.isLight ? "#0f172a" : "#f5f6fb" }}>
                {t("queens.rule2")}
              </p>
            </div>
            <p
              className="rounded-xl p-3 text-xs leading-relaxed"
              style={{
                background: theme.isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.05)",
                color: theme.isLight ? "rgba(15,23,42,0.6)" : "rgba(245,246,251,0.62)",
              }}
            >
              {t("queens.tip")}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.97]"
            style={{
              background: theme.accent,
              color: theme.accentFg,
              boxShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            {t("queens.got_it")}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
