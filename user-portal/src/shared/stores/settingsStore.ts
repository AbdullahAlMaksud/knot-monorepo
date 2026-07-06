"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  soundEnabled: boolean;
  highlightEnabled: boolean;
  autoNoteEnabled: boolean;
  showMistakes: boolean;
  sidebarPinned: boolean;
  language: "en" | "bn";
  toggleSound: () => void;
  toggleHighlight: () => void;
  toggleAutoNote: () => void;
  toggleShowMistakes: () => void;
  setSidebarPinned: (v: boolean) => void;
  setLanguage: (lang: "en" | "bn") => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      highlightEnabled: true,
      autoNoteEnabled: false,
      showMistakes: true,
      sidebarPinned: false,
      language: "bn",
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHighlight: () => set((s) => ({ highlightEnabled: !s.highlightEnabled })),
      toggleAutoNote: () => set((s) => ({ autoNoteEnabled: !s.autoNoteEnabled })),
      toggleShowMistakes: () => set((s) => ({ showMistakes: !s.showMistakes })),
      setSidebarPinned: (v) => set({ sidebarPinned: v }),
      setLanguage: (lang) => {
        set({ language: lang });
        import("@/shared/lib/i18n").then((m) => {
          m.default.changeLanguage(lang);
        });
      },
    }),
    { name: "sudoku-settings", skipHydration: true }
  )
);
