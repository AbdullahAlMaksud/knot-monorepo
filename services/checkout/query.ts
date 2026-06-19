import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCurrencies, getAllShippingCharges, validateCoupon } from "./api";

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

export const useValidateCoupon = () =>
  useMutation({
    mutationFn: validateCoupon,
  });
