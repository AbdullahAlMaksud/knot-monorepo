"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  soundEnabled: boolean;
  highlightEnabled: boolean;
  autoNoteEnabled: boolean;
  showMistakes: boolean;
  sidebarPinned: boolean;
  toggleSound: () => void;
  toggleHighlight: () => void;
  toggleAutoNote: () => void;
  toggleShowMistakes: () => void;
  setSidebarPinned: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      highlightEnabled: true,
      autoNoteEnabled: false,
      showMistakes: true,
      sidebarPinned: false,
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHighlight: () => set((s) => ({ highlightEnabled: !s.highlightEnabled })),
      toggleAutoNote: () => set((s) => ({ autoNoteEnabled: !s.autoNoteEnabled })),
      toggleShowMistakes: () => set((s) => ({ showMistakes: !s.showMistakes })),
      setSidebarPinned: (v) => set({ sidebarPinned: v }),
    }),
    { name: "sudoku-settings" }
  )
);
