import { useSearchParams } from "next/navigation";
import { trpc } from "@/providers/tanstack-provider";
import { convertMilliUnitsToAmount } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const { data, isLoading, status, error } = trpc.getSummary.useQuery({
    from,
    to,
    accountId,
  });

  if (status === "error") {
    console.error("Error fetching transactions summary:", error);
    throw new Error("Error fetching transactions summary");
  }

  return {
    data: {
      ...data?.summary,
      incomeAmount: convertMilliUnitsToAmount(
        data?.summary.currentPeriodFinancialData?.income ?? 0,
      ),
      expenseAmount: convertMilliUnitsToAmount(
        data?.summary.currentPeriodFinancialData?.expense ?? 0,
      ),
      remainingAmount: convertMilliUnitsToAmount(
        data?.summary.currentPeriodFinancialData?.remaining ?? 0,
      ),
      categories: data?.summary.TxnsByCategory.map((cat) => ({
        ...cat,
        amount: convertMilliUnitsToAmount(cat.value),
      })),
      days: data?.summary.days.map((day) => ({
        ...day,
        income: convertMilliUnitsToAmount(day.income),
        expense: convertMilliUnitsToAmount(day.expense),
      })),
    },
    isLoading,
  };
};
