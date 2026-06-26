# BYOU Storefront

> The official e-commerce storefront for BYOU — a premium skincare brand by Nexulyze.

**Production URL:** [https://landing-byou.vercel.app](https://landing-byou.vercel.app)

---

## Overview

BYOU Storefront is a production-grade Next.js application powering the customer-facing shopping experience for BYOU skincare products. It covers the full customer journey — from product discovery and editorial content, through cart and checkout, to order tracking and account management.

Built with a feature-based architecture (`src/screens`, `src/components`, `src/lib`) and connected to the BYOU backend REST API for all dynamic data.

---

## Tech Stack

| Area | Tooling |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, Radix UI / Base UI |
| Data Fetching | TanStack React Query, Axios |
| Authentication | Better Auth (client + server) |
| Forms | React Hook Form |
| Notifications | Sonner |
| Icons | Lucide React |
| Image Storage | Cloudflare R2 (public assets) |
| Package Manager | Yarn Classic (`1.22.22`) |

---

## Features

- **Home** — Hero carousel, product showcases, brand story, before/after content, concern-based navigation, testimonials
- **Shop** — Published product listing, featured product hero
- **Product Detail** — Variants, pricing, reviews, related content
- **Cart & Checkout** — Cart, buy-now, multi-currency pricing, shipping charges, coupon codes, cash-on-delivery
- **Orders** — Order creation, success/failure pages, order tracking, order history
- **Authentication** — Sign in, sign up, Google OAuth, forgot password, session handling
- **Account** — Profile, shipping address, password change, order history, reviews
- **Blog** — Published blog listing with tag/category filtering, blog detail pages
- **Brand Pages** — About, Lab, Contact (with FAQ), Concern pages

---

## Project Structure

```
src/
├── app/                  Next.js route segments (App Router)
│   ├── (auth)/           Auth routes: signin, signup, forgot-password
│   └── (main)/           Main routes: home, shop, product, blog, checkout, account...
├── components/
│   ├── common/           Layout, Navbar, Footer, shared layout components
│   ├── ui/               Low-level UI primitives (buttons, modals, inputs...)
│   └── shared/           Cross-feature components (carousels, testimonials, modals)
├── screens/              Feature screens — business logic + composition
│   ├── auth/
│   ├── blog/
│   ├── checkout/
│   ├── product/
│   ├── shop/
│   ├── orders/
│   ├── account/
│   └── ...
├── hooks/                Shared React hooks
├── lib/                  Auth client, Axios instance, cart, checkout, orders, utilities
├── providers/            App-level React context providers
├── constants/            App-wide constants
├── data/                 Static fallback/content data
└── utils/                Shared utility functions
```

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/shop` | Product listing |
| `/product/[slug]` | Product detail |
| `/checkout` | Checkout flow |
| `/checkout/success` | Order confirmed |
| `/checkout/failed` | Order failed |
| `/orders/[orderId]` | Order detail & tracking |
| `/account` | Customer account (profile, orders, reviews) |
| `/signin` | Sign in |
| `/signup` | Sign up |
| `/forgot-password` | Password reset |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog detail |
| `/concern` | Concern listing |
| `/concern/[slug]` | Concern detail |
| `/about` | About BYOU |
| `/lab` | Lab & formulation content |
| `/contact` | Contact, FAQ, and testimonials |

---

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- Yarn Classic `1.22.22`
- Access to the BYOU backend API

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=https://your-public-assets-domain.com
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Backend API origin. Defaults to `https://byou-api.nexulyze.com` if omitted. |
| `NEXT_PUBLIC_FRONTEND_URL` | Yes | Frontend origin used by the Better Auth client. |
| `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` | No | Public base URL for R2-hosted product images. |

### Install & Run

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the development server |
| `yarn build` | Create a production build |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |

---

## API Proxy

Browser-side requests are proxied through Next.js to avoid CORS and keep requests same-origin:

```ts
// next.config.ts
source: "/api/v1/:path*"
destination: `${backendApiUrl}/api/v1/:path*`
```

Server-side calls use the configured backend origin directly.

---

## Development Guidelines

- Keep API types in `src/screens/*/services/type.ts` aligned with backend payloads.
- Use `src/lib/axios.ts` for all HTTP calls — it handles browser vs. server base URL automatically.
- Route files under `src/app/` should contain minimal logic — delegate to the corresponding screen in `src/screens/`.
- Resolve product images through `getR2ImageUrl()` when working with backend image keys.
- Do not commit `.next/`, `tsconfig.tsbuildinfo`, or any generated build artifacts.

### Before Merging

```bash
yarn lint
yarn build
```

For TypeScript-only checks during development:

```bash
npx tsc --noEmit
```

---

## License

Copyright (c) 2026 Nexulyze. All Rights Reserved.

This is proprietary software. Unauthorized use, copying, or distribution is strictly prohibited.
