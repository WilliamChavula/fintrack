import { FileSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AreaVariant from "./area-variant";

interface ChartProps {
  data?: {
    date: string;
    income: number;
    expense: number;
  }[];
}

const Chart = ({ data = [] }: ChartProps) => {
  return (
    <Card className="border-none drop-shadow-xs">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-lg">Transactions</CardTitle>
        {/* Add Select */}
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
          <AreaVariant data={data} />
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
