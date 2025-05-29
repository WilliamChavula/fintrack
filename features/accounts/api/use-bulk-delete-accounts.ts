import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useBulkDeleteAccounts = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteAccounts, isPending } =
    trpc.bulkDeleteAccount.useMutation({
      onSuccess: () => {
        toast.success("Accounts successfully deleted");
        // Refetch the accounts after deletion
        utils.getAccounts.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete accounts");
      },
    });

  return { deleteAccounts, isPending };
};
