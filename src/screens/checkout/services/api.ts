import apiClient from "@/lib/axios";

export interface Currency {
  _id: string;
  name: string;
  code: string;
  symbol: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface ShippingCharge {
  _id: string;
  currency: {
    _id: string;
    name: string;
    code: string;
    symbol: string;
    isActive: boolean;
    isDefault: boolean;
  };
  type: "FLAT" | "PERCENTAGE" | "INSIDE_DHAKA" | "OUTSIDE_DHAKA" | string;
  amount: number;
}

export const getAllCurrencies = async (): Promise<Currency[]> => {
  const response = await apiClient.get<{ data: Currency[] }>("/currencies");
  return response.data.data;
};

export const getAllShippingCharges = async (): Promise<ShippingCharge[]> => {
  const response = await apiClient.get<{ data: ShippingCharge[] }>(
    "/shipping-charges",
  );
  return response.data.data;
};

export interface ValidateCouponParams {
  code: string;
  orderAmount: number;
  userId?: string;
  currencyId?: string;
}

export interface ValidateCouponResponse {
  success: boolean;
  message: string;
  data: {
    couponId: string;
    code: string;
    discountType: string;
    discountValue: number;
    maxDiscountAmount?: number;
    discountAmount: number;
  };
}

export const validateCoupon = async (
  params: ValidateCouponParams,
): Promise<ValidateCouponResponse> => {
  const response = await apiClient.post<ValidateCouponResponse>(
    "/coupons/validate",
    params,
  );
  return response.data;
};

export interface Coupon {
  _id: string;
  code: string;
  discountType: string;
  percentageDiscountValue?: number;
  couponAmountsCurrencies?: {
    currency: string;
    minOrderAmount?: number;
    maxDiscountAmount: number;
    flatDiscountValue?: number;
  }[];
  usageLimit?: number;
  perUserLimit?: number;
  isActive: boolean;
  isScratchApplicable: boolean;
  expiresAt?: string | null;
}

export const getActiveCoupons = async (): Promise<Coupon[]> => {
  const response = await apiClient.get<{ data: Coupon[] }>("/coupons/active");
  return response.data.data;
};
