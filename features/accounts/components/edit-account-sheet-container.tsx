"use client";

import { useMountedState } from "react-use";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { AddAccountForm } from "./add-account-form";
import { AddAccountFormValues } from "../validators/add-account-form";
import { useGetAccount } from "../api/use-get-account";
import { useUpdateAccountStore } from "../hooks/use-update-account";
import { Loader } from "lucide-react";

export function EditAccountSheetContainer() {
  const { isOpen, close, id } = useUpdateAccountStore();
  const { data, isLoading } = useGetAccount(id);

  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddAccountFormValues) => {};

  return (
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
            <AddAccountForm
              id={id}
              onSubmit={handleSubmit}
              disabled={isLoading}
              defaultValues={data?.account}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
