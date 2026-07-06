"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeId =
  | "obsidian" | "rose" | "emerald" | "violet" | "amber"
  | "sapphire" | "coral"
  | "snow" | "sakura" | "mint" | "lavender" | "honey";

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  accent: string;
  accentFg: string;
  ring: string;
  glow: string;
  isLight?: boolean;
}

export const THEMES: ThemeConfig[] = [
  // ── Dark Themes ─────────────────────────────────────────────────────
  {
    id: "obsidian",
    label: "Obsidian",
    accent: "#f59e0b",
    accentFg: "#0a0a0a",
    ring: "rgba(245,158,11,0.6)",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    id: "rose",
    label: "Rose",
    accent: "#f43f5e",
    accentFg: "#fff",
    ring: "rgba(244,63,94,0.6)",
    glow: "rgba(244,63,94,0.15)",
  },
  {
    id: "emerald",
    label: "Emerald",
    accent: "#10b981",
    accentFg: "#fff",
    ring: "rgba(16,185,129,0.6)",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    id: "violet",
    label: "Violet",
    accent: "#8b5cf6",
    accentFg: "#fff",
    ring: "rgba(139,92,246,0.6)",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    id: "amber",
    label: "Amber",
    accent: "#06b6d4",
    accentFg: "#fff",
    ring: "rgba(6,182,212,0.6)",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    id: "sapphire",
    label: "Sapphire",
    accent: "#3b82f6",
    accentFg: "#fff",
    ring: "rgba(59,130,246,0.6)",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    id: "coral",
    label: "Coral",
    accent: "#ff7a59",
    accentFg: "#0a0a0a",
    ring: "rgba(255,122,89,0.6)",
    glow: "rgba(255,122,89,0.15)",
  },
  // ── Light Themes ─────────────────────────────────────────────────────
  {
    id: "snow",
    label: "Snow",
    accent: "#0f172a",
    accentFg: "#fff",
    ring: "rgba(15,23,42,0.3)",
    glow: "rgba(15,23,42,0.06)",
    isLight: true,
  },
  {
    id: "sakura",
    label: "Sakura",
    accent: "#ec4899",
    accentFg: "#fff",
    ring: "rgba(236,72,153,0.3)",
    glow: "rgba(236,72,153,0.06)",
    isLight: true,
  },
  {
    id: "mint",
    label: "Mint",
    accent: "#059669",
    accentFg: "#fff",
    ring: "rgba(5,150,105,0.3)",
    glow: "rgba(5,150,105,0.06)",
    isLight: true,
  },
  {
    id: "lavender",
    label: "Lavender",
    accent: "#7c3aed",
    accentFg: "#fff",
    ring: "rgba(124,58,237,0.3)",
    glow: "rgba(124,58,237,0.06)",
    isLight: true,
  },
  {
    id: "honey",
    label: "Honey",
    accent: "#d97706",
    accentFg: "#fff",
    ring: "rgba(217,119,6,0.3)",
    glow: "rgba(217,119,6,0.06)",
    isLight: true,
  },
];

interface ThemeStore {
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  getTheme: () => ThemeConfig;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themeId: "obsidian",
      setTheme: (id) => set({ themeId: id }),
      cycleTheme: () => {
        const current = get().themeId;
        const idx = THEMES.findIndex((t) => t.id === current);
        const next = THEMES[(idx + 1) % THEMES.length];
        set({ themeId: next.id });
      },
      getTheme: () => {
        const id = get().themeId;
        return THEMES.find((t) => t.id === id) ?? THEMES[0];
      },
    }),
    { name: "sudoku-theme", skipHydration: true }
  )
);
