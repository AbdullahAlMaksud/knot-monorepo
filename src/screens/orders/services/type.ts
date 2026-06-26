export type { Order, CheckoutFormData } from "@/lib/orders/types";

export type OrderPayloadType = {
  customerId?: string;
  orderedItems: {
    variantId: string;
    quantity: number;
  }[];
  currencyId: string;
  orderAmount: number;
  shipment: {
    name: string;
    email: string;
    phone: string;
    addressLine?: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };
  shippingChargeId: string;
  payment?: {
    method: string;
    transactionId?: string;
  };
  couponCode?: string;
  note?: string;
};

export type CreateOrderOptions = {
  clearCartOnSuccess?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error & { field?: string }) => void;
};
