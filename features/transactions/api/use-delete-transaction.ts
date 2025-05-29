import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useDeleteTransaction = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteTransaction, isPending } =
    trpc.deleteTransaction.useMutation({
      onSuccess: () => {
        toast.success("Transaction deleted successfully");
        utils.getTransactions.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete transaction");
      },
    });

  return { deleteTransaction, isPending };
};
