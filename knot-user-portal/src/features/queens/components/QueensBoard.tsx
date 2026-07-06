"use client";

import { useMemo } from "react";
import { QueensCell } from "./QueensCell";
import { REGION_COLORS } from "../lib/themes";
import type { Board as BoardType, CellState } from "../lib/types";

type QueensBoardProps = {
  board: BoardType;
  cells: CellState[][];
  conflicts: Set<string>;
  onCellClick: (r: number, c: number) => void;
  disabled?: boolean;
  isLight?: boolean;
};

export function QueensBoard({ board, cells, conflicts, onCellClick, disabled, isLight }: QueensBoardProps) {
  const { size, regions } = board;

  const edgesGrid = useMemo(() => {
    const grid: {
      top: boolean;
      right: boolean;
      bottom: boolean;
      left: boolean;
    }[][] = [];
    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        const region = regions[r][c];
        row.push({
          top: r === 0 || regions[r - 1][c] !== region,
          left: c === 0 || regions[r][c - 1] !== region,
          right: c === size - 1 || regions[r][c + 1] !== region,
          bottom: r === size - 1 || regions[r + 1][c] !== region,
        });
      }
      grid.push(row);
    }
    return grid;
  }, [regions, size]);

  return (
    <div
      className="grid w-full rounded-2xl p-2 sm:p-3"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        aspectRatio: "1 / 1",
        background: isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.1)",
        border: isLight ? "1px solid rgba(15,23,42,0.1)" : "1px solid rgba(255,255,255,0.22)",
        backdropFilter: "blur(26px) saturate(160%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {cells.map((row, r) =>
        row.map((state, c) => (
          <QueensCell
            key={`${r}-${c}`}
            state={state}
            row={r}
            col={c}
            regionColor={REGION_COLORS[regions[r][c] % REGION_COLORS.length]}
            isConflict={conflicts.has(`${r}-${c}`)}
            regionEdges={edgesGrid[r][c]}
            onClick={() => onCellClick(r, c)}
            disabled={disabled}
            isLight={isLight}
          />
        ))
      )}
    </div>
  );
}
