# BYOU Storefront

BYOU Storefront is the public e-commerce website for BYOU skincare products. It handles product discovery, editorial content, customer authentication, cart and checkout flows, customer account management, order history, and content pages for the BYOU brand. The application is built with Next.js App Router, React, TypeScript, Better Auth, TanStack Query, Axios, Tailwind CSS, and a shadcn-style component system.

## Live URL

The current production storefront URL referenced by the project is:

```text
https://landing-byou.vercel.app/
```

## Overview

The storefront is designed for customers browsing and purchasing BYOU skincare products, while keeping product, blog, order, and account data connected to the BYOU backend API.

Current modules include:

- Home page with hero carousel, product showcases, brand story, concern-based navigation, before/after content, testimonials, and featured products
- Shop and product detail pages powered by published product API data
- Cart, buy-now, checkout, order success, and order failure flows
- Customer authentication for sign in, sign up, Google sign in, forgot password, and session handling
- Customer account area with profile, shipping address, password update, and order history
- Blog list and blog detail pages powered by published blog API data
- Static brand pages including About, Lab, Contact, and Concern pages
- Shared loading, toast, form, layout, navigation, product, checkout, and content components

## Tech Stack

| Area               | Tooling                                                    |
| ------------------ | ---------------------------------------------------------- |
| Framework          | Next.js 16 App Router                                      |
| UI                 | React 19, Tailwind CSS v4, Radix UI/Base UI primitives     |
| Language           | TypeScript                                                 |
| Data fetching      | TanStack React Query, Axios                                |
| Auth               | Better Auth client                                         |
| Forms and UI state | React Hook Form, React state, reusable local UI components |
| Notifications      | Sonner                                                     |
| Icons              | Lucide React                                               |
| Images             | Next.js Image, Cloudflare R2 public assets                 |
| Package manager    | Yarn Classic                                               |

## Requirements

- Node.js compatible with Next.js 16
- Yarn Classic `1.22.22`
- Access to the BYOU backend API
- Environment variables configured in `.env.local`

## Environment Variables

Create `.env.local` in the project root.

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=https://your-public-assets-domain.com
```

Common variables used by the app:

| Variable                         | Required | Purpose                                                                                                                                                 |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`            | Yes      | Backend API origin. If the value does not include `/api/v1`, the app appends it where needed. Defaults to `https://byou-api.nexulyze.com` when omitted. |
| `NEXT_PUBLIC_FRONTEND_URL`       | Yes      | Frontend origin used by the Better Auth client when browser origin is unavailable.                                                                      |
| `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` | No       | Public product image base URL for R2 image keys returned by the backend.                                                                                |

For production Google OAuth and Better Auth setup, keep the backend auth configuration and Google redirect URI aligned with the deployed frontend domain.

## API Routing

The app uses a same-origin API proxy for browser requests.

```ts
// next.config.ts
source: "/api/v1/:path*";
destination: `${backendApiUrl}/api/v1/:path*`;
```

Browser-side services call relative `/api/v1` routes. Server-side calls use the configured backend origin directly. This keeps browser requests same-origin while still supporting server rendering and API access.

## Product Experience

The storefront supports the current published catalog payload shape:

- Published product list and product detail data
- Product slugs for storefront detail routes
- Featured product placement on the home and shop pages
- Product variants with price, quantity, and default variant handling
- R2-backed product image keys and public image URL resolution
- Add-to-cart and buy-now flows
- Product checkout item resolution against the latest published product data

## Checkout and Orders

The checkout flow supports:

- Cart checkout and direct buy-now checkout
- Customer session-aware order creation
- Bangladesh-focused shipping fields and phone formatting
- Inside-Dhaka and outside-Dhaka delivery fee handling
- Cash payment method payloads
- Order success and failure pages
- Customer order history in the account area

## Blog and Content

The blog and content surfaces support:

- Published blog listing
- Blog filtering by category, search text, and tag
- Blog detail pages by slug
- Static editorial and brand pages for About, Lab, Contact, and Concerns
- Sanitized HTML rendering where backend content requires it

## Getting Started

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open the app:

```bash
http://localhost:3000
```

## Scripts

| Command      | Description                                 |
| ------------ | ------------------------------------------- |
| `yarn dev`   | Start the Next.js development server.       |
| `yarn build` | Create a production build.                  |
| `yarn start` | Start the production server after building. |
| `yarn lint`  | Run ESLint across the codebase.             |

## Project Structure

```text
app/                 Next.js routes, layouts, loading, not-found, and global styles
components/          Shared UI, page, product, checkout, account, auth, and content components
data/                Local static product and concern fallback/content data
docs/                API and order-flow documentation
hooks/               Shared React hooks
lib/                 Auth, API client, cart, checkout, orders, sanitize, and utility helpers
providers/           Application-level React providers
public/              Static images and public assets
services/            API clients, queries, mutations, query keys, helpers, and types
```

Important storefront routes:

| Route                   | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `/`                     | Home page                                                |
| `/shop`                 | Product listing and featured product surfaces            |
| `/product/[slug]`       | Product detail page                                      |
| `/checkout`             | Checkout flow                                            |
| `/checkout/success`     | Successful order page                                    |
| `/checkout/failed`      | Failed checkout page                                     |
| `/account`              | Customer profile, shipping address, password, and orders |
| `/orders/[orderId]`     | Order detail page                                        |
| `/auth/signin`          | Customer sign-in                                         |
| `/auth/signup`          | Customer registration                                    |
| `/auth/forgot-password` | Password reset request                                   |
| `/blog`                 | Blog listing                                             |
| `/blog/[slug]`          | Blog detail page                                         |
| `/concern`              | Concern listing                                          |
| `/concern/[slug]`       | Concern detail page                                      |
| `/about`                | About BYOU                                               |
| `/lab`                  | Lab and formulation content                              |
| `/contact`              | Contact form, contact methods, FAQ, and testimonials     |

## Development Notes

- Keep API contracts in `services/*/type.ts` aligned with backend payloads.
- Use `lib/axios.ts` for API calls so browser and server base URLs stay consistent.
- Prefer existing components and page patterns before adding new abstractions.
- Keep cart and checkout payload changes aligned with `lib/cart`, `lib/checkout`, `lib/orders`, and `services/orders`.
- Resolve product images through `getR2ImageUrl` when working with backend image keys.
- Avoid committing generated build artifacts such as `.next` and `tsconfig.tsbuildinfo`.

## Verification

Before opening a pull request or handing off a change, run:

```bash
yarn lint
yarn build
```

For TypeScript-only verification during local development:

```bash
./node_modules/.bin/tsc --noEmit
```

## License

This project is private.
