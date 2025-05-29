import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteCategory, isPending } = trpc.deleteCategory.useMutation(
    {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        utils.getCategories.invalidate();
        utils.getTransactions.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete category");
      },
    },
  );

  return { deleteCategory, isPending };
};
