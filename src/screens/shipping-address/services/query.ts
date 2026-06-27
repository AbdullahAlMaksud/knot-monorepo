"use client";

import { useQuery } from "@tanstack/react-query";
import { getShippingAddress } from "@/screens/shipping-address/services/api";
import { shippingAddressQueryKeys } from "@/screens/shipping-address/services/query-key";

export const useShippingAddress = (userId: string) =>
  useQuery({
    queryKey: shippingAddressQueryKeys.byUser(userId),
    queryFn: () => getShippingAddress(userId),
    enabled: !!userId,
  });
