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

        // TODO: invalidate summary query
      },
      onError: () => {
        toast.error("Failed to update account");
      },
    });

  return { updateAccount, isLoading };
};
