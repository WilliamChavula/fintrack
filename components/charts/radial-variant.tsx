import {
  RadialBar,
  Legend,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import { convertMilliUnitsToAmount, formatCurrency } from "@/lib/utils";

interface PieChartProps {
  data?: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];

const RadialVariant = ({ data }: PieChartProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadialBarChart
        cx={"50%"}
        cy={"30%"}
        barSize={10}
        innerRadius={"90%"}
        outerRadius={"40%"}
        data={data?.map((d, i) => ({
          ...d,
          value: convertMilliUnitsToAmount(d.value),
          fill: COLORS[i % COLORS.length],
        }))}
      >
        <RadialBar
          label={{
            position: "insideStart",
            fill: "#fff",
            fontSize: "0.75rem",
          }}
          background
          dataKey={"value"}
        />
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
                        {formatCurrency(item.payload?.value)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialVariant;
