import { create } from "zustand";
import { CreateAccountState, UpdateAccountState } from "./types";
import { createAccountStore } from "../accounts/hooks/use-create-account-store";
import { updateAccountStore } from "../accounts/hooks/use-update-account";

export const useStore = create<CreateAccountState & UpdateAccountState>()(
  (...a) => ({
    ...createAccountStore(...a),
    ...updateAccountStore(...a),
  }),
);
export type Store = ReturnType<typeof useStore>;
