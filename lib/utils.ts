import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyValue(amount: number): string {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  return amount.toFixed(fractionDigits);
}
