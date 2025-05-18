import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useBulkDeleteAccounts = () => {
  const getAccountsQuery = trpc.getAccounts.useQuery();

  const { mutate: deleteAccounts, isPending } =
    trpc.bulkDeleteAccount.useMutation({
      onSuccess: () => {
        toast.success("Accounts successfully deleted");
        // Refetch the accounts after deletion
        getAccountsQuery.refetch();

        // TODO: Invalidate summary
      },
      onError: () => {
        toast.error("Failed to delete accounts");
      },
    });

  return { deleteAccounts, isPending };
};
