"use client";

import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import DataCard, { LoadingSkeleton } from "./data-card";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";

function DataGrid() {
  const { data, isLoading } = useGetSummary();
  const params = useSearchParams();

  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;

  const rangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="mb-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="mb-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <DataCard
        icon={PiggyBank}
        title="Remaining"
        rangeLabel={rangeLabel}
        percentageChange={data.remainingChange}
        value={data.remainingAmount}
        variant="default"
      />
      <DataCard
        icon={TrendingUp}
        title="Income"
        rangeLabel={rangeLabel}
        percentageChange={data.incomeChange}
        value={data.incomeAmount}
        variant="success"
      />
      <DataCard
        icon={TrendingDown}
        title="Expenses"
        rangeLabel={rangeLabel}
        percentageChange={data.expenseChange}
        value={data.expenseAmount}
        variant="danger"
      />
    </div>
  );
}

export default DataGrid;
