export type Difficulty = "easy" | "medium" | "hard" | "expert";

const CLUES: Record<Difficulty, number> = {
  easy: 36,
  medium: 30,
  hard: 24,
  expert: 18,
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let j = 0; j < 9; j++) if (board[row][j] === num) return false;
  for (let i = 0; i < 9; i++) if (board[i][col] === num) return false;
  const br = Math.floor(row / 3) * 3, bc = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[br + i][bc + j] === num) return false;
  return true;
}

function generateSolved(): number[][] {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  function fill(pos: number): boolean {
    if (pos === 81) return true;
    const row = Math.floor(pos / 9), col = pos % 9;
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const n of nums) {
      if (isValid(board, row, col, n)) {
        board[row][col] = n;
        if (fill(pos + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  fill(0);
  return board;
}

function countSolutions(board: number[][], limit = 2): number {
  let count = 0;
  function solve(pos: number): boolean {
    if (count >= limit) return true;
    if (pos === 81) { count++; return count >= limit; }
    const row = Math.floor(pos / 9), col = pos % 9;
    if (board[row][col] !== 0) return solve(pos + 1);
    for (let n = 1; n <= 9; n++) {
      if (isValid(board, row, col, n)) {
        board[row][col] = n;
        if (solve(pos + 1)) { board[row][col] = 0; return true; }
        board[row][col] = 0;
      }
    }
    return false;
  }
  solve(0);
  return count;
}

export function generatePuzzle(difficulty: Difficulty): {
  puzzle: number[][];
  solution: number[][];
  given: boolean[][];
} {
  const solution = generateSolved();
  const puzzle = solution.map(r => [...r]);
  const cells = shuffle([...Array(81).keys()]);
  let removed = 0;
  const target = 81 - CLUES[difficulty];

  for (const idx of cells) {
    if (removed >= target) break;
    const row = Math.floor(idx / 9), col = idx % 9;
    const val = puzzle[row][col];
    puzzle[row][col] = 0;
    const copy = puzzle.map(r => [...r]);
    if (countSolutions(copy) === 1) {
      removed++;
    } else {
      puzzle[row][col] = val;
    }
  }

  const given = puzzle.map(r => r.map(v => v !== 0));
  return { puzzle, solution, given };
}

export function isBoardComplete(board: number[][], solution: number[][]): boolean {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (board[i][j] !== solution[i][j]) return false;
  return true;
}

export function getConflicts(board: number[][]): Set<number> {
  const conflicts = new Set<number>();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (!v) continue;
      for (let j = 0; j < 9; j++) {
        if (j !== c && board[r][j] === v) {
          conflicts.add(r * 9 + c); conflicts.add(r * 9 + j);
        }
      }
      for (let i = 0; i < 9; i++) {
        if (i !== r && board[i][c] === v) {
          conflicts.add(r * 9 + c); conflicts.add(i * 9 + c);
        }
      }
      const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          const nr = br + i, nc = bc + j;
          if ((nr !== r || nc !== c) && board[nr][nc] === v) {
            conflicts.add(r * 9 + c); conflicts.add(nr * 9 + nc);
          }
        }
    }
  }
  return conflicts;
}
