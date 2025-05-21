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
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

type DropDownMenuActionsProps = {
  id: string;
};

const DropDownMenuActions = ({ id }: DropDownMenuActionsProps) => {
  const open = useStore((state) => state.openEditPanel);
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [ConfirmationDialog, onConfirmation] = useConfirmDialog({
    title: "Delete Account?",
    message:
      "Are you sure you want to delete this account? This action cannot be undone.",
  });

  const handleDelete = async () => {
    const confirmed = await onConfirmation();
    if (confirmed) {
      deleteAccount({ id }, { onSuccess: () => close() });
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
              return open(id);
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
