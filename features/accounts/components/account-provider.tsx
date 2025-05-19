"use client";

import { useStore } from "@/features/store";
import { EditAccountSheetContainer } from "./edit-account-sheet-container";
import { AddAccountSheerContainer } from "./add-account-sheet-container";

export const AccountSheetProvider = () => {
  const id = useStore((state) => state.id);

  if (id) {
    return <EditAccountSheetContainer />;
  }

  return <AddAccountSheerContainer />;
};
