import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useUpdateTransaction = () => {
  const utils = trpc.useUtils();

  const { mutate: updateTransaction, isPending: isLoading } =
    trpc.updateTransaction.useMutation({
      onSuccess: () => {
        toast.success("Transaction updated successfully");
        utils.getTransaction.invalidate();
        utils.getTransactions.invalidate();

        // TODO: invalidate summary query
      },
      onError: () => {
        toast.error("Failed to update transaction");
      },
    });

  return { updateTransaction, isLoading };
};
