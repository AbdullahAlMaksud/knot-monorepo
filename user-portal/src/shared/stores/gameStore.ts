"use client";

import { create } from "zustand";
import { generatePuzzle, isBoardComplete, type Difficulty } from "@/shared/lib/sudoku";
import { saveGame, loadGame, clearGame, recordWin } from "@/shared/lib/storage";

export type GameView = "home" | "game";

// Sound callback injected from UI layer (avoids circular dep with Web Audio)
type SoundFn = (type: "input" | "error" | "erase" | "win" | "note") => void;
let _playSound: SoundFn | null = null;
export function registerSoundFn(fn: SoundFn) { _playSound = fn; }
function snd(type: Parameters<SoundFn>[0]) { _playSound?.(type); }

interface GameStore {
  view: GameView;
  difficulty: Difficulty | null;
  puzzle: number[][] | null;
  solution: number[][] | null;
  given: boolean[][] | null;
  board: number[][] | null;
  notes: Record<number, Set<number>>;
  selected: [number, number] | null;
  elapsed: number;
  running: boolean;
  mistakes: number;
  complete: boolean;
  noteMode: boolean;
  timerStart: number;

  setView: (v: GameView) => void;
  startGame: (d: Difficulty) => void;
  restoreGame: () => boolean;
  selectCell: (r: number, c: number) => void;
  inputNumber: (n: number) => void;
  eraseCell: () => void;
  toggleNoteMode: () => void;
  toggleNote: (n: number) => void;
  tick: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()((set, get) => ({
  view: "home",
  difficulty: null,
  puzzle: null,
  solution: null,
  given: null,
  board: null,
  notes: {},
  selected: null,
  elapsed: 0,
  running: false,
  mistakes: 0,
  complete: false,
  noteMode: false,
  timerStart: 0,

  setView: (view) => set({ view }),

  startGame: (difficulty) => {
    const { puzzle, solution, given } = generatePuzzle(difficulty);
    const board = puzzle.map((r) => [...r]);
    const timerStart = Date.now();
    set({
      view: "game",
      difficulty,
      puzzle,
      solution,
      given,
      board,
      notes: {},
      selected: null,
      elapsed: 0,
      running: true,
      mistakes: 0,
      complete: false,
      noteMode: false,
      timerStart,
    });
    clearGame();
  },

  restoreGame: () => {
    const saved = loadGame();
    if (!saved || saved.complete) return false;
    const timerStart = Date.now() - saved.elapsed * 1000;
    set({
      view: "game",
      difficulty: saved.difficulty,
      puzzle: saved.puzzle,
      solution: saved.solution,
      given: saved.given,
      board: saved.board,
      notes: {},
      selected: null,
      elapsed: saved.elapsed,
      running: true,
      mistakes: saved.mistakes,
      complete: false,
      noteMode: false,
      timerStart,
    });
    return true;
  },

  selectCell: (r, c) => set({ selected: [r, c] }),

  inputNumber: (n) => {
    const { selected, board, given, solution, complete, noteMode, notes, difficulty, elapsed } = get();
    if (!selected || !board || !given || !solution || complete) return;
    const [r, c] = selected;
    if (given[r][c]) return;

    if (noteMode) {
      get().toggleNote(n);
      return;
    }

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = n;
    const idx = r * 9 + c;
    const newNotes = { ...notes };
    delete newNotes[idx];

    let newMistakes = get().mistakes;
    let newComplete = false;

    if (n !== 0 && n !== solution[r][c]) {
      newMistakes++;
      snd("error");
    } else if (n !== 0) {
      snd("input");
      if (isBoardComplete(newBoard, solution)) {
        newComplete = true;
        if (difficulty) recordWin(difficulty, elapsed);
        clearGame();
        snd("win");
      }
    }

    set({ board: newBoard, notes: newNotes, mistakes: newMistakes, complete: newComplete, running: !newComplete });

    if (!newComplete) {
      const { puzzle, solution: sol, given: giv, difficulty: diff } = get();
      saveGame({
        puzzle: puzzle!,
        solution: sol!,
        given: giv!,
        board: newBoard,
        difficulty: diff!,
        elapsed: get().elapsed,
        mistakes: newMistakes,
        startedAt: get().timerStart,
        complete: false,
      });
    }
  },

  eraseCell: () => {
    const { selected, board, given, complete } = get();
    if (!selected || !board || !given || complete) return;
    const [r, c] = selected;
    if (given[r][c]) return;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = 0;
    const idx = r * 9 + c;
    const newNotes = { ...get().notes };
    delete newNotes[idx];
    set({ board: newBoard, notes: newNotes });
    snd("erase");
  },

  toggleNoteMode: () => set((s) => ({ noteMode: !s.noteMode })),

  toggleNote: (n) => {
    const { selected, notes } = get();
    if (!selected) return;
    const idx = selected[0] * 9 + selected[1];
    const current = notes[idx] ? new Set(notes[idx]) : new Set<number>();
    if (current.has(n)) current.delete(n);
    else current.add(n);
    set({ notes: { ...notes, [idx]: current } });
    snd("note");
  },

  tick: () => {
    const { running, complete, timerStart } = get();
    if (!running || complete) return;
    set({ elapsed: Math.floor((Date.now() - timerStart) / 1000) });
  },

  resetGame: () => {
    set({
      view: "home",
      puzzle: null, solution: null, given: null, board: null,
      notes: {}, selected: null, elapsed: 0, running: false,
      mistakes: 0, complete: false, noteMode: false, difficulty: null,
    });
    clearGame();
  },
}));
