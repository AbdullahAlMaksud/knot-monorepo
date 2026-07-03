"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { generateBoard } from "../lib/generator";
import { mulberry32, hashStringToSeed, todaySeedString, randomSeed } from "../lib/rng";
import type { Board, CellState, Difficulty } from "../lib/types";
import { DIFFICULTY_SIZE } from "../lib/types";

export type GameMode = "daily" | "practice";

type StreakData = {
  lastSolvedDate: string | null;
  streak: number;
};

const STREAK_KEY = "queens-streak-v1";

function loadStreak(): StreakData {
  if (typeof window === "undefined") return { lastSolvedDate: null, streak: 0 };
  try {
    const raw = window.localStorage.getItem(STREAK_KEY);
    if (!raw) return { lastSolvedDate: null, streak: 0 };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { lastSolvedDate: null, streak: 0 };
  }
}

function saveStreak(data: StreakData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

function dateStringDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}

function emptyCells(size: number): CellState[][] {
  return Array.from({ length: size }, () => new Array(size).fill("empty"));
}

export type ConflictInfo = {
  cells: Set<string>; // "r-c" keys
};

function key(r: number, c: number) {
  return `${r}-${c}`;
}

function computeConflicts(board: Board, cells: CellState[][]): ConflictInfo {
  const size = board.size;
  const queens: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (cells[r][c] === "queen") queens.push([r, c]);
    }
  }
  const bad = new Set<string>();
  const byRow = new Map<number, [number, number][]>();
  const byCol = new Map<number, [number, number][]>();
  const byRegion = new Map<number, [number, number][]>();

  for (const [r, c] of queens) {
    byRow.set(r, [...(byRow.get(r) ?? []), [r, c]]);
    byCol.set(c, [...(byCol.get(c) ?? []), [r, c]]);
    const region = board.regions[r][c];
    byRegion.set(region, [...(byRegion.get(region) ?? []), [r, c]]);
  }

  for (const group of [...byRow.values(), ...byCol.values(), ...byRegion.values()]) {
    if (group.length > 1) {
      for (const [r, c] of group) bad.add(key(r, c));
    }
  }

  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const [r1, c1] = queens[i];
      const [r2, c2] = queens[j];
      if (Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1) {
        bad.add(key(r1, c1));
        bad.add(key(r2, c2));
      }
    }
  }

  return { cells: bad };
}

export function useQueensEngine() {
  const [mode, setMode] = useState<GameMode>("daily");
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [board, setBoard] = useState<Board | null>(null);
  const [cells, setCells] = useState<CellState[][]>([]);
  const [history, setHistory] = useState<CellState[][][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [streak, setStreak] = useState<StreakData>({ lastSolvedDate: null, streak: 0 });
  const [generating, setGenerating] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const winHandledRef = useRef(false);

  useEffect(() => {
    setStreak(loadStreak());
  }, []);

  const startNewGame = useCallback((nextMode?: GameMode, nextDifficulty?: Difficulty) => {
    const effectiveMode = nextMode ?? mode;
    const effectiveDifficulty = nextDifficulty ?? difficulty;
    setGenerating(true);
    winHandledRef.current = false;
    setTimeout(() => {
      const size = DIFFICULTY_SIZE[effectiveDifficulty];
      const seed =
        effectiveMode === "daily"
          ? hashStringToSeed(`${todaySeedString()}-${size}`)
          : randomSeed();
      const rng = mulberry32(seed);
      const newBoard = generateBoard(size, rng);
      setBoard(newBoard);
      setCells(emptyCells(size));
      setHistory([]);
      setMistakes(0);
      setElapsed(0);
      setRunning(true);
      setGenerating(false);
    }, 30);
  }, [mode, difficulty]);

  // Initial board on mount.
  useEffect(() => {
    startNewGame("daily", "hard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const conflicts = useMemo(() => {
    if (!board) return new Set<string>();
    return computeConflicts(board, cells).cells;
  }, [board, cells]);

  const queenCount = useMemo(() => {
    let n = 0;
    for (const row of cells) for (const c of row) if (c === "queen") n++;
    return n;
  }, [cells]);

  const solved = Boolean(board) && queenCount === board?.size && conflicts.size === 0;

  // Timer.
  useEffect(() => {
    if (running && !solved) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, solved]);

  // One-time win side effects: stop the clock and record the daily streak.
  useEffect(() => {
    if (!solved || winHandledRef.current) return;
    winHandledRef.current = true;
    setRunning(false);
    if (mode === "daily") {
      const today = todaySeedString();
      setStreak((prev) => {
        if (prev.lastSolvedDate === today) return prev;
        const yesterday = dateStringDaysAgo(1);
        const nextStreak = prev.lastSolvedDate === yesterday ? prev.streak + 1 : 1;
        const next = { lastSolvedDate: today, streak: nextStreak };
        saveStreak(next);
        return next;
      });
    }
  }, [solved, mode]);

  const cycleCell = useCallback(
    (r: number, c: number) => {
      if (!board || solved) return;
      setHistory((h) => [...h, cells.map((row) => row.slice())]);
      setCells((prev) => {
        const next = prev.map((row) => row.slice());
        const state = next[r][c];
        next[r][c] = state === "empty" ? "marked" : state === "marked" ? "queen" : "empty";
        if (next[r][c] === "queen") {
          const testConflicts = computeConflicts(board, next).cells;
          if (testConflicts.has(key(r, c))) {
            setMistakes((m) => m + 1);
          }
        }
        return next;
      });
    },
    [board, cells, solved]
  );

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prevState = h[h.length - 1];
      setCells(prevState);
      return h.slice(0, -1);
    });
  }, []);

  const clearBoard = useCallback(() => {
    if (!board) return;
    setHistory((h) => [...h, cells.map((row) => row.slice())]);
    setCells(emptyCells(board.size));
    winHandledRef.current = false;
    setRunning(true);
  }, [board, cells]);

  return {
    mode,
    setMode,
    difficulty,
    setDifficulty,
    board,
    cells,
    conflicts,
    mistakes,
    elapsed,
    solved,
    generating,
    streak,
    queenCount,
    cycleCell,
    undo,
    canUndo: history.length > 0,
    clearBoard,
    startNewGame,
  };
}
