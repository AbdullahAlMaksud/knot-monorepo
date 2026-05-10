# API Functions Reference

Base URL: `NEXT_PUBLIC_API_URL` + `/api/v1`  
HTTP client: axios (`lib/axios.ts`)

---

## Products (`services/products/api.ts`)

| Function                 | Method | Endpoint              | Description                                                |
| ------------------------ | ------ | --------------------- | ---------------------------------------------------------- |
| `getPublishedProducts()` | GET    | `/products/published` | সব published product আনে                                   |
| `getProductBySlug(slug)` | GET    | `/products/published` | slug দিয়ে নির্দিষ্ট product খোঁজে (full list থেকে filter) |

---

## Blogs (`services/blogs/api.ts`)

| Function                                      | Method | Endpoint                      | Description                                                  |
| --------------------------------------------- | ------ | ----------------------------- | ------------------------------------------------------------ |
| `getPublishedBlogs(category?, search?, tag?)` | GET    | `/blogs?status=Published&...` | Published blog লিস্ট, optional category/search/tag filter সহ |

---

## Orders (`services/orders/api.ts`)

| Function                        | Method | Endpoint               | Description                        |
| ------------------------------- | ------ | ---------------------- | ---------------------------------- |
| `getAllOrders()`                | GET    | `/orders`              | সব অর্ডার আনে                      |
| `getOrdersByCustomerId(id)`     | GET    | `/orders/customer/:id` | নির্দিষ্ট customer-এর অর্ডার লিস্ট |
| `getOrderById(id)`              | GET    | `/orders/:id`          | একটি অর্ডারের ডিটেইলস              |
| `createOrder(orderData)`        | POST   | `/orders`              | নতুন অর্ডার তৈরি                   |
| `updateOrderStatus(id, status)` | PATCH  | `/orders/:id/status`   | অর্ডারের status আপডেট              |

### `createOrder` Payload

```json
{
  "customerId": "string (optional)",
  "items": [{ "variantId": "string", "quantity": number }],
  "shipment": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "apartment": "string (optional)",
    "city": "string",
    "district": "string (uppercase)",
    "postalCode": "string",
    "country": "string"
  },
  "payment": { "method": "CASH" },
  "note": "string (optional)"
}
```

---

## Shipping Address (`services/shipping-address/api.ts`)

| Function                                 | Method | Endpoint                    | Description                  |
| ---------------------------------------- | ------ | --------------------------- | ---------------------------- |
| `getShippingAddress(userId)`             | GET    | `/shipping-address/:userId` | User-এর shipping address আনে |
| `updateShippingAddress(userId, address)` | PUT    | `/shipping-address/update`  | Shipping address আপডেট করে   |

---

## Summary

| Service          | GET   | POST  | PUT   | PATCH | Total  |
| ---------------- | ----- | ----- | ----- | ----- | ------ |
| Products         | 2     | —     | —     | —     | 2      |
| Blogs            | 1     | —     | —     | —     | 1      |
| Orders           | 3     | 1     | —     | 1     | 5      |
| Shipping Address | 1     | —     | 1     | —     | 2      |
| **Total**        | **7** | **1** | **1** | **1** | **10** |
