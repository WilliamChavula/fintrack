import { trpc } from "@/providers/tanstack-provider";
import { toast } from "sonner";

export const useCreateNewAccount = () => {
  const utils = trpc.useUtils();

  const { mutate: createAccount, isPending: isLoading } =
    trpc.addAccount.useMutation({
      onSuccess: () => {
        toast.success("Account created successfully");
        utils.getAccounts.invalidate();
      },
      onError: () => {
        toast.error("Failed to create account");
      },
    });

  return { createAccount, isLoading };
};
