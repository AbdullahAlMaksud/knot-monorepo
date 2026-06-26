"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { createOrder, updateOrderStatus } from "@/screens/orders/services/api";
import { ordersQueryKeys } from "@/screens/orders/services/query-key";
import type { OrderPayloadType, CreateOrderOptions } from "@/screens/orders/services/type";

export const useCreateOrder = (options?: CreateOrderOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearCart } = useCart();

  return useMutation({
    mutationFn: (orderData: OrderPayloadType) => createOrder(orderData),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.all });
      toast.success(message);
      if (options?.clearCartOnSuccess ?? true) {
        clearCart();
      }
      options?.onSuccess?.();
      router.push("/checkout/success");
    },
    onError: (error: Error & { field?: string }) => {
      toast.error(error.message);
      options?.onError?.(error);
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: ({ message }, { id }) => {
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.detail(id) });
      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
