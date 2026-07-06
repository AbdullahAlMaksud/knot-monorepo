"use client";

import { useEffect, useState, useCallback } from "react";
import { api, ApiError, type LeaderboardEntry, type OverviewStats } from "@/lib/api";
import { PageHeader, LoadingState, ErrorState, EmptyState, Badge } from "@/components/ui";

const PERIODS = [
  { value: "all", label: "All time" },
  { value: "month", label: "Last 30 days" },
  { value: "week", label: "Last 7 days" },
  { value: "day", label: "Last 24 hours" },
] as const;

export default function LeaderboardPage() {
  const [games, setGames] = useState<string[]>([]);
  const [game, setGame] = useState("");
  const [period, setPeriod] = useState<(typeof PERIODS)[number]["value"]>("all");
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<OverviewStats>("/api/admin/overview")
      .then((o) => {
        setGames(o.games);
        if (o.games[0]) setGame(o.games[0]);
      })
      .catch(() => {});
  }, []);

  const load = useCallback((gameValue: string, periodValue: string) => {
    if (!gameValue) return;
    setLoading(true);
    setError(null);
    api
      .get<LeaderboardEntry[]>(`/api/leaderboard?game=${encodeURIComponent(gameValue)}&period=${periodValue}&limit=25`)
      .then(setEntries)
      .catch((e) => setError(e instanceof ApiError ? e.message : "Failed to load leaderboard"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (game) load(game, period);
  }, [game, period, load]);

  return (
    <div>
      <PageHeader title="Leaderboard" description="Best score per player, per game." />

      <div className="mb-4 flex flex-wrap gap-2">
        {games.length > 0 ? (
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
          >
            {games.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={game}
            onChange={(e) => setGame(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(game, period)}
            placeholder="Game id (e.g. sudoku)"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
          />
        )}

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as typeof period)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
        >
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && entries && entries.length === 0 && (
        <EmptyState label="No scores for this game/period yet." />
      )}

      {!loading && !error && entries && entries.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">Player</th>
                <th className="px-4 py-3 font-medium">Best score</th>
                <th className="px-4 py-3 font-medium">Country</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.playerId} className="border-b border-border/60 last:border-0">
                  <td className="stat-figure px-4 py-3 text-lg">{e.rank}</td>
                  <td className="px-4 py-3 text-text">
                    {e.playerName} {e.isGuest && <Badge tone="cyan">Guest</Badge>}
                  </td>
                  <td className="table-figure px-4 py-3 text-accent">{e.bestScore.toLocaleString()}</td>
                  <td className="px-4 py-3 text-text-muted">{e.country ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
