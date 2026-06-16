# Sudoku — Glassmorphic Focus Timer

A minimal, full-featured Sudoku game built with **Next.js 15 + TypeScript**, featuring a dark glassmorphism UI inspired by productivity focus apps.

## ✨ Features

### Gameplay
- **4 difficulty levels** — Easy (36 clues), Medium (30), Hard (24), Expert (18)
- **Unique-solution puzzles** generated with backtracking + constraint validation
- **Note mode** — pencil-mark possible digits in cells (`N` key or button)
- **Conflict highlighting** — invalid cells turn red instantly
- **Related-cell highlight** — row, column, box, and matching numbers dimmed
- **Auto-save** — game state persists to localStorage; resume on next visit
- **Personal bests** tracked per difficulty with win streaks

### UI / UX
- **Glassmorphism** — frosted glass cards, layered blur, animated gradient background
- **5 color themes** — Obsidian (gold), Rose, Emerald, Violet, Cyan
- **Autohide floating sidebar** — slides in on left-edge hover, pin to keep open
- **Single-screen layout** — no scrolling, fits any viewport
- **Smooth animations** — Framer Motion page transitions, cell pop-ins, win modal spring

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `1–9` | Enter number |
| `Backspace` / `Delete` | Erase cell |
| `↑ ↓ ← →` | Navigate cells |
| `N` | Toggle note mode |
| `D` | Cycle theme |
| `F` | Toggle fullscreen |
| `P` | Pin/unpin sidebar |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/                 # Shared UI primitives
│       ├── GlassCard.tsx
│       ├── GlassButton.tsx
│       ├── Toggle.tsx
│       └── ThemeProvider.tsx
├── features/
│   ├── game/               # Core game screens & components
│   │   ├── HomeScreen.tsx
│   │   ├── GameScreen.tsx
│   │   ├── SudokuGrid.tsx
│   │   ├── NumberPad.tsx
│   │   └── WinModal.tsx
│   ├── sidebar/
│   │   ├── Sidebar.tsx     # Floating autohide sidebar
│   │   └── AppShell.tsx    # Root layout orchestrator
│   ├── score/
│   │   └── ScoreScreen.tsx
│   └── settings/
│       └── SettingsScreen.tsx
└── shared/
    ├── hooks/
    │   ├── useKeyboard.ts  # Global keyboard shortcuts
    │   ├── useTimer.ts     # Game timer
    │   └── useSound.ts     # Web Audio API sound effects
    ├── lib/
    │   ├── sudoku.ts       # Puzzle generation & validation
    │   ├── storage.ts      # localStorage persistence
    │   └── utils.ts        # cn() helper
    └── stores/
        ├── gameStore.ts    # Game state (Zustand)
        ├── themeStore.ts   # Theme state (Zustand + persist)
        └── settingsStore.ts
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Framework (App Router, SSG) |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility styling |
| Framer Motion | Animations |
| Zustand | State management |
| Lucide React | Icons |
| Web Audio API | Sound effects |
| localStorage | Game persistence |

## 🎨 Themes

Press **D** anywhere to cycle themes, or use the sidebar palette icon, or visit Settings.

| Theme | Accent |
|-------|--------|
| Obsidian | Gold `#f59e0b` |
| Rose | Pink-red `#f43f5e` |
| Emerald | Green `#10b981` |
| Violet | Purple `#8b5cf6` |
| Cyan | Teal `#06b6d4` |
# SudokuWeb
