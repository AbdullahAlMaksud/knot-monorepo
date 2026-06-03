import type { DeliveryArea } from "@/lib/checkout/constants";

export interface OrderItemSnapshot {
  productId?: string;
  name: string;
  image: string;
  price?: number;
  unitPrice?: number;
  quantity: number;
  subtotal?: number;
}

export interface OrderShipping {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  extraNotes?: string;
  deliveryArea?: DeliveryArea;
  estimatedDelivery?: string;
}

export interface OrderPayment {
  method: string;
  transactionId?: string;
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

export const DISCOUNT_AMOUNT = 0;

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
  extraNotes: string;
};

export type Order = {
  _id: string;
  customerId: string;
  shipping: {
    name: string;
    email: string;
    phone: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    extraNotes?: string;
    deliveryArea?: DeliveryArea;
    estimatedDelivery?: string;
  };
  payment: {
    method: string;
    status?: string;
    transactionId?: string;
  };
  items: {
    productId: string;
    name: string;
    image: string;
    unitPrice: number;
    subtotal: number;
    quantity: number;
  }[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
