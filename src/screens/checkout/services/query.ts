import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCurrencies, getAllShippingCharges, validateCoupon, getActiveCoupons } from "@/screens/checkout/services/api";

export const useGetCurrencies = () =>
  useQuery({
    queryKey: ["currencies"],
    queryFn: getAllCurrencies,
  });

export const useGetShippingCharges = () =>
  useQuery({
    queryKey: ["shipping-charges"],
    queryFn: getAllShippingCharges,
  });

export const useGetActiveCoupons = () =>
  useQuery({
    queryKey: ["active-coupons"],
    queryFn: getActiveCoupons,
  });

export const useValidateCoupon = () =>
  useMutation({
    mutationFn: validateCoupon,
  });
