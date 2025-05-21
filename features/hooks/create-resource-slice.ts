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
  isOpen: false,
  openCreatePanel: () => set({ isOpen: true }),
  closeCreatePanel: () => set({ isOpen: false }),
});
