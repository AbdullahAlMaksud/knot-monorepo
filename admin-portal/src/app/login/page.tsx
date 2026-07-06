"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await authClient.signIn.email({ email, password });

    setLoading(false);
    if (signInError) {
      setError(signInError.message ?? "Could not sign in. Check your email and password.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          <h1 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-text">
            Arcade Ops
          </h1>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-1 text-base font-medium text-text">Sign in</h2>
          <p className="mb-6 text-sm text-text-muted">Staff access only — admin &amp; moderator roles.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-text outline-none focus:border-accent"
                placeholder="you@studio.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-text-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-text outline-none focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-ink transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-text-muted">
          No account with dashboard access?{" "}
          <span className="text-text">Ask an admin to run the seed script or set your role.</span>
        </p>
      </div>
    </main>
  );
}
