"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Sidebar } from "@/components/Sidebar";
import { LoadingState } from "@/components/ui";

const STAFF_ROLES = ["admin", "moderator"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.replace("/login");
    }
  }, [isPending, data, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <LoadingState label="Checking session…" />
      </div>
    );
  }

  if (!data?.session) {
    // Redirect is in flight (see effect above); avoid flashing protected content.
    return null;
  }

  const role = (data.user as { role?: string }).role ?? "user";

  if (!STAFF_ROLES.includes(role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
        <div className="max-w-sm rounded-lg border border-border bg-surface p-6 text-center">
          <p className="mb-1 text-sm font-medium text-text">Staff access required</p>
          <p className="mb-4 text-sm text-text-muted">
            Your account (<span className="text-text">{role}</span>) doesn&apos;t have permission to view
            the dashboard. Ask an admin to grant you the moderator or admin role.
          </p>
          <button
            onClick={() => authClient.signOut().then(() => router.push("/login"))}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-text transition hover:bg-surface-hover"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-canvas">
      <Sidebar />
      <main className="min-h-screen flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
