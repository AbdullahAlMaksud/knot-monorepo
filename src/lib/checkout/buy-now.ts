import type { CartItem } from "@/lib/cart/types";

const BUY_NOW_STORAGE_KEY = "byou-buy-now-item";

export function getStoredBuyNowItem(): CartItem | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(BUY_NOW_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CartItem;
    if (
      parsed &&
      typeof parsed.id !== "undefined" &&
      typeof parsed.name === "string" &&
      typeof parsed.price === "number" &&
      typeof parsed.quantity === "number" &&
      typeof parsed.image === "string"
    ) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export function setStoredBuyNowItem(item: CartItem): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(item));
  } catch {
    // ignore
  }
}

export function clearStoredBuyNowItem(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(BUY_NOW_STORAGE_KEY);
  } catch {
    // ignore
  }
}
