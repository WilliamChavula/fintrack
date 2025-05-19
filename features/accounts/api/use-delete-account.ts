import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useDeleteAccount = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteAccount, isPending } = trpc.deleteAccount.useMutation({
    onSuccess: () => {
      toast.success("Account deleted successfully");
      utils.getAccounts.invalidate();

      // TODO: invalidate summary query
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return { deleteAccount, isPending };
};
