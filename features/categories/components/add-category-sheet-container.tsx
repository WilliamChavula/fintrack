"use client";

import { useShallow } from "zustand/react/shallow";
import { useMountedState } from "react-use";

import { useStore } from "../../store";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { useCreateNewCategory } from "../api/use-create-new-categories";
import {
  AddACategoryFormValues,
  addCategoryFormSchema,
} from "@/features/validators/add-category-form";
import { AddResourceForm } from "@/components/add-resource-form";

export function AddCategorySheetContainer() {
  const isOpen = useStore(useShallow((state) => state.panels.categoryOpen));
  const close = useStore((state) => state.closeCreatePanel);
  const { createCategory, isLoading } = useCreateNewCategory();

  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddACategoryFormValues) => {
    createCategory(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Add Category</SheetTitle>
          <SheetDescription>
            Add a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <AddResourceForm<AddACategoryFormValues>
            onSubmit={handleSubmit}
            disabled={isLoading}
            resourceType="Category"
            schemaValidator={addCategoryFormSchema}
            defaultValues={{ name: "" }}
            placeholder="Groceries, Rent, etc."
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
