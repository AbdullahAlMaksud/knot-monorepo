"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, CheckCircle2, Percent } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useThemeStore } from "@/shared/stores/themeStore";
import { loadStats } from "@/shared/lib/storage";
import { formatTime } from "@/shared/lib/storage";
import type { Difficulty } from "@/shared/lib/sudoku";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];

const DIFF_META: Record<Difficulty, { label: string; color: string }> = {
  easy:   { label: "Easy",   color: "#10b981" },
  medium: { label: "Medium", color: "#f59e0b" },
  hard:   { label: "Hard",   color: "#f97316" },
  expert: { label: "Expert", color: "#ef4444" },
};

export function ScoreScreen() {
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const stats = loadStats();

  const totalGames = DIFFICULTIES.reduce((a, d) => a + (stats[d]?.gamesPlayed ?? 0), 0);
  const totalWins  = DIFFICULTIES.reduce((a, d) => a + (stats[d]?.gamesWon   ?? 0), 0);
  const totalTime  = DIFFICULTIES.reduce((a, d) => a + (stats[d]?.totalTime  ?? 0), 0);

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto py-6 px-4 gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs tracking-[0.25em] text-white/25 uppercase mb-1">Performance</p>
        <h2 className="text-3xl font-thin text-white/90">Scoreboard</h2>
      </motion.div>

      {/* Global summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm"
      >
        <GlassCard intensity="medium" className="p-4">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">Overall</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <StatPill label="Played" value={totalGames} icon={<CheckCircle2 size={12} />} color={theme.accent} />
            <StatPill label="Won"    value={totalWins}  icon={<Trophy size={12} />}       color={theme.accent} />
            <StatPill label="Time"   value={formatTime(totalTime)} icon={<Clock size={12} />} color={theme.accent} />
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
                    <span className="text-sm font-semibold text-white/80">{meta.label}</span>
                  </div>
                  {s.bestTime > 0 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                      style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}44` }}>
                      <Trophy size={10} />
                      <span>{formatTime(s.bestTime)}</span>
                    </div>
                  )}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <MiniStat label="Played" value={s.gamesPlayed} />
                  <MiniStat label="Won"    value={s.gamesWon} />
                  <MiniStat label="Win %" value={`${winRate}%`} />
                  <MiniStat label="Avg"   value={avgTime > 0 ? formatTime(avgTime) : "—"} />
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
                  <p className="text-xs text-white/20 text-center mt-1">No games played yet</p>
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
          Play your first game to see stats here
        </motion.p>
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
