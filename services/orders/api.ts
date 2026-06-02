import apiClient from "@/lib/axios";
import type { Order } from "@/lib/orders/types";
import type { OrderPayloadType } from "./type";

interface OrderResponse {
  data: BackendOrder;
  message: string;
}

interface CreateOrderResponse {
  data?: Order;
  message?: string;
}

interface OrdersListResponse {
  data: BackendOrder[];
  message: string;
}

type BackendSizeVariant = {
  productId?: string;
  productName?: string;
  variants?: {
    variantId?: string;
    quantity?: number;
    price?: number;
    size?: string;
    discountAmount?: number;
    finalPrice?: number;
  }[];
};

type BackendOrder = Omit<
  Partial<Order>,
  "items" | "shipping" | "discountAmount"
> & {
  _id: string;
  customerId: string;
  items?: Order["items"];
  sizeVariants?: BackendSizeVariant[];
  shipping?: Partial<Order["shipping"]>;
  shipment?: Partial<Order["shipping"]> & {
    district?: string;
  };
  discountAmount?: number;
  discountedAmount?: number;
};

const normalizeOrder = (order: BackendOrder): Order => {
  const shipment = order.shipment ?? {};
  const shipping = order.shipping ?? {};
  const sourceShipping = order.shipment ? shipment : shipping;

  const items =
    order.items ??
    order.sizeVariants?.flatMap((product) =>
      (product.variants ?? []).map((variant) => {
        const unitPrice = variant.finalPrice ?? variant.price ?? 0;

        return {
          productId: product.productId ?? variant.variantId ?? "",
          name: [
            product.productName ?? "Unknown Product",
            variant.size ? `(${variant.size})` : "",
          ]
            .filter(Boolean)
            .join(" "),
          image: "",
          unitPrice,
          subtotal: unitPrice * (variant.quantity ?? 1),
          quantity: variant.quantity ?? 1,
        };
      }),
    ) ??
    [];

  return {
    _id: order._id,
    customerId: order.customerId,
    shipping: {
      name: sourceShipping.name ?? "",
      email: sourceShipping.email ?? "",
      phone: sourceShipping.phone ?? "",
      apartment: sourceShipping.apartment,
      city: sourceShipping.city ?? "",
      state: shipment.district ?? shipping.state ?? "",
      postalCode: sourceShipping.postalCode ?? "",
      country: sourceShipping.country ?? "",
      extraNotes: shipping.extraNotes,
      deliveryArea: shipping.deliveryArea,
      estimatedDelivery: shipping.estimatedDelivery,
    },
    payment: {
      method: order.payment?.method ?? "",
      status: order.payment?.status,
      transactionId: order.payment?.transactionId,
    },
    items,
    totalAmount: order.totalAmount ?? 0,
    discountAmount: order.discountAmount ?? order.discountedAmount ?? 0,
    shippingFee: order.shippingFee ?? 0,
    finalAmount: order.finalAmount ?? 0,
    status: order.status ?? "Unknown",
    createdAt: order.createdAt ?? "",
    updatedAt: order.updatedAt ?? "",
  };
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<OrdersListResponse>("/orders");
  return response.data.data.map(normalizeOrder);
};

export const getOrdersByCustomerId = async (id: string): Promise<Order[]> => {
  const response = await apiClient.get<OrdersListResponse>(
    `/orders/customer/${id}`,
  );
  return response.data.data.map(normalizeOrder);
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await apiClient.get<OrderResponse>(`/orders/${id}`);
  return normalizeOrder(response.data.data);
};

export const createOrder = async (
  orderData: OrderPayloadType,
): Promise<{ message: string }> => {
  const response = await apiClient.post<CreateOrderResponse>(
    "/orders",
    orderData,
  );
  return {
    message: response.data.message ?? "Order placed successfully!",
  };
};

export const updateOrderStatus = async (
  id: string,
  status: string,
): Promise<{ message: string }> => {
  const response = await apiClient.patch<{ message: string }>(
    `/orders/${id}/status`,
    { status },
  );
  return response.data;
};
