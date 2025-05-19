"use client";

import { useMountedState } from "react-use";
import { Loader } from "lucide-react";

import { useGetAccount } from "../api/use-get-account";
import { useUpdateAccount } from "../api/use-update-account";
import { useDeleteAccount } from "../api/use-delete-account";
import {
  AddAccountFormValues,
  addAccountFormSchema,
} from "../../validators/add-account-form";

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

export function EditAccountSheetContainer() {
  const isMounted = useMountedState();

  const isOpen = useStore((state) => state.isOpen);
  const close = useStore((state) => state.closeEditPanel);
  const id = useStore((state) => state.id);
  const { data, isLoading } = useGetAccount(id);
  const { updateAccount, isLoading: isUpdating } = useUpdateAccount();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [ConfirmationDialog, onConfirmation] = useConfirmDialog({
    title: "Delete Account?",
    message:
      "Are you sure you want to delete this account? This action cannot be undone.",
  });

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddAccountFormValues) => {
    updateAccount({
      id,
      name: data.name,
    });
    close();
  };

  const handleDelete = async () => {
    const confirmed = await onConfirmation();
    if (confirmed) {
      deleteAccount({ id }, { onSuccess: () => close() });
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
              <AddResourceForm
                resourceType="Account"
                schemaValidator={addAccountFormSchema}
                id={id}
                onSubmit={handleSubmit}
                disabled={isDeleting || isUpdating}
                defaultValues={data?.account}
                onDelete={handleDelete}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
