const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body || body.success === false) {
    const message = body && body.success === false ? body.error.message : `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body.data;
}

export const api = {
  postScore: (game: string, score: number, playerName?: string, metadata?: any) =>
    request("/api/scores", {
      method: "POST",
      body: JSON.stringify({ game, score, playerName, metadata }),
    }),
  getLeaderboard: (game: string, period = "all", limit = 10) =>
    request<any[]>(`/api/leaderboard?game=${encodeURIComponent(game)}&period=${period}&limit=${limit}`),
  getSession: () =>
    request<any>("/api/auth/get-session").catch(() => null),
  signIn: (email: string, password: string) =>
    request<any>("/api/auth/sign-in/email", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signUp: (email: string, password: string, name: string) =>
    request<any>("/api/auth/sign-up/email", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),
  signOut: () =>
    request<any>("/api/auth/sign-out", { method: "POST" }),
};
