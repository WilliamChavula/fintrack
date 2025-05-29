import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useDeleteAccount = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteAccount, isPending } = trpc.deleteAccount.useMutation({
    onSuccess: () => {
      toast.success("Account deleted successfully");
      utils.getAccounts.invalidate();
      utils.getTransactions.invalidate();

      utils.getSummary.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return { deleteAccount, isPending };
};
