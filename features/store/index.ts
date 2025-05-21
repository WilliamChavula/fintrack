import { create } from "zustand";

import { createResourceSlice } from "../hooks/create-resource-slice";
import { updateResourceSlice } from "../hooks/update-resource-slice";

import { CreateResourceState, UpdateResourceState } from "./types";

export const useStore = create<CreateResourceState & UpdateResourceState>()(
  (...a) => ({
    ...createResourceSlice(...a),
    ...updateResourceSlice(...a),
  }),
);
export type Store = ReturnType<typeof useStore>;
