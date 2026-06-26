"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateShippingAddress } from "@/screens/shipping-address/services/api";
import { shippingAddressQueryKeys } from "@/screens/shipping-address/services/query-key";
import type { ShippingAddress } from "@/screens/shipping-address/services/type";

export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      address,
    }: {
      userId: string;
      address: ShippingAddress;
    }) => updateShippingAddress(userId, address),
    onSuccess: ({ message }, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: shippingAddressQueryKeys.byUser(userId),
      });
      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
