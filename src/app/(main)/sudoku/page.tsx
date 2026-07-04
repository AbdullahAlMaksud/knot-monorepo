"use client";

import dynamic from "next/dynamic";

const SudokuPage = dynamic(
  () => import("@/features/game/SudokuPage").then((m) => m.SudokuPage),
  { ssr: false }
);

export default function SudokuRoutePage() {
  return <SudokuPage />;
}
