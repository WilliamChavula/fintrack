import { create } from "zustand";

export interface UpdateAccountState {
  id?: string;
  isOpen: boolean;
  open: (id: string) => void;
  close: () => void;
}

export const useUpdateAccountStore = create<UpdateAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  open: (id: string) => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: undefined }),
}));
