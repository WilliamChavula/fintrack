import { CreateAccountState, UpdateAccountState } from "@/features/store/types";
import { StateCreator } from "zustand";

export const updateAccountStore: StateCreator<
  CreateAccountState & UpdateAccountState,
  [],
  [],
  UpdateAccountState
> = (set) => ({
  id: "",
  isOpen: false,
  openEditPanel: (id: string) => set({ isOpen: true, id }),
  closeEditPanel: () => set({ isOpen: false, id: undefined }),
});
