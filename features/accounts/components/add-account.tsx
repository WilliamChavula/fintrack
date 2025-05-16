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

export function AddAccount() {
  const { isOpen, close } = useCreateAccountStore();

  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Add Account</SheetTitle>
          <SheetDescription>
            Add a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
