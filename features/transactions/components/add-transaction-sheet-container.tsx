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

import {
  addTransactionFormSchema,
  AddTransactionFormValues,
} from "@/features/validators/add-transaction-form";
import { useCreateNewTransaction } from "../api/use-create-new-transaction";
import { useCreateNewCategory } from "@/features/categories/api/use-create-new-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateNewAccount } from "@/features/accounts/api/use-create-new-account";
import { Loader } from "lucide-react";
import { AddTransactionForm } from "./add-transaction-form";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export function AddTransactionSheetContainer() {
  const isOpen = useStore((state) => state.isOpen);
  const close = useStore((state) => state.closeCreatePanel);

  const { addTransaction, isLoading: accountLoading } =
    useCreateNewTransaction();
  const { createAccount, isLoading: accountPending } = useCreateNewAccount();
  const { createCategory, isLoading: categoryPending } = useCreateNewCategory();

  const { data: accountData, isLoading: accountsLoading } = useGetAccounts();
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetCategories();

  const categoryOptions = (categoryData?.categories || []).map((category) => ({
    id: category.id,
    label: category.name,
  }));

  const accountOptions = (accountData?.accounts || []).map((account) => ({
    id: account.id,
    label: account.name,
  }));

  const createAccountHandler = (name: string) => createAccount({ name });
  const createCategoryHandler = (name: string) => createCategory({ name });

  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (data: AddTransactionFormValues) => {
    addTransaction(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="space-y-1">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>Add transactions.</SheetDescription>
        </SheetHeader>
        <div className="px-5">
          {categoriesLoading || accountsLoading || accountLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="text-muted-foreground size-4 animate-spin" />{" "}
              Loading...
            </div>
          ) : (
            <AddTransactionForm
              resourceType="Transaction"
              onSubmit={handleSubmit}
              disabled={categoryPending || categoryPending || accountPending}
              schemaValidator={addTransactionFormSchema}
              defaultValues={{
                date: new Date(),
                amount: 0,
                notes: "",
                payee: "",
              }}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              onCreateAccount={createAccountHandler}
              onCreateCategory={createCategoryHandler}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
