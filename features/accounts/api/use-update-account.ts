import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useUpdateAccount = () => {
  const utils = trpc.useUtils();

  const { mutate: updateAccount, isPending: isLoading } =
    trpc.updateAccount.useMutation({
      onSuccess: () => {
        toast.success("Account updated successfully");
        utils.getAccount.invalidate();
        utils.getAccounts.invalidate();
        utils.getTransactions.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to update account");
      },
    });

  return { updateAccount, isLoading };
};
