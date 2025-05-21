import { useSearchParams } from "next/navigation";
import { trpc } from "@/providers/tanstack-provider";

export const useGetTransactions = () => {
  const params = useSearchParams();

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const { data, isLoading, status, error } = trpc.getTransactions.useQuery({
    from,
    to,
    accountId,
  });

  if (status === "error") {
    console.error("Error fetching transactions:", error);
    throw new Error("Error fetching transactions");
  }

  return { data, isLoading };
};
