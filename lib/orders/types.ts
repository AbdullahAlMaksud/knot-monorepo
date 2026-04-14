export interface OrderItemSnapshot {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderShipping {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderPayment {
  method: string;
  transactionId: string;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

export interface OrderDocument {
  orderId: string;
  userId?: string;
  items: OrderItemSnapshot[];
  shipping: OrderShipping;
  payment: OrderPayment;
  totals: OrderTotals;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const SHIPPING_FEE = 6;
export const DISCOUNT_AMOUNT = 8;

export function generateOrderId(): string {
  const bytes = new Uint8Array(18);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  }
  const base64 = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `ORD_${base64}`;
}

export type CheckoutFormData = {
  name: string;
  email: string;
  phone: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  transactionId: string;
};

export type Order = {
  _id: string;
  customerId: string;
  shipping: {
    name: string;
    email: string;
    phone: string;
    apartment?: string
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  payment: {
    method: string;
    transactionId: string;
  }
  items: { productId: string; name: string; image: string; unitPrice: number; subtotal: number; quantity: number }[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  status: "Paid" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
};