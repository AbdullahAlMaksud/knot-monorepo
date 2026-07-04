"use client";

import dynamic from "next/dynamic";

const HomeScreen = dynamic(
  () => import("@/features/game/HomeScreen").then((m) => m.HomeScreen),
  { ssr: false }
);

export default function HomePage() {
  return <HomeScreen />;
}
