"use client";

import { usePathname } from "next/navigation";

import { useStore } from "@/features/store";
import { EditAccountSheetContainer } from "@/features/accounts/components/edit-account-sheet-container";
import { AddAccountSheetContainer } from "@/features/accounts/components/add-account-sheet-container";
import { EditCategorySheetContainer } from "@/features/categories/components/edit-category-sheet-container";
import { AddCategorySheetContainer } from "@/features/categories/components/add-category-sheet-container";

export const AccountSheetProvider = () => {
  const path = usePathname();
  const id = useStore((state) => state.id);

  if (id && path === "/accounts") {
    return <EditAccountSheetContainer />;
  } else if (!id && path === "/accounts") {
    return <AddAccountSheetContainer />;
  }

  if (id && path === "/categories") {
    return <EditCategorySheetContainer />;
  } else if (!id && path === "/categories") {
    return <AddCategorySheetContainer />;
  }
};
