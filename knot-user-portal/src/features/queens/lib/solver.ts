import type { Board } from "./types";

/**
 * Counts valid queen placements for a board (one queen per row, column and
 * region, no two queens touching -- including diagonally). Stops early once
 * `limit` solutions are found, since we only ever need to know if a puzzle
 * has exactly one solution.
 */
export function countSolutions(board: Board, limit = 2): number {
  const { size, regions } = board;
  const usedCols = new Array(size).fill(false);
  const usedRegions = new Array(size).fill(false);
  const colOfRow = new Array(size).fill(-1);
  let count = 0;

  function backtrack(row: number) {
    if (count >= limit) return;
    if (row === size) {
      count++;
      return;
    }
    for (let col = 0; col < size; col++) {
      if (usedCols[col]) continue;
      const region = regions[row][col];
      if (usedRegions[region]) continue;
      if (row > 0) {
        const prevCol = colOfRow[row - 1];
        if (Math.abs(prevCol - col) <= 1) continue;
      }
      usedCols[col] = true;
      usedRegions[region] = true;
      colOfRow[row] = col;

      backtrack(row + 1);

      usedCols[col] = false;
      usedRegions[region] = false;
      colOfRow[row] = -1;
      if (count >= limit) return;
    }
  }

  backtrack(0);
  return count;
}

export function hasUniqueSolution(board: Board): boolean {
  return countSolutions(board, 2) === 1;
}

/**
 * Returns up to `limit` distinct valid queen placements (as column arrays)
 * for a board. Used during generation to find and repair alternate
 * solutions so the final puzzle has exactly one.
 */
export function getSolutions(board: Board, limit = 2): number[][] {
  const { size, regions } = board;
  const usedCols = new Array(size).fill(false);
  const usedRegions = new Array(size).fill(false);
  const colOfRow = new Array(size).fill(-1);
  const results: number[][] = [];

  function backtrack(row: number) {
    if (results.length >= limit) return;
    if (row === size) {
      results.push(colOfRow.slice());
      return;
    }
    for (let col = 0; col < size; col++) {
      if (usedCols[col]) continue;
      const region = regions[row][col];
      if (usedRegions[region]) continue;
      if (row > 0) {
        const prevCol = colOfRow[row - 1];
        if (Math.abs(prevCol - col) <= 1) continue;
      }
      usedCols[col] = true;
      usedRegions[region] = true;
      colOfRow[row] = col;

      backtrack(row + 1);

      usedCols[col] = false;
      usedRegions[region] = false;
      colOfRow[row] = -1;
      if (results.length >= limit) return;
    }
  }

  backtrack(0);
  return results;
}
