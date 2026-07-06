"use client";

import { useEffect, useState, useCallback } from "react";
import { api, ApiError, type Paginated, type ScoreRow } from "@/lib/api";
import { PageHeader, LoadingState, ErrorState, EmptyState, Badge, Pagination } from "@/components/ui";

export default function ScoresPage() {
  const [game, setGame] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<ScoreRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async (gameValue: string, pageValue: number) => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ page: String(pageValue), limit: "20" });
      if (gameValue) qs.set("game", gameValue);
      const res = await api.get<Paginated<ScoreRow>>(`/api/scores?${qs.toString()}`);
      setData(res);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load scores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(game, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function applyFilter() {
    setPage(1);
    load(game, 1);
  }

  async function removeScore(id: string) {
    if (!window.confirm("Delete this score?")) return;
    setBusyId(id);
    try {
      await api.delete(`/api/scores/${id}`);
      setData((prev) => (prev ? { ...prev, items: prev.items.filter((s) => s._id !== id) } : prev));
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Failed to delete score");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <PageHeader title="Scores" description="Every score submitted across every game." />

      <div className="mb-4 flex gap-2">
        <input
          value={game}
          onChange={(e) => setGame(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilter()}
          placeholder="Filter by game id…"
          className="w-full max-w-sm rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
        />
        <button
          onClick={applyFilter}
          className="rounded-md border border-border px-3 py-2 text-sm text-text transition hover:bg-surface-hover"
        >
          Apply
        </button>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data && data.items.length === 0 && <EmptyState label="No scores found." />}

      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-4 py-3 font-medium">Player</th>
                  <th className="px-4 py-3 font-medium">Game</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((s) => (
                  <tr key={s._id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-text">
                      {s.playerName} {!s.userId && <Badge tone="cyan">Guest</Badge>}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{s.game}</td>
                    <td className="table-figure px-4 py-3 text-accent">{s.score.toLocaleString()}</td>
                    <td className="px-4 py-3 text-text-muted">{s.country ?? "—"}</td>
                    <td className="table-figure px-4 py-3 text-text-muted">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        disabled={busyId === s._id}
                        onClick={() => removeScore(s._id)}
                        className="rounded-md border border-danger/40 px-2.5 py-1 text-xs text-danger transition hover:bg-danger/10 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
