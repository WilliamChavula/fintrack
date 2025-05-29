import { FileSearch, PieChart, Radar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PieVariant from "./pie-variant";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import RadarVariant from "./radar-variant";
import RadialVariant from "./radial-variant";

interface SpendingChartProps {
  data?: {
    name: string;
    value: number;
  }[];
}

const SpendingPieChart = ({ data = [] }: SpendingChartProps) => {
  const [chartType, setChartType] = useState<"pie" | "radar" | "radial">("pie");

  const onTypeChange = (type: string) => {
    // TODO: Add paywall
    setChartType(type as "pie" | "radar" | "radial");
  };
  return (
    <Card className="border-none drop-shadow-xs">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-lg">Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center gap-1">
                <PieChart className="size-4 shrink-0" />
                <span className="line-clamp-1">Pie Chart</span>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center gap-1">
                <Radar className="size-4 shrink-0" />
                <span className="line-clamp-1">Radar Chart</span>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center gap-1">
                <Target className="size-4 shrink-0" />
                <span className="line-clamp-1">Radial Chart</span>
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
            {chartType === "pie" && <PieVariant data={data} />}
            {chartType === "radar" && <RadarVariant data={data} />}
            {chartType === "radial" && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingPieChart;
