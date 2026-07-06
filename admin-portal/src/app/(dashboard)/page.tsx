"use client";

import { useEffect, useState } from "react";
import { Users, ListOrdered, Radar, Gamepad2 } from "lucide-react";
import { api, type OverviewStats, type TrackingStats, ApiError } from "@/lib/api";
import { PageHeader } from "@/components/ui";
import { StatCard } from "@/components/StatCard";
import { LoadingState, ErrorState } from "@/components/ui";

export default function OverviewPage() {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [tracking, setTracking] = useState<TrackingStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get<OverviewStats>("/api/admin/overview"), api.get<TrackingStats>("/api/tracking/stats")])
      .then(([o, t]) => {
        setOverview(o);
        setTracking(t);
      })
      .catch((e) => setError(e instanceof ApiError ? e.message : "Failed to load overview"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Overview" description="Headline numbers across every game." />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {overview && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total players" value={overview.totalUsers} icon={Users} />
          <StatCard label="Scores submitted" value={overview.totalScores} icon={ListOrdered} />
          <StatCard label="Tracked sessions" value={overview.totalSessions} icon={Radar} />
          <StatCard label="Games live" value={overview.totalGames} icon={Gamepad2} hint={overview.games.join(", ") || "—"} />
        </div>
      )}

      {tracking && (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <h2 className="mb-3 text-sm font-medium text-text">Active in last 24h</h2>
            <div className="stat-figure text-2xl">{tracking.activeLast24h}</div>
            <p className="mt-1 text-xs text-text-muted">
              out of {tracking.totalSessions} tracked sessions total ·{" "}
              {tracking.guestVsUser.guest ?? 0} guest / {tracking.guestVsUser.user ?? 0} signed-in
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <h2 className="mb-3 text-sm font-medium text-text">Top countries</h2>
            {tracking.byCountry.length === 0 ? (
              <p className="text-sm text-text-muted">No geo data yet.</p>
            ) : (
              <ul className="space-y-2">
                {tracking.byCountry.slice(0, 6).map((row) => (
                  <li key={row.country} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{row.country}</span>
                    <span className="table-figure text-text">{row.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-border bg-surface p-4 lg:col-span-2">
            <h2 className="mb-3 text-sm font-medium text-text">Most visited routes</h2>
            {tracking.topRoutes.length === 0 ? (
              <p className="text-sm text-text-muted">No route data yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-muted">
                    <th className="pb-2 font-medium">Route</th>
                    <th className="pb-2 font-medium">Visits</th>
                    <th className="pb-2 font-medium">Avg. time</th>
                  </tr>
                </thead>
                <tbody>
                  {tracking.topRoutes.map((row) => (
                    <tr key={row.route} className="border-b border-border/60 last:border-0">
                      <td className="py-2 text-text">{row.route}</td>
                      <td className="table-figure py-2 text-text">{row.visits}</td>
                      <td className="table-figure py-2 text-text-muted">{row.avgDurationSeconds}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
