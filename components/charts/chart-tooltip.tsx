import { format } from "date-fns";
import { TooltipProps } from "recharts";
import { Separator } from "../ui/separator";
import { formatCurrency } from "@/lib/utils";

const ChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload) {
    return null;
  }

  const date = payload[0].payload.date;
  const income = payload[0].value as number;
  const expense = payload[1].value as number;

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted text-muted-foreground px-3 py-2 text-xs">
        {format(date, "MMM dd, yyyy")}
        <Separator />
        <div className="space-y-1 px-3 py-2">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center justify-between gap-1.5">
              <div className="size-1.5 rounded-full bg-blue-500" />
              <p className="text-muted-foreground text-xs">Income</p>
            </div>
            <p className="text-right text-xs font-medium">
              {formatCurrency(income)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center justify-between gap-1.5">
              <div className="size-1.5 rounded-full bg-rose-500" />
              <p className="text-muted-foreground text-xs">Expenses</p>
            </div>
            <p className="text-right text-xs font-medium">
              {formatCurrency(expense)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTooltip;
