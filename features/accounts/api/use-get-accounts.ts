import { trpc } from "@/providers/tanstack-provider";

export const useGetAccounts = () => {
  const { data, isLoading, status, error } = trpc.getAccounts.useQuery();

  if (status === "error") {
    console.error("Error fetching accounts:", error);
    throw new Error("Error fetching accounts");
  }

  return { data, isLoading };
};
