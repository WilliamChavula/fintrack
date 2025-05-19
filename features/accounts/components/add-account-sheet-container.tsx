"use client";

import { useMountedState } from "react-use";

import { useStore } from "../../store";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { AddAccountForm } from "./add-account-form";
import { AddAccountFormValues } from "../validators/add-account-form";
import { useCreateNewAccount } from "../api/use-create-new-account";

export function AddAccountSheerContainer() {
  const isOpen = useStore((state) => state.isOpen);
  const close = useStore((state) => state.closeCreatePanel);
  const { createAccount, isLoading } = useCreateNewAccount();

  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddAccountFormValues) => {
    createAccount(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Add Account</SheetTitle>
          <SheetDescription>
            Add a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <AddAccountForm onSubmit={handleSubmit} disabled={isLoading} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
