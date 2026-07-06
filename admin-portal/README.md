# Arcade Ops — Game Dashboard

Next.js (App Router) admin dashboard for the `server/` backend: players, scores, leaderboards,
and visitor tracking, protected behind the same RBAC roles as the API (admin/moderator only).

## Getting started

```bash
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at your backend
npm install
npm run dev                        # http://localhost:3000
```

Make sure the backend (`../server`) is running first, and that its `TRUSTED_ORIGINS` includes
`http://localhost:3000` so cookies are accepted cross-origin.

Sign in with an account that has the `admin` or `moderator` role (see the backend's
`npm run seed:admin` to bootstrap the first admin). Signing in with a plain `user` account will
show an access-denied screen rather than the dashboard.

## Structure

```
src/
  app/
    login/page.tsx          Sign-in screen (public)
    (dashboard)/layout.tsx  Session + role guard, renders the sidebar
    (dashboard)/page.tsx    Overview - KPI cards, top countries/routes
    (dashboard)/users/      Search, role changes, ban/unban, delete
    (dashboard)/scores/     Browse + delete submitted scores, filter by game
    (dashboard)/leaderboard/  Best score per player, filter by game/period
    (dashboard)/tracking/   Raw visitor sessions (IP, country, route, active time)
  components/                Sidebar, StatCard, and small shared UI primitives
  lib/
    auth-client.ts           better-auth React client (session, sign-in/out, admin.*)
    api.ts                   Typed fetch wrapper for the REST endpoints
  shared/permissions.ts      Client-safe mirror of the backend's RBAC roles
```

## Design

A dark "scoreboard" aesthetic: headline numbers render in tabular monospace with a soft
amber glow (`.stat-figure` / `.table-figure` in `globals.css`), mirroring an arcade cabinet's
LED score display — used consistently for every KPI, table score column, and leaderboard rank.
Space Grotesk for headings, Inter for body text, IBM Plex Mono for all numerics.

## Notes

- All data fetching (except auth) goes through `src/lib/api.ts`, which calls the backend's
  `/api/*` REST routes with `credentials: "include"` so the session cookie is sent along.
- `shared/permissions.ts` must stay in sync with `server/src/lib/permissions.ts` — if you add a
  new resource/role on the backend, mirror it here too so `authClient.admin.*` stays typed correctly.
- Building requires network access to Google Fonts (`fonts.googleapis.com`) the first time;
  swap the `next/font/google` imports in `app/layout.tsx` for a local/system stack if your
  build environment has no internet access.
