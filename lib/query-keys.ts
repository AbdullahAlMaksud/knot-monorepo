export const queryKeys = {
  orders: {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", id] as const,
  },
  shippingAddress: {
    byUser: (userId: string) => ["shipping-address", userId] as const,
  },
  customers: {
    registered: (status: string) => ["customers", "registered", status] as const,
    guests: (status: string) => ["customers", "guests", status] as const,
  },
} as const;