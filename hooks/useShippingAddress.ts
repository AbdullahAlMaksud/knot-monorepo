import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

export type ShippingAddress = {
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export function useShippingAddress(userId: string) {
  return useQuery({
    queryKey: queryKeys.shippingAddress.byUser(userId),
    queryFn: () => apiFetch<ShippingAddress>(`/shipping-address/${userId}`),
    enabled: !!userId,
    select: (res) => res.data,
  });
}

export function useUpdateShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      address,
    }: {
      userId: string;
      address: ShippingAddress;
    }) =>
      apiFetch(`/shipping-address/update`, {
        method: "PUT",
        body: JSON.stringify({ userId, address }),
      }),
    onSuccess: ({ message }, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.shippingAddress.byUser(userId),
      });
      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}