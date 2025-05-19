"use client";

import { useStore } from "@/features/store";
import { EditAccountSheetContainer } from "@/features/accounts/components/edit-account-sheet-container";
import { AddAccountSheerContainer } from "@/features/accounts/components/add-account-sheet-container";

export const AccountSheetProvider = () => {
  const id = useStore((state) => state.id);

  if (id) {
    return <EditAccountSheetContainer />;
  }

  return <AddAccountSheerContainer />;
};
