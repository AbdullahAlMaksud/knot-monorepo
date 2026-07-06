"use client";

import { useCallback, useRef } from "react";
import { useSettingsStore } from "@/shared/stores/settingsStore";

type SoundType = "input" | "error" | "erase" | "win" | "note";

export function useSound() {
  const { soundEnabled } = useSettingsStore();
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (!soundEnabled) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
          case "input":
            osc.type = "sine";
            osc.frequency.setValueAtTime(660, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
            break;

          case "error":
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            break;

          case "erase":
            osc.type = "sine";
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(330, now + 0.08);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;

          case "note":
            osc.type = "triangle";
            osc.frequency.setValueAtTime(550, now);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
            break;

          case "win": {
            // Ascending arpeggio
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
              const o2 = ctx.createOscillator();
              const g2 = ctx.createGain();
              o2.connect(g2);
              g2.connect(ctx.destination);
              o2.type = "sine";
              o2.frequency.setValueAtTime(freq, now + i * 0.1);
              g2.gain.setValueAtTime(0.1, now + i * 0.1);
              g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
              o2.start(now + i * 0.1);
              o2.stop(now + i * 0.1 + 0.3);
            });
            // cleanup the initial osc since we didn't use it
            osc.disconnect();
            gain.disconnect();
            return;
          }
        }
      } catch {
        // Audio not supported or blocked — silently ignore
      }
    },
    [soundEnabled, getCtx]
  );

  return { play };
}
