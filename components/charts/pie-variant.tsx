import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatPercentage } from "@/lib/utils";
import CategoryTooltip from "./category-tooltip";

interface PieChartProps {
  data?: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];

const PieVariant = ({ data }: PieChartProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => {
            return (
              <ul className="flex flex-col gap-y-2">
                {payload?.map((item, index) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-muted-foreground text-xs">
                        {item.value}
                      </span>
                      <span className="text-muted-foreground text-xs font-medium">
                        {/* @ts-expect-error percent exists */}
                        {formatPercentage(item.payload?.percent * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey={"value"}
          labelLine={false}
        >
          {data?.map((_, key) => (
            <Cell key={`cell-${key}`} fill={COLORS[key % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;
