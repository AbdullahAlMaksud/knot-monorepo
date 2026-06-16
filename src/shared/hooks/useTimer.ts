"use client";

import { useEffect } from "react";
import { useGameStore } from "@/shared/stores/gameStore";

export function useTimer() {
  const tick = useGameStore((s) => s.tick);
  const running = useGameStore((s) => s.running);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [running, tick]);
}
