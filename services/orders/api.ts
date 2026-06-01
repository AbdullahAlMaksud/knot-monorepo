import apiClient from "@/lib/axios";
import type { Order } from "@/lib/orders/types";
import type { OrderPayloadType } from "./type";

interface OrderResponse {
  data: Order;
  message: string;
}

interface CreateOrderResponse {
  data?: Order;
  message?: string;
}

interface OrdersListResponse {
  data: Order[];
  message: string;
}

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<OrdersListResponse>("/orders");
  return response.data.data;
};

export const getOrdersByCustomerId = async (id: string): Promise<Order[]> => {
  const response = await apiClient.get<OrdersListResponse>(
    `/orders/customer/${id}`,
  );
  return response.data.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await apiClient.get<OrderResponse>(`/orders/${id}`);
  return response.data.data;
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
