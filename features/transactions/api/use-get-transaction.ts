import { trpc } from "@/providers/tanstack-provider";
import { isValidUuid } from "../../validators/get-resource-validator";
import { convertMilliUnitsToAmount } from "@/lib/utils";

export const useGetTransaction = (id: string) => {
  const { data, isLoading, status, error } = trpc.getTransaction.useQuery(
    { id },
    {
      enabled: isValidUuid(id),
    },
  );

  if (status === "error") {
    console.error("Error fetching transaction:", JSON.stringify(error));
    throw new Error(`Failed to fetch transaction with id ${id}`);
  }

  return {
    data: {
      transaction: {
        ...data?.transaction,
        amount: convertMilliUnitsToAmount(data?.transaction.amount || 0),
      },
    },
    isLoading,
  };
};
