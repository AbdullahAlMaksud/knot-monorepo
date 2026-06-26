import apiClient from "@/lib/axios";
import type { ShippingAddress } from "@/screens/shipping-address/services/type";

interface ShippingAddressResponse {
  data: ShippingAddress;
  message: string;
}

export const getShippingAddress = async (
  userId: string,
): Promise<ShippingAddress> => {
  const response = await apiClient.get<ShippingAddressResponse>(
    `/shipping-address/${userId}`,
  );
  return response.data.data;
};

export const updateShippingAddress = async (
  userId: string,
  address: ShippingAddress,
): Promise<{ message: string }> => {
  const response = await apiClient.put<{ message: string }>(
    "/shipping-address/update",
    {
      userId,
      address,
    },
  );
  return response.data;
};
