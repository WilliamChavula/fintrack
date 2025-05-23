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
import { useGetCategory } from "../api/use-get-category";
import { useUpdateCategory } from "../api/use-update-categories";
import { useDeleteCategory } from "../api/use-delete-category";
import { AddResourceForm } from "@/components/add-resource-form";
import {
  AddACategoryFormValues,
  addCategoryFormSchema,
} from "@/features/validators/add-category-form";

export function EditCategorySheetContainer() {
  const isMounted = useMountedState();

  const isOpen = useStore(useShallow((state) => state.panels.categoryOpen));
  const close = useStore((state) => state.closeEditPanel);
  const id = useStore((state) => state.id);

  const { data, isLoading } = useGetCategory(id);
  const { updateCategory, isLoading: isUpdating } = useUpdateCategory();
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const [ConfirmationDialog, onConfirmation] = useConfirmDialog({
    title: "Delete Category?",
    message:
      "Are you sure you want to delete this category? This action cannot be undone.",
  });

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddACategoryFormValues) => {
    updateCategory({
      id,
      name: data.name,
    });
    close();
  };

  const handleDelete = async () => {
    const confirmed = await onConfirmation();
    if (confirmed) {
      deleteCategory({ id }, { onSuccess: () => close() });
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit your category title.</SheetDescription>
          </SheetHeader>
          <div className="px-5">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="text-muted-foreground size-4 animate-spin" />
              </div>
            ) : (
              <AddResourceForm
                resourceType="Category"
                schemaValidator={addCategoryFormSchema}
                id={id}
                onSubmit={handleSubmit}
                disabled={isDeleting || isUpdating}
                defaultValues={{ name: data?.category.name || "" }}
                onDelete={handleDelete}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
