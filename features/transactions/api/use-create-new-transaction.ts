import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useCreateNewTransaction = () => {
  const utils = trpc.useUtils();

  const { mutate: addTransaction, isPending: isLoading } =
    trpc.addTransaction.useMutation({
      onSuccess: () => {
        toast.success("Transaction created successfully");
        utils.getTransactions.invalidate();
        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to create transaction");
      },
    });

  return { addTransaction, isLoading };
};
