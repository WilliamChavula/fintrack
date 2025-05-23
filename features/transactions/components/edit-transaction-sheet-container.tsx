"use client";

import { useShallow } from "zustand/react/shallow";
import { useMountedState } from "react-use";
import { Loader } from "lucide-react";

import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useStore } from "../../store";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  addTransactionFormSchema,
  AddTransactionFormValues,
} from "@/features/validators/add-transaction-form";
import { useGetTransaction } from "../api/use-get-transaction";
import { useUpdateTransaction } from "../api/use-update-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { AddTransactionForm } from "./add-transaction-form";
import { useCreateNewAccount } from "@/features/accounts/api/use-create-new-account";
import { useCreateNewCategory } from "@/features/categories/api/use-create-new-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export function EditTransactionSheetContainer() {
  const isMounted = useMountedState();

  const isOpen = useStore(useShallow((state) => state.panels.transactionOpen));
  const close = useStore((state) => state.closeEditPanel);
  const id = useStore((state) => state.id);
  const { data, isLoading } = useGetTransaction(id);
  const { updateTransaction, isLoading: isUpdating } = useUpdateTransaction();
  const { deleteTransaction, isPending: isDeleting } = useDeleteTransaction();
  const [ConfirmationDialog, onConfirmation] = useConfirmDialog({
    title: "Delete Transaction?",
    message:
      "Are you sure you want to delete this transaction? This action cannot be undone.",
  });
  const { createAccount, isLoading: accountPending } = useCreateNewAccount();
  const { createCategory, isLoading: categoryPending } = useCreateNewCategory();

  const { data: accountData, isLoading: accountsLoading } = useGetAccounts();
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetCategories();

  const categoryOptions = (categoryData?.categories || []).map((category) => ({
    id: category.id,
    label: category.name,
  }));

  const accountOptions = (accountData?.accounts || []).map((account) => ({
    id: account.id,
    label: account.name,
  }));

  const createAccountHandler = (name: string) => createAccount({ name });
  const createCategoryHandler = (name: string) => createCategory({ name });

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddTransactionFormValues) => {
    updateTransaction({
      id,
      ...data,
    });
    close();
  };

  const handleDelete = async () => {
    const confirmed = await onConfirmation();
    if (confirmed) {
      deleteTransaction({ id }, { onSuccess: () => close() });
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit your transaction name.</SheetDescription>
          </SheetHeader>
          <div className="px-5">
            {isLoading || accountsLoading || categoriesLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="text-muted-foreground size-4 animate-spin" />
              </div>
            ) : (
              <AddTransactionForm
                resourceType="Transaction"
                schemaValidator={addTransactionFormSchema}
                id={id}
                onSubmit={handleSubmit}
                disabled={
                  isDeleting || isUpdating || accountPending || categoryPending
                }
                defaultValues={{
                  payee: data?.transaction.payee,
                  notes: data?.transaction.notes as string | undefined,
                  amount: data?.transaction.amount,
                  account: data?.transaction.account,
                  category: data?.transaction.category || "",
                  date: data?.transaction.date
                    ? new Date(data.transaction.date)
                    : undefined,
                }}
                accountOptions={accountOptions}
                categoryOptions={categoryOptions}
                onCreateAccount={createAccountHandler}
                onCreateCategory={createCategoryHandler}
                onDelete={handleDelete}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
