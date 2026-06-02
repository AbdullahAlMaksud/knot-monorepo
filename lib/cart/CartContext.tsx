"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { getStoredCart, setStoredCart, type CartItem } from "./types";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (
    id: number | string,
    quantity: number,
    variantId?: string,
  ) => void;
  removeItem: (id: number | string, variantId?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const isSameCartItem = (
  item: Pick<CartItem, "id" | "variantId">,
  id: number | string,
  variantId?: string,
) => String(item.id) === String(id) && item.variantId === variantId;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(getStoredCart());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setStoredCart(items);
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = item.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) =>
          isSameCartItem(i, item.id, item.variantId),
        );
        if (existing) {
          return prev.map((i) =>
            isSameCartItem(i, item.id, item.variantId)
              ? { ...i, quantity: i.quantity + qty }
              : i,
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (id: number | string, quantity: number, variantId?: string) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) =>
          isSameCartItem(i, id, variantId) ? { ...i, quantity } : i,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((id: number | string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !isSameCartItem(i, id, variantId)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );
  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      total,
      itemCount,
    }),
    [items, addItem, updateQuantity, removeItem, clearCart, total, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
