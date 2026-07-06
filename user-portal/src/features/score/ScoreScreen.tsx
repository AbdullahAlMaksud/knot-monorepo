"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, CheckCircle2, Globe, Laptop } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useThemeStore } from "@/shared/stores/themeStore";
import { loadStats } from "@/shared/lib/storage";
import { formatTime } from "@/shared/lib/storage";
import type { Difficulty } from "@/shared/lib/sudoku";
import { useTranslation } from "react-i18next";
import { translateNumber } from "@/shared/lib/i18n";
import { api } from "@/shared/lib/api";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];

const DIFF_META: Record<Difficulty, { color: string }> = {
  easy:   { color: "#10b981" },
  medium: { color: "#f59e0b" },
  hard:   { color: "#f97316" },
  expert: { color: "#ef4444" },
};

export function ScoreScreen() {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const stats = loadStats();
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState<"local" | "online">("local");
  const [onlineGame, setOnlineGame] = useState<"sudoku" | "queens">("sudoku");
  const [onlineDiff, setOnlineDiff] = useState<Difficulty>("easy");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalGames = DIFFICULTIES.reduce((a, d) => a + (stats[d]?.gamesPlayed ?? 0), 0);
  const totalWins  = DIFFICULTIES.reduce((a, d) => a + (stats[d]?.gamesWon   ?? 0), 0);
  const totalTime  = DIFFICULTIES.reduce((a, d) => a + (stats[d]?.totalTime  ?? 0), 0);

  // Fetch online leaderboard
  useEffect(() => {
    if (activeTab !== "online") return;
    
    let active = true;
    setLoading(true);
    setError(null);
    
    const gameKey = `${onlineGame}_${onlineDiff}`;
    api.getLeaderboard(gameKey)
      .then((data) => {
        if (active) {
          setLeaderboard(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load leaderboard");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
      
    return () => {
      active = false;
    };
  }, [activeTab, onlineGame, onlineDiff]);

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto py-6 px-4 gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs tracking-[0.25em] text-white/25 uppercase mb-1">{t("scores.performance")}</p>
        <h2 className="text-3xl font-thin text-white/90">{t("scores.scoreboard")}</h2>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 w-full max-w-sm p-1 rounded-xl bg-white/5 border border-white/5">
        <button
          onClick={() => setActiveTab("local")}
          className="flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all"
          style={{
            background: activeTab === "local" ? theme.accent : "transparent",
            color: activeTab === "local" ? theme.accentFg : "rgba(255,255,255,0.6)",
          }}
        >
          <Laptop size={13} />
          {i18n.language === "bn" ? "স্থানীয় রেকর্ড" : "Local Records"}
        </button>
        <button
          onClick={() => setActiveTab("online")}
          className="flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all"
          style={{
            background: activeTab === "online" ? theme.accent : "transparent",
            color: activeTab === "online" ? theme.accentFg : "rgba(255,255,255,0.6)",
          }}
        >
          <Globe size={13} />
          {i18n.language === "bn" ? "অনলাইন স্কোর" : "Online Leaderboard"}
        </button>
      </div>

      {activeTab === "local" ? (
        <>
          {/* Global summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-sm"
          >
            <GlassCard intensity="medium" className="p-4">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">{t("scores.overall")}</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <StatPill label={t("scores.played")} value={translateNumber(totalGames, i18n.language)} icon={<CheckCircle2 size={12} />} color={theme.accent} />
                <StatPill label={t("scores.won")}    value={translateNumber(totalWins, i18n.language)}  icon={<Trophy size={12} />}       color={theme.accent} />
                <StatPill label={t("scores.time")}   value={translateNumber(formatTime(totalTime), i18n.language)} icon={<Clock size={12} />} color={theme.accent} />
              </div>
            </GlassCard>
          </motion.div>

          {/* Per-difficulty cards */}
          <div className="w-full max-w-sm flex flex-col gap-3">
            {DIFFICULTIES.map((d, i) => {
              const s = stats[d] ?? { gamesPlayed: 0, gamesWon: 0, bestTime: 0, totalTime: 0 };
              const winRate = s.gamesPlayed > 0 ? Math.round((s.gamesWon / s.gamesPlayed) * 100) : 0;
              const avgTime = s.gamesWon > 0 ? Math.round(s.totalTime / s.gamesWon) : 0;
              const meta = DIFF_META[d];

              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <GlassCard intensity="low" className="p-4">
                    {/* Row header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: meta.color }} />
                        <span className="text-sm font-semibold text-white/80">{t(`difficulty.${d}`)}</span>
                      </div>
                      {s.bestTime > 0 && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}44` }}>
                          <Trophy size={10} />
                          <span>{translateNumber(formatTime(s.bestTime), i18n.language)}</span>
                        </div>
                      )}
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <MiniStat label={t("scores.played")} value={translateNumber(s.gamesPlayed, i18n.language)} />
                      <MiniStat label={t("scores.won")}    value={translateNumber(s.gamesWon, i18n.language)} />
                      <MiniStat label={t("scores.win_rate")} value={`${translateNumber(winRate, i18n.language)}%`} />
                      <MiniStat label={t("scores.avg_time")}   value={avgTime > 0 ? translateNumber(formatTime(avgTime), i18n.language) : "—"} />
                    </div>

                    {/* Win rate bar */}
                    {s.gamesPlayed > 0 && (
                      <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${winRate}%` }}
                          transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                          style={{ background: meta.color, opacity: 0.7 }}
                        />
                      </div>
                    )}

                    {s.gamesPlayed === 0 && (
                      <p className="text-xs text-white/20 text-center mt-1">{t("scores.no_games")}</p>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {totalGames === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-white/25 text-center mt-4"
            >
              {t("scores.play_first")}
            </motion.p>
          )}
        </>
      ) : (
        <div className="w-full max-w-sm flex flex-col gap-3">
          {/* Game Selection */}
          <div className="flex gap-2 w-full mb-1">
            <button
              onClick={() => setOnlineGame("sudoku")}
              className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
              style={{
                background: onlineGame === "sudoku" ? `${theme.accent}22` : "rgba(255,255,255,0.03)",
                border: `1px solid ${onlineGame === "sudoku" ? theme.accent : "rgba(255,255,255,0.08)"}`,
                color: onlineGame === "sudoku" ? theme.accent : "rgba(255,255,255,0.5)",
              }}
            >
              Sudoku
            </button>
            <button
              onClick={() => setOnlineGame("queens")}
              className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
              style={{
                background: onlineGame === "queens" ? `${theme.accent}22` : "rgba(255,255,255,0.03)",
                border: `1px solid ${onlineGame === "queens" ? theme.accent : "rgba(255,255,255,0.08)"}`,
                color: onlineGame === "queens" ? theme.accent : "rgba(255,255,255,0.5)",
              }}
            >
              Queens
            </button>
          </div>

          {/* Difficulty selector */}
          <div className="flex gap-1 w-full overflow-x-auto pb-1 mb-1 justify-between">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setOnlineDiff(d)}
                className="px-3 py-1 text-[11px] font-semibold rounded-full border transition-all whitespace-nowrap flex-1 text-center"
                style={{
                  background: onlineDiff === d ? `${theme.accent}1c` : "transparent",
                  borderColor: onlineDiff === d ? theme.accent : "rgba(255,255,255,0.08)",
                  color: onlineDiff === d ? theme.accent : "rgba(255,255,255,0.4)",
                }}
              >
                {t(`difficulty.${d}`)}
              </button>
            ))}
          </div>

          {/* Leaderboard Card */}
          <GlassCard intensity="low" className="p-4 w-full">
            {loading ? (
              <div className="py-12 text-center text-xs text-white/40 flex flex-col items-center justify-center gap-2">
                <div className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <p>{i18n.language === "bn" ? "লোড হচ্ছে..." : "Loading leaderboard..."}</p>
              </div>
            ) : error ? (
              <div className="py-10 text-center text-xs text-red-400">
                {error}
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-12 text-center text-xs text-white/30">
                {i18n.language === "bn" ? "কোনো অনলাইন স্কোর এখনো জমা দেওয়া হয়নি।" : "No online scores submitted yet."}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-[10px] uppercase font-bold text-white/20 px-1">
                  <span className="w-10">Rank</span>
                  <span className="flex-1">Player</span>
                  <span className="w-16 text-right">Time</span>
                </div>
                <div className="h-px bg-white/10 w-full" />
                {leaderboard.map((item, idx) => (
                  <div key={item.playerId} className="flex items-center text-xs px-1 text-white/80 py-1 border-b border-white/5 last:border-0">
                    <span className="w-10 font-bold text-white/30 text-sm">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${item.rank}`}
                    </span>
                    <span className="flex-1 font-medium flex items-center gap-1.5 min-w-0">
                      <span className="truncate max-w-[140px] text-white">{item.playerName}</span>
                      {item.isGuest && (
                        <span className="text-[9px] px-1 py-0.2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded">
                          Guest
                        </span>
                      )}
                    </span>
                    <span className="w-16 text-right font-mono font-semibold" style={{ color: idx === 0 ? theme.accent : undefined }}>
                      {translateNumber(formatTime(item.bestScore), i18n.language)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}

function StatPill({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1" style={{ color: `${color}99` }}>{icon}</div>
      <p className="text-base font-semibold text-white/80 tabular-nums">{value}</p>
      <p className="text-[10px] text-white/30 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <p className="text-sm font-medium text-white/70 tabular-nums">{value}</p>
      <p className="text-[9px] text-white/25 uppercase tracking-wider">{label}</p>
    </div>
  );
}
