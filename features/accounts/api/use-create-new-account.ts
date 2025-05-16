import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useCreateNewAccount = () => {
  const getAccountsQuery = trpc.getAccounts.useQuery();

  const { mutate: createAccount, isPending: isLoading } =
    trpc.addAccount.useMutation({
      onSuccess: () => {
        toast.success("Account created successfully");
        getAccountsQuery.refetch();
      },
      onError: () => {
        toast.error("Failed to create account");
      },
    });

  return { createAccount, isLoading };
};
