"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrdersByCustomerId, getOrderById } from "./api";
import { ordersQueryKeys } from "./querykey";

export const useGetAllOrders = () =>
  useQuery({
    queryKey: ordersQueryKeys.all,
    queryFn: getAllOrders,
  });

export const useGetOrdersByCustomerId = (id: string) =>
  useQuery({
    queryKey: ordersQueryKeys.byCustomer(id),
    queryFn: () => getOrdersByCustomerId(id),
    enabled: !!id,
  });

export const useGetOrderById = (id: string) =>
  useQuery({
    queryKey: ordersQueryKeys.detail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
