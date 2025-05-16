"use client";

import { useMountedState } from "react-use";

import { useCreateAccountStore } from "../hooks/use-create-account-store";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { AddAccountForm } from "./add-account-form";
import { AddAccountFormValues } from "../validators/add-account-form";

export function AddAccountSheerContainer() {
  const { isOpen, close } = useCreateAccountStore();

  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddAccountFormValues) => {
    console.log("Form submitted with data:", data);
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
          <AddAccountForm onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
