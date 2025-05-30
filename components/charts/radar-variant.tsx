import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
  data?: {
    name: string;
    value: number;
  }[];
}

const RadarVariant = ({ data }: RadarChartProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadarChart cx={"50%"} cy={"50%"} outerRadius={"60%"} data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "0.75rem" }} dataKey={"name"} />
        <PolarRadiusAxis style={{ fontSize: "0.75rem" }} />
        <Radar
          dataKey={"value"}
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarVariant;
