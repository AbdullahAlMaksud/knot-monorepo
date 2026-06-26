export const shippingAddressQueryKeys = {
  byUser: (userId: string) => ["shipping-address", userId] as const,
};
