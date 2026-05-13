export type { Order, CheckoutFormData } from "@/lib/orders/types";

export type OrderPayloadType = {
  customerId?: string;
  items: {
    variantId: string;
    quantity: number;
  }[];
  shipment: {
    name: string;
    email: string;
    phone: string;
    apartment?: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };
  payment?: {
    method: string;
  };
  note?: string;
};

export type CreateOrderOptions = {
  clearCartOnSuccess?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error & { field?: string }) => void;
};
