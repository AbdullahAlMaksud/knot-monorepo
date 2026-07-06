import type { Board } from "./types";
import type { Rng } from "./rng";
import { hasUniqueSolution, getSolutions } from "./solver";

/** Fisher-Yates shuffle using an injectable RNG so results are reproducible. */
function shuffle<T>(arr: T[], rng: Rng): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Finds a permutation of columns (one per row) such that queens in
 * consecutive rows are never in touching columns. This is the only
 * adjacency constraint that matters, since rows further apart can never be
 * "touching" regardless of column.
 */
function generateSolution(size: number, rng: Rng): number[] | null {
  const solution: number[] = new Array(size).fill(-1);
  const usedCols = new Array(size).fill(false);

  function backtrack(row: number): boolean {
    if (row === size) return true;
    const cols = shuffle(
      Array.from({ length: size }, (_, i) => i),
      rng
    );
    for (const col of cols) {
      if (usedCols[col]) continue;
      if (row > 0 && Math.abs(solution[row - 1] - col) <= 1) continue;
      solution[row] = col;
      usedCols[col] = true;
      if (backtrack(row + 1)) return true;
      usedCols[col] = false;
      solution[row] = -1;
    }
    return false;
  }

  return backtrack(0) ? solution : null;
}

/**
 * Grows `size` contiguous colour regions outward from each queen cell using
 * randomized flood fill (BFS-ish) until every cell on the board belongs to
 * exactly one region.
 */
function growRegions(size: number, solution: number[], rng: Rng): number[][] {
  const regions: number[][] = Array.from({ length: size }, () =>
    new Array(size).fill(-1)
  );

  type Cell = { r: number; c: number };
  const frontiers: Cell[][] = solution.map((col, row) => [{ r: row, c: col }]);

  solution.forEach((col, row) => {
    regions[row][col] = row;
  });

  let remaining = size * size - size;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Bias region growth by giving each region a slightly randomized "energy"
  // so region sizes/shapes vary between generations instead of forming
  // perfectly even blobs every time.
  const weights = solution.map(() => 0.6 + rng() * 0.8);

  while (remaining > 0) {
    // Pick a region to expand, weighted, skipping empty frontiers.
    const candidates = frontiers
      .map((f, id) => ({ id, f }))
      .filter((x) => x.f.length > 0);
    if (candidates.length === 0) break;

    const totalWeight = candidates.reduce(
      (sum, x) => sum + weights[x.id],
      0
    );
    let pick = rng() * totalWeight;
    let chosen = candidates[0];
    for (const cand of candidates) {
      pick -= weights[cand.id];
      if (pick <= 0) {
        chosen = cand;
        break;
      }
    }

    const regionId = chosen.id;
    const frontier = frontiers[regionId];
    const idx = Math.floor(rng() * frontier.length);
    const { r, c } = frontier[idx];

    const shuffledDirs = shuffle(dirs, rng);
    let expanded = false;
    for (const [dr, dc] of shuffledDirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      if (regions[nr][nc] !== -1) continue;
      regions[nr][nc] = regionId;
      frontiers[regionId].push({ r: nr, c: nc });
      remaining--;
      expanded = true;
      break;
    }
    if (!expanded) {
      // This cell is boxed in; remove it from the frontier so we stop
      // revisiting it.
      frontier.splice(idx, 1);
    }
  }

  // Safety net: if any cells are somehow unassigned (shouldn't happen on a
  // connected grid), assign them to the nearest region by proximity.
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (regions[r][c] === -1) {
        let best = 0;
        let bestDist = Infinity;
        solution.forEach((col, row) => {
          const d = Math.abs(row - r) + Math.abs(col - c);
          if (d < bestDist) {
            bestDist = d;
            best = row;
          }
        });
        regions[r][c] = best;
      }
    }
  }

  return regions;
}

function arraysEqual(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** Cells belonging to `regionId`, used for connectivity checks during repair. */
function regionCells(regions: number[][], regionId: number, size: number) {
  const cells: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (regions[r][c] === regionId) cells.push([r, c]);
    }
  }
  return cells;
}

/** Checks that `regionId` stays a single connected blob if `exclude` is removed. */
function staysConnectedWithout(
  regions: number[][],
  regionId: number,
  exclude: [number, number],
  seed: [number, number],
  size: number
): boolean {
  const cells = regionCells(regions, regionId, size).filter(
    ([r, c]) => !(r === exclude[0] && c === exclude[1])
  );
  if (cells.length === 0) return true;
  const key = (r: number, c: number) => r * size + c;
  const cellSet = new Set(cells.map(([r, c]) => key(r, c)));
  const visited = new Set<number>();
  const stack: [number, number][] = [seed];
  visited.add(key(seed[0], seed[1]));
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (stack.length) {
    const [r, c] = stack.pop()!;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      const k = key(nr, nc);
      if (!cellSet.has(k) || visited.has(k)) continue;
      visited.add(k);
      stack.push([nr, nc]);
    }
  }
  return visited.size === cellSet.size;
}

/**
 * Iteratively finds alternate valid solutions and re-assigns a boundary
 * cell that enabled each one to a neighbouring region, until the board has
 * exactly one solution (or we give up and let the caller retry with a
 * fresh solution/region layout).
 */
function repairRegions(
  size: number,
  solution: number[],
  regionsIn: number[][],
  rng: Rng,
  maxIterations = 400
): number[][] | null {
  const regions = regionsIn.map((row) => row.slice());

  for (let iter = 0; iter < maxIterations; iter++) {
    const board: Board = { size, regions, solution };
    const solutions = getSolutions(board, 2);
    if (solutions.length <= 1) return regions;

    const alt = solutions.find((s) => !arraysEqual(s, solution)) ?? solutions[1];
    const diffRows = shuffle(
      Array.from({ length: size }, (_, r) => r).filter(
        (r) => alt[r] !== solution[r]
      ),
      rng
    );

    let repaired = false;
    for (const row of diffRows) {
      const altCol = alt[row];
      const currentRegion = regions[row][altCol];

      const neighbors: [number, number][] = [
        [row - 1, altCol],
        [row + 1, altCol],
        [row, altCol - 1],
        [row, altCol + 1],
      ];
      const candidateRegions = Array.from(
        new Set(
          neighbors
            .filter(
              ([nr, nc]) =>
                nr >= 0 && nr < size && nc >= 0 && nc < size &&
                regions[nr][nc] !== currentRegion
            )
            .map(([nr, nc]) => regions[nr][nc])
        )
      );

      const seed: [number, number] = [currentRegion, solution[currentRegion]];
      for (const targetRegion of shuffle(candidateRegions, rng)) {
        if (
          staysConnectedWithout(regions, currentRegion, [row, altCol], seed, size)
        ) {
          regions[row][altCol] = targetRegion;
          repaired = true;
          break;
        }
      }
      if (repaired) break;
    }

    if (!repaired) return null;
  }
  return null;
}

export function generateBoard(size: number, rng: Rng, maxAttempts = 80): Board {
  let lastBoard: Board | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const solution = generateSolution(size, rng);
    if (!solution) continue;
    const initialRegions = growRegions(size, solution, rng);
    const repaired = repairRegions(size, solution, initialRegions, rng);
    const regions = repaired ?? initialRegions;
    const board: Board = { size, regions, solution };
    lastBoard = board;
    if (hasUniqueSolution(board)) {
      return board;
    }
  }

  // Fall back to the last generated board even if uniqueness couldn't be
  // confirmed within the attempt budget (extremely rare for size <= 11).
  return lastBoard as Board;
}
