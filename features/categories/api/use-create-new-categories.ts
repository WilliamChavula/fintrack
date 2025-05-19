import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useCreateNewCategory = () => {
  const utils = trpc.useUtils();

  const { mutate: createCategory, isPending: isLoading } =
    trpc.addCategory.useMutation({
      onSuccess: () => {
        toast.success("Category created successfully");
        utils.getCategories.invalidate();
      },
      onError: () => {
        toast.error("Failed to create category");
      },
    });

  return { createCategory, isLoading };
};
