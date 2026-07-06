"use client";

import { useEffect, useState, useCallback } from "react";
import { api, ApiError, type Paginated, type VisitorSessionRow } from "@/lib/api";
import { PageHeader, LoadingState, ErrorState, EmptyState, Badge, Pagination } from "@/components/ui";

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export default function TrackingPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<VisitorSessionRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (pageValue: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Paginated<VisitorSessionRow>>(`/api/tracking/sessions?page=${pageValue}&limit=25`);
      setData(res);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(page);
  }, [page, load]);

  return (
    <div>
      <PageHeader title="Tracking" description="Every visitor session, signed in or anonymous." />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data && data.items.length === 0 && <EmptyState label="No sessions recorded yet." />}

      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-4 py-3 font-medium">Visitor</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Current route</th>
                  <th className="px-4 py-3 font-medium">Active time</th>
                  <th className="px-4 py-3 font-medium">Page views</th>
                  <th className="px-4 py-3 font-medium">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((s) => (
                  <tr key={s._id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">
                      {s.userId ? <Badge tone="accent">User</Badge> : <Badge tone="cyan">Guest</Badge>}
                    </td>
                    <td className="table-figure px-4 py-3 text-text-muted">{s.ip}</td>
                    <td className="px-4 py-3 text-text-muted">{s.country ?? "—"}</td>
                    <td className="px-4 py-3 text-text">{s.currentRoute ?? "—"}</td>
                    <td className="table-figure px-4 py-3 text-text">{formatDuration(s.totalActiveSeconds)}</td>
                    <td className="table-figure px-4 py-3 text-text-muted">{s.pageViews}</td>
                    <td className="table-figure px-4 py-3 text-text-muted">
                      {new Date(s.lastSeenAt).toLocaleString()}
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
