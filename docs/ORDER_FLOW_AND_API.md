# Order Flow & Next.js API Reference

This document describes how orders work in the Byou app (guest vs logged-in), the checkout flow, and what each Next.js API route is used for.

---

## 1. Order flow overview

```
Shop → Add to cart → Checkout (shipping + payment) → POST /api/orders → Success or Failed page
                                                                  ↓
                                            Logged-in: Order History (GET /api/orders?mine=1)
                                            Any user:  Order details via link (GET /api/orders/[orderId])
```

- **Cart** is stored in React state and persisted in **localStorage** via `CartContext`. It is not tied to auth.
- **Checkout** does not require sign-in. Both **guest** and **logged-in** users can place orders.
- After placing an order, the cart is cleared and the user is redirected to a success or failed page.
- Order details can be viewed by **anyone who has the order ID** (e.g. link from email or order confirmation).

---

## 2. Modes: Guest vs logged-in

| Aspect | Guest | Logged-in |
|--------|--------|-----------|
| **Placing an order** | Yes. `POST /api/orders` does not require auth. | Yes. Same endpoint; `userId` is stored when session exists. |
| **Order document** | `userId` is `undefined`. | `userId` is set to `session.user.id`. |
| **Listing “my orders”** | No. `GET /api/orders?mine=1` returns 401 if not signed in. | Yes. Account → Order History uses this. |
| **Viewing one order** | Yes, if they have the order link (e.g. `/orders/ORD_xxx`). `GET /api/orders/[orderId]` does not require auth. | Same; can also reach it from Order History. |

So:

- **Create order**: works in both modes; only difference is whether `userId` is stored.
- **Order history**: logged-in only, via `?mine=1`.
- **Single order view**: by order ID only (no auth); supports guest “track my order” via link.

---

## 3. Checkout flow (step by step)

1. **Cart**  
   User adds items from the shop. Cart lives in `CartContext` and localStorage.

2. **Checkout page** (`/checkout`)  
   - Form: shipping (name, email, phone, address) and payment (method + transaction ID).
   - Payment methods: **Bank Transfer**, **Bkash**, **Nagad**.  
   - All methods require a **Transaction ID** (user-entered).

3. **Submit**  
   - Client sends `POST /api/orders` with:
     - `shipping`: address and contact fields
     - `payment`: `{ method, transactionId }`
     - `items`: snapshot from cart `{ name, image, price, quantity }`
   - Server creates an order in MongoDB (with optional `userId` from session), returns `{ orderId }`.

4. **Response handling**  
   - **Success (`res.ok`)**: cart is cleared, redirect to `/checkout/success`.  
   - **Failure (non-ok or throw)**: redirect to `/checkout/failed`.

5. **Success / Failed pages**  
   - Success: “Order confirmed” message and link to continue shopping.  
   - Failed: “Order wasn’t completed” and link to try again (e.g. back to shop).

---

## 4. Next.js API routes and their purpose

### 4.1 Orders

| Method | Route | Purpose | Auth |
|--------|--------|--------|------|
| **POST** | `/api/orders` | Create a new order. Body: `{ shipping, payment, items }`. Returns `{ orderId }`. Totals (subtotal, shipping fee, total) are computed on the server. | Optional. If session exists, `userId` is stored on the order. |
| **GET** | `/api/orders?mine=1` | List orders for the **current user**. Used by Account → Order History. | Required. Returns 401 if not signed in. |
| **GET** | `/api/orders/[orderId]` | Fetch a **single order** by ID. Used by the order detail page (e.g. `/orders/[orderId]`). | Not required. Anyone with the order ID can view (e.g. guest order tracking). |

- **POST /api/orders**  
  - Validates `shipping`, `payment`, and `items` (array non-empty).  
  - Computes subtotal from items, adds fixed shipping fee (`SHIPPING_FEE`), builds `OrderDocument` and inserts into MongoDB `orders` collection.  
  - Order ID is generated with `generateOrderId()` (e.g. `ORD_xxx`).

- **GET /api/orders?mine=1**  
  - Requires session.  
  - Queries `orders` where `userId` equals current user, sorted by `createdAt` descending.  
  - Returns serialized list (orderId, items, shipping, payment, totals, status, date).

- **GET /api/orders/[orderId]**  
  - Loads one order by `orderId`.  
  - Returns 404 if not found.  
  - Used for order detail/tracking page; no auth so guests can open the link.

### 4.2 Auth

| Method | Route | Purpose |
|--------|--------|--------|
| **GET, POST, PATCH, PUT, DELETE** | `/api/auth/[...all]` | **better-auth** catch-all handler for authentication: sign-in, sign-up, sign-out, session, password reset, etc. Configured in `lib/auth.ts` with MongoDB adapter and base path `/api/auth`. |

All auth requests (e.g. `/api/auth/signin`, `/api/auth/session`) are handled by this single route.

---

## 5. Order data shape (reference)

- **Order status**: `pending` | `paid` | `shipped` | `delivered`  
- **Payment method**: `bank-transfer` | `bkash` | `nagad` (and optional transaction ID).  
- **Totals**: `subtotal`, `shipping` (fixed fee), `total`.  
- **Order document** (MongoDB): `orderId`, `userId?`, `items`, `shipping`, `payment`, `totals`, `status`, `createdAt`, `updatedAt`.  
- Types and constants (e.g. `SHIPPING_FEE`, `generateOrderId`) live in `lib/orders/types.ts`.

---

## 6. Where each API is used in the app

| API | Used in |
|-----|--------|
| `POST /api/orders` | `app/checkout/page.tsx` — on “Confirm order” submit. |
| `GET /api/orders?mine=1` | `components/account/OrderHistorySection.tsx` — load list of user’s orders. |
| `GET /api/orders/[orderId]` | `app/orders/[orderId]/page.tsx` — load single order for detail/tracking. |
| ` /api/auth/*` | Auth forms and layout (e.g. sign-in, sign-up, session checks). |

This should give a clear picture of how the order flow works in different modes and what each Next.js API is used for.
