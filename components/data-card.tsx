import { cva, VariantProps } from "class-variance-authority";

import { LucideIcon } from "lucide-react";

import { CountUp } from "./count-up";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const boxVariants = cva("rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-amber-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-emerald-500",
      danger: "text-rose-500",
      warning: "text-amber-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariants>;
type IconVariants = VariantProps<typeof iconVariants>;

interface DataCardProps extends BoxVariants, IconVariants {
  title: string;
  percentageChange?: number;
  icon: LucideIcon;
  rangeLabel: string;
  value?: number;
}

const DataCard = (props: DataCardProps) => {
  const {
    title,
    percentageChange = 0,
    rangeLabel,
    value = 0,
    variant,
    icon: Icon,
  } = props;
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {rangeLabel}
          </CardDescription>
        </div>
        <div className={cn("shrink-0", boxVariants({ variant }))}>
          <Icon className={cn(iconVariants({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="mb-2 line-clamp-1 text-lg font-bold break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h2>
        <p
          className={cn(
            "text-muted-foreground line-clamp-1 text-sm",
            percentageChange > 0 && "text-emerald-500",
            percentageChange < 0 && "text-rose-500",
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period
        </p>
      </CardContent>
    </Card>
  );
};

export default DataCard;

export const LoadingSkeleton = function () {
  return (
    <Card className="h-[192px] border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-10 w-24 shrink-0" />
        <Skeleton className="h-4 w-40 shrink-0" />
      </CardContent>
    </Card>
  );
};
