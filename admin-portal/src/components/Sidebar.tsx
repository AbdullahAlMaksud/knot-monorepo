"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  ListOrdered,
  Radar,
  LogOut,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/scores", label: "Scores", icon: ListOrdered },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/tracking", label: "Tracking", icon: Radar },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
        <span className="font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-text">
          Arcade Ops
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-canvas text-accent"
                  : "text-text-muted hover:bg-surface-hover hover:text-text"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="mb-2 truncate px-2 text-xs text-text-muted">
          {data?.user?.email}
          {data?.user && "role" in data.user ? (
            <span className="ml-1.5 rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-cyan">
              {String((data.user as { role?: string }).role ?? "user")}
            </span>
          ) : null}
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-muted transition hover:bg-surface-hover hover:text-text"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
