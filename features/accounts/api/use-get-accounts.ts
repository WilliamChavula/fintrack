import { trpc } from "@/providers/tanstack-provider";

export const useGetAccounts = () => {
  const res = trpc.getAccounts.useQuery();

  if (res.status === "error") {
    console.error("Error fetching accounts:", res.error);
    throw new Error("Error fetching accounts");
  }

  return res.data;
};
