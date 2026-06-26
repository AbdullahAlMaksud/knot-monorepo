export const ordersQueryKeys = {
  all: ["orders"] as const,
  detail: (id: string) => ["orders", id] as const,
  byCustomer: (customerId: string) =>
    ["orders", "customer", customerId] as const,
};
