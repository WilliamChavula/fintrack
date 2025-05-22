import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMilliUnits(amount: number) {
  return Math.round(amount * 1000);
}
export function convertMilliUnitsToAmount(milliUnits: number) {
  return milliUnits / 1000;
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  }).format(value);
}
