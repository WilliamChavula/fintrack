import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, isSameDay } from "date-fns";
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

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return current === previous ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

type Args = {
  activeDays: {
    date: Date;
    income: number;
    expense: number;
  }[];
  startDate: Date;
  endDate: Date;
};

export function fillMissingDays({ activeDays, startDate, endDate }: Args) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const txnsInInterval = allDays.map((day) => {
    const sameDay = activeDays.find((d) => isSameDay(d.date, day));

    return sameDay ? sameDay : { date: day, income: 0, expense: 0 };
  });

  return txnsInInterval;
}
