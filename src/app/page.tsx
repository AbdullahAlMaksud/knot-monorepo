"use client";

import dynamic from "next/dynamic";

const AppShell = dynamic(
  () => import("@/features/sidebar/AppShell").then((m) => m.AppShell),
  { ssr: false }
);

export default function Page() {
  return <AppShell />;
}
