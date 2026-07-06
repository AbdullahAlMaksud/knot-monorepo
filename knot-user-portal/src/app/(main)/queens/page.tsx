"use client";

import dynamic from "next/dynamic";

const QueensScreen = dynamic(
  () => import("@/features/queens/QueensScreen").then((m) => m.QueensScreen),
  { ssr: false }
);

export default function QueensRoutePage() {
  return <QueensScreen />;
}
