import { trpc } from "@/providers/tanstack-provider";
import { isValidUuid } from "../../validators/get-resource-validator";

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

  return { data, isLoading };
};
