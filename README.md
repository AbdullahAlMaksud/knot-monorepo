# 🧩 Knot Monorepo

Welcome to the **Knot Monorepo**—a unified codebase containing the entire ecosystem for the Knot logic puzzle and brain training platform. The project is designed with a focus-oriented, premium, and glassmorphic layout, offering users smooth and beautiful puzzle experiences like Sudoku, Queens, and more across web and mobile platforms.

This repository uses **Bun Workspaces** to manage multiple packages under a single monorepo layout, enabling clean dependency resolution and shared tool configurations.

---

## 🗂️ Monorepo Structure

The monorepo contains four primary workspaces:

```
knot-monorepo/
├── admin-portal/      # Next.js web application for game dashboard and analytics
├── app/               # Expo (React Native) mobile application for cross-platform play
├── server/            # Hono-based backend API handling authentication and game tracking
├── user-portal/       # Next.js customer-facing game client with glassmorphic UI
├── package.json       # Root package configuration defining Bun workspaces
└── bun.lock           # Root unified lockfile
```

---

## 🛠️ Workspaces Deep-Dive

### 1. 🧩 [user-portal](file:///home/abdullah/MyProject/Knot/user-portal) (Next.js 16)
The primary customer gameplay interface.
* **Key Features**:
  * Premium, high-contrast **glassmorphic design** featuring fluid hover transitions and micro-animations.
  * Puzzles (Sudoku and Queens) generated dynamically using backtracking algorithms ensuring a unique solution.
  * Client-side state persistence (Zustand + local storage) with hydration-safe deferred boot.
  * Complete English & Bengali UI localization (i18n), translating layout text and game numbers to Bengali numerals (`১, ২, ৩...`).
* **Tech Stack**: Next.js 16 (Turbopack), React 19, Framer Motion, Radix UI, Tailwind CSS v4, Zustand.

### 2. 📱 [app](file:///home/abdullah/MyProject/Knot/app) (Expo / React Native)
The mobile version of the game client.
* **Key Features**:
  * Cross-platform build targetting Android and iOS.
  * Integrated haptic feedbacks and native device layout controls.
  * Safe-area and edge-to-edge screens for premium mobile feel.
* **Tech Stack**: Expo v56, React Native 0.85, Expo Router, Zustand.

### 3. ⚙️ [server](file:///home/abdullah/MyProject/Knot/server) (Hono API)
The backend API server managing player data.
* **Key Features**:
  * Better-Auth Integration: Session handling, multi-factor logins, and settings syncing.
  * RBAC (Role-Based Access Control) for users, administrators, and moderators.
  * Leaderboard processing, user tracking, and geoip lookup for analytics.
* **Tech Stack**: Hono (running on Node.js/Bun), MongoDB, Better-Auth, TypeScript, Zod.

### 4. 📊 [admin-portal](file:///home/abdullah/MyProject/Knot/admin-portal) (Next.js 15)
The administrative management dashboard.
* **Key Features**:
  * Administrative tables listing active users, scores, game tracking, and audit logs.
  * Analytics rendering backend-gathered statistics.
* **Tech Stack**: Next.js 15, React 19, Better-Auth client, Lucide Icons.

---

## ⚡ Prerequisite & Getting Started

Make sure you have [Bun](https://bun.sh) (version 1.x or later) installed on your system.

### 1. Installation
Run the following command at the root of the project to download and link dependencies across all workspaces:
```bash
bun install
```

### 2. Running Dev Servers
You can run any of the workspaces independently using filtering scripts defined in the root `package.json`:

* **Start User Portal**:
  ```bash
  bun dev:user-portal
  ```
* **Start Admin Portal**:
  ```bash
  bun dev:admin-portal
  ```
* **Start Hono Backend Server**:
  ```bash
  bun dev:server
  ```
* **Start Expo Mobile App**:
  ```bash
  bun dev:app
  ```

---

## 🔒 Code Quality and Verification

To verify typescript compliance across components, you can run:

* **Verify Server Types**:
  ```bash
  bun --filter=knot-server run typecheck
  ```
* **Verify App Types**:
  ```bash
  bun --filter=knot-app run tsc --noEmit
  ```
* **Production Build Test (User Portal)**:
  ```bash
  bun --filter=knot-user-portal run build
  ```
