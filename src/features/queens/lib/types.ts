export type Board = {
  size: number;
  /** regions[row][col] = region id (0..size-1) */
  regions: number[][];
  /** solution[row] = col of the queen in that row */
  solution: number[];
};

export type CellState = "empty" | "marked" | "queen";

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export const DIFFICULTY_SIZE: Record<Difficulty, number> = {
  easy: 6,
  medium: 7,
  hard: 8,
  expert: 9,
};
