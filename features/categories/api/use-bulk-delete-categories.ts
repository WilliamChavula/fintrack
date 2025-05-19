import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useBulkDeleteCategories = () => {
  const utils = trpc.useUtils();

  const { mutate: deleteCategories, isPending } =
    trpc.bulkDeleteCategories.useMutation({
      onSuccess: () => {
        toast.success("Categories successfully deleted");
        // Refetch the accounts after deletion
        utils.getCategories.invalidate();

        // TODO: Invalidate summary
      },
      onError: () => {
        toast.error("Failed to delete categories");
      },
    });

  return { deleteCategories, isPending };
};
