import {
  CreateResourceState,
  UpdateResourceState,
} from "@/features/store/types";
import { StateCreator } from "zustand";

export const updateResourceSlice: StateCreator<
  CreateResourceState & UpdateResourceState,
  [],
  [],
  UpdateResourceState
> = (set) => ({
  id: "",
  isOpen: false,
  openEditPanel: (id: string) => set({ isOpen: true, id }),
  closeEditPanel: () => set({ isOpen: false, id: undefined }),
});
