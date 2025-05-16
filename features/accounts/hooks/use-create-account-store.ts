import { create } from "zustand";

export interface CreateAccountState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateAccountStore = create<CreateAccountState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
