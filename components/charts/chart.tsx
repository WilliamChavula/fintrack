import { AreaChart, BarChart3, FileSearch, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AreaVariant from "./area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";

interface ChartProps {
  data?: {
    date: string;
    income: number;
    expense: number;
  }[];
}

const Chart = ({ data = [] }: ChartProps) => {
  const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");

  const onTypeChange = (type: string) => {
    // TODO: Add paywall
    setChartType(type as "area" | "bar" | "line");
  };
  return (
    <Card className="border-none drop-shadow-xs">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-lg">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center gap-1">
                <AreaChart className="size-4 shrink-0" />
                <span className="line-clamp-1">Area Chart</span>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center gap-1">
                <LineChart className="size-4 shrink-0" />
                <span className="line-clamp-1">Line Chart</span>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center gap-1">
                <BarChart3 className="size-4 shrink-0" />
                <span className="line-clamp-1">Bar Chart</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-4">
            <FileSearch className="text-muted-foreground size-6" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
            {chartType === "line" && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
