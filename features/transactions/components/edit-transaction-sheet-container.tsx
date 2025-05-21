"use client";

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
import { AddResourceForm } from "@/components/add-resource-form";
import {
  addTransactionFormSchema,
  AddTransactionFormValues,
} from "@/features/validators/add-transaction-form";
import { useGetTransaction } from "../api/use-get-transaction";
import { useUpdateTransaction } from "../api/use-update-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";

export function EditAccountSheetContainer() {
  const isMounted = useMountedState();

  const isOpen = useStore((state) => state.isOpen);
  const close = useStore((state) => state.closeEditPanel);
  const id = useStore((state) => state.id);
  const { data, isLoading } = useGetTransaction(id);
  const { updateTransaction, isLoading: isUpdating } = useUpdateTransaction();
  const { deleteTransaction, isPending: isDeleting } = useDeleteTransaction();
  const [ConfirmationDialog, onConfirmation] = useConfirmDialog({
    title: "Delete Account?",
    message:
      "Are you sure you want to delete this account? This action cannot be undone.",
  });

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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit your account name.</SheetDescription>
          </SheetHeader>
          <div className="px-5">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="text-muted-foreground size-4 animate-spin" />
              </div>
            ) : (
              <AddResourceForm<AddTransactionFormValues>
                resourceType="Transaction"
                schemaValidator={addTransactionFormSchema}
                id={id}
                onSubmit={handleSubmit}
                disabled={isDeleting || isUpdating}
                defaultValues={{
                  payee: data?.transaction.payee,
                  notes: data?.transaction.notes as string | undefined,
                  amount: data?.transaction.amount,
                  date: data?.transaction.date
                    ? new Date(data.transaction.date)
                    : undefined,
                }}
                onDelete={handleDelete}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
