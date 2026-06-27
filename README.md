# BYOU Storefront

The official e-commerce storefront for BYOU, a premium skincare brand by Nexulyze. This production-grade web application is built on top of Next.js 16 (App Router) and React 19, delivering a high-performance, responsive shopping experience.

---

## Production Deployment
* **Production URL:** [https://landing-byou.vercel.app](https://landing-byou.vercel.app)

---

## Overview

BYOU Storefront powers the entire customer-facing journey. The application features a modular, feature-based architecture (`src/screens`) for clear separation of concerns, and communicates with the BYOU REST API backend.

---

## Technology Stack

The application uses modern front-end technologies optimized for performance and type safety:

| Layer | Technology | Description |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | React framework for server-rendered and statically generated builds |
| Runtime & Language | React 19 / TypeScript | Type-safe development with the latest React primitives |
| Styling | Tailwind CSS v4 / PostCSS | Utility-first CSS framework with native CSS variables |
| Primitives | Radix UI / Base UI | Unstyled, accessible UI components for robust design systems |
| State & Query | TanStack React Query v5 | Server state management, caching, and background synchronization |
| HTTP Client | Axios | Custom-configured client with interceptors for server-side & client-side routing |
| Authentication | Better Auth | Unified client-server session management |
| Form Handling | React Hook Form | High-performance, extensible form validation |
| Notifications | Sonner | Clean, configurable toast notifications |
| Icons | Lucide React | Modern, lightweight icon library |
| Package Manager | Yarn Classic (1.22.22) | Dependency management |

---

## Features

The storefront implements a comprehensive suite of e-commerce capabilities:

* **Home Experience:** Hero section, product showcases, dynamic before/after gallery, skincare concern-based navigation, and testimonials.
* **Product Catalog:** Interactive shop pages, product listings with filters, and detailed product cards.
* **Product Detail Pages:** Variable-based pricing, detailed specifications, ingredients breakdown, and customer reviews.
* **Shopping Cart & Checkout:** Real-time cart synchronization, support for multi-currency dynamic pricing, automated shipping fee calculation, promotional coupon application, and cash-on-delivery (COD) workflows.
* **Order Management:** Real-time order tracking, dedicated order status pages, order history, and account summaries.
* **Customer Authentication:** Secure sign-in/sign-up flows, social authentication (Google OAuth), and password recovery procedures.
* **User Account Dashboard:** Profile management, multiple shipping address books, order tracking logs, and product review history.
* **Blog / Content Hub:** Category and tag-filtered blog posts with rich content layouts.
* **Brand & Editorial Content:** Custom landing screens detailing the BYOU Brand Story, Laboratory formulation science, and Contact pages with integrated FAQs.

---

## Project Structure

The project uses a structured, feature-oriented design to organize code files by functional domain rather than just technical role:

```
src/
├── app/                  Next.js App Router entry points and route segments
│   ├── (auth)/           Authentication routes (signin, signup, forgot-password)
│   └── (main)/           Core application routes (home, shop, product, checkout, etc.)
├── components/           Cross-cutting, reusable components
│   ├── common/           Global layout structures (Navbar, Footer, standard shell)
│   ├── icons/            Custom SVG and optimized icons
│   ├── shared/           Generic UI blocks (carousels, testimonial sliders)
│   └── ui/               Atom-level UI components (button, input, modal primitives)
├── screens/              Feature-specific screens containing business logic and UI composition
│   ├── auth/             Sign-in, sign-up forms and authentication layouts
│   ├── blog/             Blog post list and details rendering
│   ├── checkout/         Checkout wizard, shipping, and payment forms
│   ├── concern/          Skincare concern diagnostics and custom landing pages
│   ├── product/          Product showcase, reviews, and related content sections
│   ├── shop/             Product filter boards and listings
│   ├── orders/           Order confirmation, detail cards, and tracking
│   └── account/          Customer profiles, address books, and review tools
├── hooks/                Shared custom React hooks
├── lib/                  Core library initializations (better-auth, axios, global state helpers)
├── providers/            React Context providers wrapping the application
├── constants/            App-wide constant variables and config values
├── data/                 Static mockup and fallback datasets
└── utils/                Shared, stateless helper utilities
```

---

## Routing Architecture

The following key routes map to corresponding features:

| Path | Feature Context |
| --- | --- |
| `/` | Home page & featured highlights |
| `/shop` | Full product catalog listing |
| `/product/[slug]` | Product details, ingredients, and reviews |
| `/checkout` | Checkout interface |
| `/checkout/success` | Order confirmation screen |
| `/checkout/failed` | Order failure retry screen |
| `/orders/[orderId]` | Real-time order details and delivery status |
| `/account` | Customer profile, addresses, and order history |
| `/signin` | Customer sign-in page |
| `/signup` | Customer sign-up page |
| `/forgot-password` | Self-service password recovery |
| `/blog` | Articles, announcements, and guides |
| `/blog/[slug]` | Full blog article viewer |
| `/concern` | Skincare concerns directory |
| `/concern/[slug]` | Target remedies, routines, and guides for concerns |
| `/about` | Brand story and mission statement |
| `/lab` | Skincare formulations and scientific backing |
| `/contact` | Contact forms, location details, and FAQs |

---

## Getting Started

### Prerequisites

* Node.js (LTS version recommended, compatible with Next.js 16)
* Yarn Classic (`1.22.22`)
* Configuration access to a running instance of the BYOU Backend API

### Environment Variables

Configure application settings by copying `.env.example` or creating a `.env.local` file in the root of the project:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=https://your-public-assets-domain.com
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Endpoint URL of the backend API. Defaults to `https://byou-api.nexulyze.com` if not set. |
| `NEXT_PUBLIC_FRONTEND_URL` | Yes | Origin domain used by Better Auth for OAuth callbacks and redirections. |
| `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` | No | Public base URL for product media hosted on Cloudflare R2 storage. |

### Installation and Local Execution

1. Install project dependencies:
   ```bash
   yarn install
   ```

2. Start the local development server:
   ```bash
   yarn dev
   ```

3. View the application in your browser at `http://localhost:3000`.

---

## Available Scripts

Use the following scripts defined in `package.json` to manage development and production lifecycles:

| Command | Description |
| --- | --- |
| `yarn dev` | Launches Next.js dev server with hot-reloading |
| `yarn build` | Compiles the production-ready build artifacts |
| `yarn start` | Runs the compiled production server |
| `yarn lint` | Executes ESLint to check syntax and code guidelines |

---

## API Proxy Strategy

To circumvent Cross-Origin Resource Sharing (CORS) limits and protect browser-side API traffic, client-side requests are proxied via the Next.js dev/server routing configurations:

```ts
// next.config.ts configuration
source: "/api/v1/:path*"
destination: `${backendApiUrl}/api/v1/:path*`
```

* **Client-side Requests:** Reach the proxy endpoint `/api/v1/*` which resolves to the destination backend.
* **Server-side Requests:** (e.g. server components or Server Action queries) query the configured `NEXT_PUBLIC_API_URL` directly.

---

## Code Contribution Guidelines

To ensure style consistency and build integrity:

1. **Keep App Routes Lean:** Route handlers under `src/app/` should act as simple routers, forwarding composition and logical handling to screens in `src/screens/`.
2. **HTTP Requests:** Utilize `src/lib/axios.ts` for network communication. It abstracts path resolution for both server-side render environments and standard browser runtimes.
3. **Types:** Define domain-specific types in the appropriate `src/screens/*/services/type.ts` module, aligning them to corresponding backend structures.
4. **Media Resolution:** Product media references from the database must use the `getR2ImageUrl()` helper to generate valid source paths.
5. **No Build Artifacts:** Never track `.next/`, `.swc/`, or other build and development runtime output directories in git history.

### Pre-commit Verification

Run these commands locally prior to pushing or creating pull requests to prevent build pipeline failures:

```bash
yarn lint
yarn build
```

To run clean TypeScript checks without compilation output:
```bash
npx tsc --noEmit
```

---

## License

Copyright (c) 2026 Nexulyze. All Rights Reserved.

This codebase is proprietary software. Unauthorized distribution, modification, copy, or use of these assets is strictly prohibited.
