import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useBulkCreateNewTransaction = () => {
  const utils = trpc.useUtils();

  const { mutate: addManyTransactions, isPending: isLoading } =
    trpc.addManyTransactions.useMutation({
      onSuccess: () => {
        toast.success("Transactions created successfully");
        utils.getTransactions.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to create transactions");
      },
    });

  return { addManyTransactions, isLoading };
};
