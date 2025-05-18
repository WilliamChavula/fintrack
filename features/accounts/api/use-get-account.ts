import { trpc } from "@/providers/tanstack-provider";

export const useGetAccounts = (id: string) => {
  const { data, isLoading, status, error } = trpc.getAccount.useQuery({ id });

  if (status === "error") {
    console.error("Error fetching account:", error);
    throw new Error(`Failed to fetch account with id ${id}`);
  }

  return { data, isLoading };
};
