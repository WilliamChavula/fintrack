import { format } from "date-fns";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import ChartTooltip from "./chart-tooltip";

interface LineVariantProps {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
}

const LineVariant = ({ data }: LineVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(val) => format(val, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line
          dataKey={"income"}
          strokeWidth={2}
          stroke="#3b82f6"
          className="drop-shadow-sm"
        />
        <Line
          dataKey={"expense"}
          strokeWidth={2}
          stroke="#f43f5e"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineVariant;
