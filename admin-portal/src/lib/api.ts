const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

type Envelope<T> = { success: true; data: T } | { success: false; error: { message: string; details?: unknown } };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const body = (await res.json().catch(() => null)) as Envelope<T> | null;

  if (!res.ok || !body || body.success === false) {
    const message = body && body.success === false ? body.error.message : `Request failed (${res.status})`;
    throw new ApiError(message, res.status, body && body.success === false ? body.error.details : undefined);
  }

  return body.data;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ---- Shared response shapes used across dashboard pages ----

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ScoreRow {
  _id: string;
  game: string;
  userId: string | null;
  guestId: string | null;
  playerName: string;
  score: number;
  country: string | null;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  isGuest: boolean;
  bestScore: number;
  country: string | null;
  achievedAt: string;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
  banReason?: string | null;
  createdAt: string;
}

export interface OverviewStats {
  totalUsers: number;
  totalScores: number;
  totalSessions: number;
  totalGames: number;
  games: string[];
}

export interface TrackingStats {
  totalSessions: number;
  activeLast24h: number;
  byCountry: { country: string; count: number }[];
  topRoutes: { route: string; visits: number; avgDurationSeconds: number }[];
  guestVsUser: Record<string, number>;
}

export interface VisitorSessionRow {
  _id: string;
  sessionId: string;
  userId: string | null;
  ip: string;
  country: string | null;
  currentRoute: string | null;
  totalActiveSeconds: number;
  pageViews: number;
  firstSeenAt: string;
  lastSeenAt: string;
}
