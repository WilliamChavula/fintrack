import { TooltipProps } from "recharts";
import { Separator } from "../ui/separator";
import { convertMilliUnitsToAmount, formatCurrency } from "@/lib/utils";

const CategoryTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload) {
    return null;
  }

  const name = payload[0].payload.name;
  const value = convertMilliUnitsToAmount(payload[0].value as number);

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted text-muted-foreground px-3 py-2 text-xs">
        {name}
        <Separator />
        <div className="space-y-1 px-3 py-2">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center justify-between gap-1.5">
              <div className="size-1.5 rounded-full bg-rose-500" />
              <p className="text-muted-foreground text-xs">Expenses</p>
            </div>
            <p className="text-right text-xs font-medium">
              {formatCurrency(value)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTooltip;
