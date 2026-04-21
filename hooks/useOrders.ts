import type { DeliveryArea } from "@/lib/checkout/constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { Order } from "@/lib/orders/types";
import { useCart } from "@/lib/cart/CartContext";
import { useRouter } from "next/navigation";

// Queries
export function useGetAllOrders() {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => apiFetch<Order[]>("/orders"),
    select: (res) => res.data,
  });
}

export function useGetOrdersByCustomerId(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => apiFetch<Order[]>(`/orders/customer/${id}`),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useGetOrderById(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => apiFetch<Order>(`/orders/${id}`),
    enabled: !!id,
    select: (res) => res.data,
  });
}

//  Mutations
// export function useCreateOrder() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//     const { items: cartItems, clearCart } = useCart();

//   return useMutation({
//     mutationFn: (orderData) => apiFetch("/orders", {
//       method: "POST",
//       body:JSON.stringify(orderData)
//     }),
//     onSuccess: ({message}) => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
//       toast.success(message);
//       clearCart();
//       router.push("/checkout/success");
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     }
//   })
// }

export type OrderPayloadType = {
  customerId?: string;
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
    deliveryArea: DeliveryArea;
    estimatedDelivery: string;
  };
  payment: {
    method: string;
    transactionId?: string;
  };
  items: {
    productId: string;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
};

type CreateOrderOptions = {
  clearCartOnSuccess?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error & { field?: string }) => void;
};

export function useCreateOrder(options?: CreateOrderOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearCart } = useCart();

  return useMutation({
    mutationFn: (orderData: OrderPayloadType) =>
      apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      }),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success(message);
      if (options?.clearCartOnSuccess ?? true) {
        clearCart();
      }
      options?.onSuccess?.();
      router.push("/checkout/success");
    },
    onError: (error: Error & { field?: string }) => {
      toast.error(error.message);
      options?.onError?.(error); // ✅ checkout page এর setError call হবে
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiFetch(`/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: ({ message }, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
