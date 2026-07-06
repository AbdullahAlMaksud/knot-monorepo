# 🧩 Sudoku — Glassmorphic Web Application

A premium, full-featured Sudoku web application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. It features a modern, high-contrast glassmorphism interface inspired by elegant design systems, offering smooth animations, robust localization, and a seamless keyboard-driven gameplay experience.

---

## ✨ Key Features

### 🎮 Gameplay & Intelligence
- **4 Balanced Difficulty Levels**: Choose from **Easy** (36 clues), **Medium** (30 clues), **Hard** (24 clues), and **Expert** (18 clues).
- **Unique-Solution Generator**: Puzzles are dynamically generated using backtracking and constraint validation algorithms to guarantee a single valid solution.
- **Pencil Notes Mode**: Draft candidate numbers in cells (`N` key or button toggle) to plan moves.
- **Instant Error Detection**: Automatic conflict highlighting showing duplicate numbers in columns, rows, or blocks.
- **Visual Assistance**: Auto-highlighting of the active row, column, box, and identical values, helping you focus on the grid.
- **Auto-Save & Persistence**: State is serialized and persisted automatically via Zustand to `localStorage` so you never lose your progress.
- **Personal Statistics**: High scores and best times are tracked individually for each difficulty level.

### 🌐 Complete Multilingual Localization (i18n)
- **English & Bengali Support**: Full user interface localization using `i18next`.
- **Dynamic Bengali Numerals**: Automatically translates all numbers—including cell values, board notes, timer, score, error counts, and input keys—to Bengali numerals (`১, ২, ৩...`) when switched.
- **Dynamic Fonts**: Dynamically loads the elegant Google Font **Hind Siliguri** for Bengali content, ensuring perfect visual hierarchy, while retaining clean default system fonts for English.
- **Hotkeys**: Toggle language instantly with the **L** key or via the Settings menu.

### 🎨 Premium UI/UX Design
- **Glassmorphic Aesthetic**: Frosted glass containers, ambient blur backdrops, and interactive drop shadows.
- **12 Curated Themes**:
  - **Dark Mode**: *Obsidian* (Amber-Gold), *Rose* (Pink-Red), *Emerald* (Green), *Violet* (Purple), *Amber* (Cyan), *Sapphire* (Blue), *Coral* (Orange).
  - **Light Mode**: *Snow* (Dark Slate), *Sakura* (Pink), *Mint* (Green), *Lavender* (Purple), *Honey* (Gold/Brown).
- **Minimalist Logo**: Custom vector-based tilted grid logo matching the UI's icon layout.
- **Interactive Audio**: Immersive gameplay feedback powered by the Web Audio API (can be toggled in settings).
- **Autohide Sidebar**: Clean drawer-style sidebar that slides out when hovering near the left edge, with a pinning option to lock it in place.
- **Single-Screen Experience**: Adaptive grid scaling designed to fit comfortably on any screen without vertical scrolling.
- **Micro-Animations**: Fluid transitions and springs powered by `framer-motion`.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|:---:|:---|
| `1` – `9` | Input number into selected cell |
| `Backspace` / `Delete` | Erase number from selected cell |
| `↑` `↓` `←` `→` | Navigate grid selection |
| `N` | Toggle pencil note mode |
| `D` | Cycle color theme |
| `F` | Toggle fullscreen mode |
| `L` | Toggle language (English ↔ Bengali) |
| `P` | Pin / unpin sidebar |

---

## 📁 Directory Structure

```text
src/
├── app/                    # Next.js App Router entry & configuration
│   ├── layout.tsx          # Root layout, Google Fonts setup, and language context
│   ├── page.tsx            # Main page entry
│   └── globals.css         # Tailwind directives, CSS custom variables, and theme definitions
├── components/
│   └── ui/                 # Reusable glassmorphic UI components
│       ├── GlassCard.tsx   # Glassmorphic container wrapper
│       ├── GlassButton.tsx # Glassmorphic click target
│       ├── Toggle.tsx      # Slide switch component
│       ├── ThemeProvider.tsx
│       └── SudokuLogo.tsx   # SVG custom tilted-grid logo
├── features/
│   ├── game/               # Core game screens & board logic
│   │   ├── HomeScreen.tsx  # Game entry/difficulty selection
│   │   ├── GameScreen.tsx  # Active game container
│   │   ├── SudokuGrid.tsx  # Interactive cell board
│   │   ├── NumberPad.tsx   # Gameplay keypad controls
│   │   └── WinModal.tsx    # Victory screen with statistics
│   ├── sidebar/            # Sidebar navigation layout
│   │   ├── Sidebar.tsx     # Sliding sidebar panel
│   │   └── AppShell.tsx    # Main layout grid and key listeners
│   ├── score/              # Score display
│   │   └── ScoreScreen.tsx # High scores and personal records
│   └── settings/           # Game configuration
│       └── SettingsScreen.tsx # Theme selectors, shortcuts guide, sound controls
└── shared/
    ├── hooks/              # Global React hooks
    │   ├── useKeyboard.ts  # Centralized keyboard listeners
    │   ├── useTimer.ts     # Precise game duration timer
    │   └── useSound.ts     # Audio synthesizer using Web Audio API
    ├── lib/                # Pure utilities and configuration
    │   ├── i18n.ts         # i18next bundles and translation helpers
    │   ├── sudoku.ts       # Grid generation, solving, and difficulty masks
    │   ├── storage.ts      # LocalStorage helpers
    │   └── utils.ts        # Helper class merges (clsx + tailwind-merge)
    └── stores/             # Global stores powered by Zustand
        ├── gameStore.ts    # Main game state machine
        ├── themeStore.ts   # UI colors and mode toggle
        └── settingsStore.ts# Audio toggles, languages, and app flags
```

---

## 🏗️ Technical Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static HTML Export ready)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Localization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Native Browser Web Audio API (no external asset downloads)

---

## 🚀 Getting Started

First, ensure you have [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
bun install
# or
npm install
```

### 2. Run Development Server
```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Build Production Target
```bash
bun run build
# or
npm run build
```

The optimized static production output will be generated inside the `.next` directory.

---

## 📜 License

This project is open-source and available under the MIT License.
