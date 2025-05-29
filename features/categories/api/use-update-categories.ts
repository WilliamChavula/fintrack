import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useUpdateCategory = () => {
  const utils = trpc.useUtils();

  const { mutate: updateCategory, isPending: isLoading } =
    trpc.updateCategory.useMutation({
      onSuccess: () => {
        toast.success("Category updated successfully");
        utils.getCategory.invalidate();
        utils.getCategories.invalidate();
        utils.getTransactions.invalidate();

        utils.getSummary.invalidate();
      },
      onError: () => {
        toast.error("Failed to update category");
      },
    });

  return { updateCategory, isLoading };
};
