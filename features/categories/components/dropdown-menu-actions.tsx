"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "../../store";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useDeleteCategory } from "../api/use-delete-category";

type DropDownMenuActionsProps = {
  id: string;
};

const DropDownMenuActions = ({ id }: DropDownMenuActionsProps) => {
  const open = useStore((state) => state.openEditPanel);
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const [ConfirmationDialog, onConfirmation] = useConfirmDialog({
    title: "Delete Category?",
    message:
      "Are you sure you want to delete this category? This action cannot be undone.",
  });

  const handleDelete = async () => {
    const confirmed = await onConfirmation();
    if (confirmed) {
      deleteCategory({ id }, { onSuccess: () => close() });
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0" size="icon">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isDeleting}
            className="cursor-pointer"
            onClick={() => {
              return open(id, { categoryOpen: true });
            }}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleting}
            className="cursor-pointer"
            onClick={handleDelete}
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenuActions;
