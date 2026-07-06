"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QueenIcon } from "./QueenIcon";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useTranslation } from "react-i18next";
import { api } from "@/shared/lib/api";

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
  difficulty?: string;
  onNewPuzzle: () => void;
  onClose: () => void;
};

export function QueensWinModal({
  elapsed,
  mistakes,
  streak,
  showStreak,
  difficulty = "easy",
  onNewPuzzle,
  onClose,
}: QueensWinModalProps) {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { t, i18n } = useTranslation();

  // Score submission and Auth states
  const [user, setUser] = useState<any>(null);
  const [playerName, setPlayerName] = useState("");
  const [submittingScore, setSubmittingScore] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(false);
  const [authMode, setAuthMode] = useState<"none" | "login" | "signup">("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Fetch session on load
  useEffect(() => {
    api.getSession().then((data) => {
      if (data && data.user) {
        setUser(data.user);
        setPlayerName(data.user.name);
      }
    });
  }, []);

  const handlePostScore = async () => {
    setSubmittingScore(true);
    try {
      const gameKey = `queens_${difficulty}`;
      await api.postScore(gameKey, elapsed, playerName.trim() || "Guest");
      setSubmittedScore(true);
    } catch (err: any) {
      alert(err.message || "Failed to submit score");
    } finally {
      setSubmittingScore(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      if (authMode === "login") {
        const res = await api.signIn(email, password);
        setUser(res.user);
        setPlayerName(res.user.name);
        setAuthMode("none");
      } else {
        const res = await api.signUp(email, password, name);
        setUser(res.user);
        setPlayerName(res.user.name);
        setAuthMode("none");
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    }
  };

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

          {/* Online Score Submission */}
          <div className="w-full flex flex-col gap-2 p-2.5 rounded-xl border border-white/5 bg-white/5 mb-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/30 text-left">
              {i18n.language === "bn" ? "অনলাইন লিডারবোর্ড" : "Online Leaderboard"}
            </p>
            
            {submittedScore ? (
              <div className="text-xs font-medium text-green-400 py-1 text-center">
                ✓ {i18n.language === "bn" ? "স্কোর জমা দেওয়া হয়েছে!" : "Score submitted!"}
              </div>
            ) : authMode === "login" ? (
              <form onSubmit={handleAuth} className="flex flex-col gap-2 text-left">
                <p className="text-xs font-semibold text-white/80">
                  {i18n.language === "bn" ? "লগইন করুন" : "Sign In"}
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                />
                {authError && (
                  <p className="text-[10px] text-red-400 font-medium leading-tight">{authError}</p>
                )}
                <div className="flex gap-1.5">
                  <button
                    type="submit"
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all active:scale-95"
                    style={{ background: theme.accent, color: theme.accentFg }}
                  >
                    {i18n.language === "bn" ? "লগইন" : "Sign In"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode("none"); setAuthError(null); }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white"
                  >
                    {i18n.language === "bn" ? "বাতিল" : "Cancel"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode("signup"); setAuthError(null); }}
                  className="text-[10px] text-accent/80 hover:text-accent text-center mt-1 outline-none"
                >
                  {i18n.language === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create an account"}
                </button>
              </form>
            ) : authMode === "signup" ? (
              <form onSubmit={handleAuth} className="flex flex-col gap-2 text-left">
                <p className="text-xs font-semibold text-white/80">
                  {i18n.language === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account"}
                </p>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                />
                {authError && (
                  <p className="text-[10px] text-red-400 font-medium leading-tight">{authError}</p>
                )}
                <div className="flex gap-1.5">
                  <button
                    type="submit"
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all active:scale-95"
                    style={{ background: theme.accent, color: theme.accentFg }}
                  >
                    {i18n.language === "bn" ? "তৈরি করুন" : "Sign Up"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode("none"); setAuthError(null); }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white"
                  >
                    {i18n.language === "bn" ? "বাতিল" : "Cancel"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode("login"); setAuthError(null); }}
                  className="text-[10px] text-accent/80 hover:text-accent text-center mt-1 outline-none"
                >
                  {i18n.language === "bn" ? "লগইন করুন" : "Already have an account? Sign In"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-2">
                {user ? (
                  <div className="flex flex-col gap-1.5 items-stretch">
                    <p className="text-xs text-white/70 text-left">
                      {i18n.language === "bn" ? "প্লেয়ার:" : "Player:"}{" "}
                      <span className="font-semibold text-white">{user.name}</span>
                    </p>
                    <button
                      onClick={handlePostScore}
                      disabled={submittingScore}
                      className="w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all active:scale-95 disabled:opacity-60"
                      style={{ background: theme.accent, color: theme.accentFg }}
                    >
                      {submittingScore
                        ? (i18n.language === "bn" ? "জমা হচ্ছে..." : "Submitting...")
                        : (i18n.language === "bn" ? "স্কোর জমা দিন" : "Submit Score")}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-stretch">
                    <input
                      type="text"
                      placeholder={i18n.language === "bn" ? "প্লেয়ারের নাম (Guest)" : "Player name (Guest)"}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                    />
                    <div className="flex gap-1.5">
                      <button
                        onClick={handlePostScore}
                        disabled={submittingScore}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all active:scale-95 disabled:opacity-60"
                        style={{ background: theme.accent, color: theme.accentFg }}
                      >
                        {submittingScore
                          ? (i18n.language === "bn" ? "জমা হচ্ছে..." : "Submitting...")
                          : (i18n.language === "bn" ? "জমা দিন" : "Submit")}
                      </button>
                      <button
                        onClick={() => setAuthMode("login")}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all active:scale-95"
                      >
                        {i18n.language === "bn" ? "লগইন" : "Login"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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
