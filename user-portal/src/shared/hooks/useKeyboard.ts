"use client";

import { useEffect } from "react";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useSettingsStore } from "@/shared/stores/settingsStore";

export function useKeyboard(
  onToggleFullscreen: () => void,
  onToggleSidebar: () => void,
) {
  const { selected, view, inputNumber, eraseCell, selectCell, toggleNoteMode } = useGameStore();
  const { cycleTheme } = useThemeStore();
  const { setSidebarPinned, sidebarPinned, language, setLanguage } = useSettingsStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;

      // Global shortcuts
      if (e.key === "d" || e.key === "D") { e.preventDefault(); cycleTheme(); return; }
      if (e.key === "f" || e.key === "F") { e.preventDefault(); onToggleFullscreen(); return; }
      if (e.key === "p" || e.key === "P") { e.preventDefault(); setSidebarPinned(!sidebarPinned); return; }
      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        setLanguage(language === "bn" ? "en" : "bn");
        return;
      }

      // Game-only shortcuts
      if (view !== "game") return;

      if (e.key === "n" || e.key === "N") { e.preventDefault(); toggleNoteMode(); return; }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") { e.preventDefault(); eraseCell(); return; }

      if (selected) {
        const [r, c] = selected;
        const dirs: Record<string, [number, number]> = {
          ArrowUp: [-1, 0], ArrowDown: [1, 0],
          ArrowLeft: [0, -1], ArrowRight: [0, 1],
        };
        if (dirs[e.key]) {
          e.preventDefault();
          const [dr, dc] = dirs[e.key];
          selectCell(Math.max(0, Math.min(8, r + dr)), Math.max(0, Math.min(8, c + dc)));
          return;
        }

        if (e.key >= "1" && e.key <= "9") {
          e.preventDefault();
          inputNumber(parseInt(e.key));
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, view, cycleTheme, inputNumber, eraseCell, selectCell, toggleNoteMode, onToggleFullscreen, onToggleSidebar, setSidebarPinned, sidebarPinned, language, setLanguage]);
}
