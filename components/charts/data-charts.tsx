"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import Chart from "./chart";
import SpendingPieChart from "./spending-piechart";
import { ChartSkeleton } from "./loading";

const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartSkeleton />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <ChartSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPieChart data={data?.categories} />
      </div>
    </div>
  );
};

export default DataCharts;
