import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useBulkDeleteTransactions = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteTransactions, isPending } =
    trpc.bulkDeleteTransactions.useMutation({
      onSuccess: () => {
        toast.success("Transactions successfully deleted");
        // Refetch the accounts after deletion
        utils.getAccounts.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete transactions");
      },
    });

  return { deleteTransactions, isPending };
};
