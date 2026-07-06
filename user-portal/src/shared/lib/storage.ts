import type { Difficulty } from "./sudoku";

export interface GameState {
  puzzle: number[][];
  solution: number[][];
  given: boolean[][];
  board: number[][];
  difficulty: Difficulty;
  elapsed: number;
  mistakes: number;
  startedAt: number;
  complete: boolean;
}

export interface DiffStat {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number;
  totalTime: number;
}

export type Stats = Record<string, DiffStat>;

const GAME_KEY  = "sudoku_game_v3";
const STATS_KEY = "sudoku_stats_v3";

export function saveGame(state: GameState): void {
  try { localStorage.setItem(GAME_KEY, JSON.stringify(state)); } catch {}
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(GAME_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearGame(): void {
  try { localStorage.removeItem(GAME_KEY); } catch {}
}

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveStats(stats: Stats): void {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch {}
}

export function recordWin(difficulty: Difficulty, time: number): void {
  const stats = loadStats();
  if (!stats[difficulty]) stats[difficulty] = { gamesPlayed: 0, gamesWon: 0, bestTime: 0, totalTime: 0 };
  const d = stats[difficulty];
  d.gamesWon++;
  d.totalTime += time;
  if (!d.bestTime || time < d.bestTime) d.bestTime = time;
  saveStats(stats);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
