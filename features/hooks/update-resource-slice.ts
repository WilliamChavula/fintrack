import { StateCreator } from "zustand";

import {
  CreateResourceState,
  UpdateResourceState,
} from "@/features/store/types";

export const updateResourceSlice: StateCreator<
  CreateResourceState & UpdateResourceState,
  [],
  [],
  UpdateResourceState
> = (set) => ({
  id: "",
  isOpen: false,
  openEditPanel: (id: string, newState) =>
    set((state) => ({ id, panels: { ...state.panels, ...newState } })),
  closeEditPanel: () =>
    set({
      id: undefined,
      panels: {
        accountOpen: false,
        categoryOpen: false,
        transactionOpen: false,
      },
    }),
});
