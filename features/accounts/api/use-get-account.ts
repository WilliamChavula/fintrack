import { trpc } from "@/providers/tanstack-provider";
import { isValidUuid } from "../validators/get-account-validator";

export const useGetAccount = (id: string) => {
  const { data, isLoading, status, error } = trpc.getAccount.useQuery(
    { id },
    {
      enabled: isValidUuid(id),
    },
  );

  if (status === "error") {
    console.error("Error fetching account:", JSON.stringify(error));
    throw new Error(`Failed to fetch account with id ${id}`);
  }

  return { data, isLoading };
};
