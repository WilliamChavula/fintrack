import { StateCreator } from "zustand";

import { CreateAccountState, UpdateAccountState } from "@/features/store/types";

export const createAccountStore: StateCreator<
  CreateAccountState & UpdateAccountState,
  [],
  [],
  CreateAccountState
> = (set) => ({
  isOpen: false,
  openCreatePanel: () => set({ isOpen: true }),
  closeCreatePanel: () => set({ isOpen: false }),
});
