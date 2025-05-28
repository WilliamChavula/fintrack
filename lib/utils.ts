import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
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

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const fallbackTo = new Date();
  const fallbackFrom = subDays(fallbackTo, 10);

  if (!period?.from) {
    return `${format(fallbackFrom, "LLL dd, y")} - ${format(fallbackTo, "LLL dd, y")}`;
  }

  if (period?.to) {
    return `${format(period.from, "LLL dd, y")} - ${format(period.to, "LLL dd, y")}`;
  }

  return format(period.from, "LLL dd, y");
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  return options.addPrefix && value > 0 ? `+${result}` : result;
}
