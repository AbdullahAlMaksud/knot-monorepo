"use client";

import { useQuery } from "@tanstack/react-query";
import { getShippingAddress } from "./api";
import { shippingAddressQueryKeys } from "./querykey";

export const useShippingAddress = (userId: string) =>
  useQuery({
    queryKey: shippingAddressQueryKeys.byUser(userId),
    queryFn: () => getShippingAddress(userId),
    enabled: !!userId,
  });
