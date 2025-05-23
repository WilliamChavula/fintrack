"use client";

import { EditAccountSheetContainer } from "@/features/accounts/components/edit-account-sheet-container";
import { AddAccountSheetContainer } from "@/features/accounts/components/add-account-sheet-container";
import { EditCategorySheetContainer } from "@/features/categories/components/edit-category-sheet-container";
import { AddCategorySheetContainer } from "@/features/categories/components/add-category-sheet-container";
import { AddTransactionSheetContainer } from "@/features/transactions/components/add-transaction-sheet-container";
import { EditTransactionSheetContainer } from "@/features/transactions/components/edit-transaction-sheet-container";
import { useStore } from "@/features/store";

export const AccountSheetProvider = () => {
  const panels = useStore((state) => state.panels);
  const id = useStore((state) => state.id);
  return (
    <>
      {panels.accountOpen && id && <EditAccountSheetContainer />}
      {panels.accountOpen && !id && <AddAccountSheetContainer />}
      {panels.categoryOpen && id && <EditCategorySheetContainer />}
      {panels.categoryOpen && !id && <AddCategorySheetContainer />}
      {panels.transactionOpen && id && <EditTransactionSheetContainer />}
      {panels.transactionOpen && !id && <AddTransactionSheetContainer />}
    </>
  );
};
