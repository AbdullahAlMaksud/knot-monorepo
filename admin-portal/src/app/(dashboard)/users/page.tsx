"use client";

import { useEffect, useState, useCallback } from "react";
import { api, ApiError, type AdminUserRow } from "@/lib/api";
import { PageHeader, LoadingState, ErrorState, EmptyState, Badge } from "@/components/ui";
import { ALL_ROLES } from "@/shared/permissions";

interface ListUsersResponse {
  users: AdminUserRow[];
  total: number;
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async (searchValue: string) => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ limit: "50" });
      if (searchValue) qs.set("search", searchValue);
      const res = await api.get<ListUsersResponse>(`/api/admin/users?${qs.toString()}`);
      setRows(res.users);
      setTotal(res.total);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load("");
  }, [load]);

  async function changeRole(id: string, role: string) {
    setBusyId(id);
    try {
      await api.post(`/api/admin/users/${id}/role`, { role });
      setRows((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Failed to update role");
    } finally {
      setBusyId(null);
    }
  }

  async function toggleBan(user: AdminUserRow) {
    setBusyId(user.id);
    try {
      if (user.banned) {
        await api.post(`/api/admin/users/${user.id}/unban`);
        setRows((prev) => prev.map((u) => (u.id === user.id ? { ...u, banned: false } : u)));
      } else {
        const reason = window.prompt("Ban reason (optional):") ?? undefined;
        await api.post(`/api/admin/users/${user.id}/ban`, { reason });
        setRows((prev) => prev.map((u) => (u.id === user.id ? { ...u, banned: true } : u)));
      }
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Failed to update ban status");
    } finally {
      setBusyId(null);
    }
  }

  async function removeUser(user: AdminUserRow) {
    if (!window.confirm(`Permanently delete ${user.email}? This cannot be undone.`)) return;
    setBusyId(user.id);
    try {
      await api.delete(`/api/admin/users/${user.id}`);
      setRows((prev) => prev.filter((u) => u.id !== user.id));
      setTotal((t) => t - 1);
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Failed to delete user");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <PageHeader title="Users" description={`${total} registered ${total === 1 ? "account" : "accounts"}.`} />

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load(search)}
          placeholder="Search by email…"
          className="w-full max-w-sm rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
        />
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && rows.length === 0 && <EmptyState label="No users found." />}

      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((user) => (
                <tr key={user.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 text-text">{user.name}</td>
                  <td className="px-4 py-3 text-text-muted">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role ?? "user"}
                      disabled={busyId === user.id}
                      onChange={(e) => changeRole(user.id, e.target.value)}
                      className="rounded-md border border-border bg-canvas px-2 py-1 text-xs text-text outline-none focus:border-accent"
                    >
                      {ALL_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {user.banned ? <Badge tone="danger">Banned</Badge> : <Badge tone="success">Active</Badge>}
                  </td>
                  <td className="table-figure px-4 py-3 text-text-muted">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={busyId === user.id}
                        onClick={() => toggleBan(user)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs text-text transition hover:bg-surface-hover disabled:opacity-50"
                      >
                        {user.banned ? "Unban" : "Ban"}
                      </button>
                      <button
                        disabled={busyId === user.id}
                        onClick={() => removeUser(user)}
                        className="rounded-md border border-danger/40 px-2.5 py-1 text-xs text-danger transition hover:bg-danger/10 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
