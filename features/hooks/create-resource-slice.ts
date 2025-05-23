import { StateCreator } from "zustand";

import {
  CreateResourceState,
  UpdateResourceState,
} from "@/features/store/types";

export const createResourceSlice: StateCreator<
  CreateResourceState & UpdateResourceState,
  [],
  [],
  CreateResourceState
> = (set) => ({
  panels: {
    accountOpen: false,
    categoryOpen: false,
    transactionOpen: false,
  },
  openCreatePanel: (newState) =>
    set((state) => ({ panels: { ...state.panels, ...newState } })),
  closeCreatePanel: () =>
    set({
      panels: {
        accountOpen: false,
        categoryOpen: false,
        transactionOpen: false,
      },
    }),
});
