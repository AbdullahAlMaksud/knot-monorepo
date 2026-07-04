"use client";

import dynamic from "next/dynamic";

const ScoreScreen = dynamic(
  () => import("@/features/score/ScoreScreen").then((m) => m.ScoreScreen),
  { ssr: false }
);

export default function ScoreRoutePage() {
  return <ScoreScreen />;
}
