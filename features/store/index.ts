import { create } from "zustand";

import { createResourceSlice } from "../accounts/hooks/create-resource-slice";
import { updateResourceSlice } from "../accounts/hooks/update-resource-slice";

import { CreateResourceState, UpdateResourceState } from "./types";

export const useStore = create<CreateResourceState & UpdateResourceState>()(
  (...a) => ({
    ...createResourceSlice(...a),
    ...updateResourceSlice(...a),
  }),
);
export type Store = ReturnType<typeof useStore>;
