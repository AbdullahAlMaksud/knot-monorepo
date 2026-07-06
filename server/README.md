# Game Backend

Node.js + [Hono](https://hono.dev) + MongoDB + [better-auth](https://better-auth.com) backend for a
multi-game platform: authentication, RBAC, protected routes, game scores, a leaderboard, per-player
settings, and visitor/analytics tracking (including anonymous guests, by IP + country).

## Stack

- **Framework:** Hono (runs on `@hono/node-server`)
- **Database:** MongoDB (native driver, no ORM)
- **Auth:** better-auth (email/password, HttpOnly session cookies) + the official `admin` plugin for RBAC
- **Validation:** Zod
- **Geo lookup:** `geoip-lite` (fully offline, no third-party API calls/limits)
- **Language:** TypeScript, ESM

## Getting started

```bash
cp .env.example .env       # then edit MONGODB_URI / BETTER_AUTH_SECRET
npm install
npm run dev                # http://localhost:8000
```

Generate a real secret for `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### Bootstrapping the first admin

New sign-ups always get the `user` role. To create your first admin, set
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env`, then:

```bash
npm run seed:admin
```

Re-running it on an existing email just promotes that account to `admin`.

## Architecture

```
src/
  config/env.ts            Zod-validated environment config
  lib/
    db.ts                  Single MongoClient/Db instance + indexes
    auth.ts                better-auth instance (mongodb adapter + admin/RBAC plugin)
    permissions.ts          RBAC statement + role definitions (user/moderator/admin)
    geo.ts                  Client IP extraction + offline country lookup
    response.ts             ok()/fail() JSON response helpers
  middlewares/
    session.middleware.ts   Attaches session/user to context (doesn't reject)
    rbac.middleware.ts      requireAuth / requirePermission / protectedRoute
    tracking.middleware.ts  Guest-id cookie + IP + country on every request
    error.middleware.ts     Central error handler
  modules/
    auth/         Mounts the better-auth handler at /api/auth/*
    users/        Self-service "/me" profile routes
    scores/       Game score create/read/delete
    leaderboard/  Aggregated best-score-per-player rankings
    settings/     Per-player theme/lang/sound/vibration settings
    tracking/     Visitor session heartbeat, route-visit logging, admin stats
    admin/        User management (role/ban/delete) + dashboard overview stats
  types/index.ts  Shared Hono context variable types
  scripts/seedAdmin.ts
```

Each module follows `*.routes.ts` (HTTP layer) → `*.service.ts` (DB access) → `*.types.ts`
(zod schemas + TS types), so adding a new game feature means adding one new module folder.

## RBAC model

Defined once in `src/lib/permissions.ts` and shared by the server (and re-usable as-is by any
better-auth client, e.g. the dashboard):

| Role        | score                                   | leaderboard | settings      | tracking          | user (admin plugin)              |
|-------------|------------------------------------------|-------------|---------------|--------------------|-----------------------------------|
| `user`      | create, read, update, delete (own)       | read        | read, update  | read (own)         | —                                  |
| `moderator` | create, read, update, delete, delete-any | read        | read, update  | read, read-any     | —                                  |
| `admin`     | create, read, update, delete, delete-any | read        | read, update  | read, read-any     | full (list/ban/set-role/delete/…) |

Route protection is layered:
1. `sessionMiddleware` (global) — reads the cookie, sets `c.get("user")`, never blocks.
2. `requireAuth` — 401s if there's no signed-in user.
3. `requirePermission({ resource: ["action"] })` — 403s if the user's role lacks that permission
   (checked via `auth.api.userHasPermission`, no extra round trip beyond one DB read).

Guests (no account) are still tracked with a stable `gid` HttpOnly cookie so they can submit scores,
have personal settings, and own/delete their own scores without ever signing up.

## API reference

All responses are `{ success: true, data }` or `{ success: false, error: { message } }`.

### Auth — `/api/auth/*` (better-auth)
- `POST /api/auth/sign-up/email`, `POST /api/auth/sign-in/email`, `POST /api/auth/sign-out`
- `GET /api/auth/get-session`
- `POST /api/auth/admin/set-role`, `.../ban-user`, `.../unban-user`, `.../remove-user`, `GET .../list-users`
  (also exposed through the friendlier wrappers under `/api/admin` below)

### Users
- `GET /api/users/me` — auth required
- `PATCH /api/users/me` — auth required

### Scores
- `POST /api/scores` — public (guest or user). Body: `{ game, score, playerName?, metadata? }`
- `GET /api/scores?game=&mine=&userId=&page=&limit=` — public
- `GET /api/scores/:id` — public
- `DELETE /api/scores/:id` — owner (guest or user) always allowed; otherwise requires `score:delete-any`

### Leaderboard
- `GET /api/leaderboard?game=&period=all|day|week|month&limit=` — public, best score per player

### Settings
- `GET /api/settings` — public (per guest/user, auto-created with defaults)
- `PATCH /api/settings` — public. Body: any subset of `{ theme, lang, sound, vibration, musicVolume, sfxVolume }`

### Tracking
- `POST /api/tracking/heartbeat` — public beacon. Body: `{ route, activeSeconds }`
- `POST /api/tracking/route` — public beacon. Body: `{ route, durationSeconds }`
- `GET /api/tracking/sessions?page=&limit=` — requires `tracking:read-any`
- `GET /api/tracking/stats` — requires `tracking:read-any`

### Admin
- `GET /api/admin/users?search=&page=&limit=` — requires `user:list`
- `POST /api/admin/users/:id/role` — requires `user:set-role`. Body: `{ role: "user"|"moderator"|"admin" }`
- `POST /api/admin/users/:id/ban` — requires `user:ban`. Body: `{ reason?, banExpiresIn? }`
- `POST /api/admin/users/:id/unban` — requires `user:ban`
- `DELETE /api/admin/users/:id` — requires `user:delete`
- `GET /api/admin/overview` — requires `tracking:read-any`. Headline counts for the dashboard.

## Anonymous play & tracking, in short

1. `trackingMiddleware` gives every visitor a `gid` HttpOnly cookie on their first request.
2. The game client calls `POST /api/tracking/heartbeat` every ~15s with the current route, and
   `POST /api/tracking/route` when navigating away from a route (with time spent).
3. IP → country is resolved locally via `geoip-lite` (no external calls, no rate limits) and stored on
   both `visitor_sessions` and each submitted `score`.
4. Scores submitted while signed out are tied to `gid`; if the guest later signs up, their guest scores
   currently remain guest-owned (linking them to the new account is a good next step — join on the `gid`
   cookie value during sign-up).

## Production notes

- Put the dashboard behind HTTPS on a domain that shares a parent with the API (or set
  `advanced.crossSubDomainCookies` / `sameSite: "none"` in `lib/auth.ts`) so session cookies survive
  cross-origin requests.
- Set `TRUSTED_ORIGINS` to your real dashboard/game-client origins.
- Put a reverse proxy in front that sets `X-Forwarded-For` correctly (used for IP tracking).
