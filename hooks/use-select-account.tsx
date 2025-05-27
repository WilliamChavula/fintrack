import ReactSelectComponent from "@/components/react-select-component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useCreateNewAccount } from "@/features/accounts/api/use-create-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { JSX, useRef, useState } from "react";

type ConfirmDialogReturn = [() => JSX.Element, () => Promise<unknown>];

export const useChooseAccountDialog = (): ConfirmDialogReturn => {
  const [promise, setPromise] = useState<{
    resolve: (val: string | undefined) => void;
  } | null>(null);
  const selectValue = useRef<string | undefined>(undefined);

  const { data, isLoading: loadingAccounts } = useGetAccounts();
  const { createAccount, isLoading: creatingAccount } = useCreateNewAccount();

  const accountOptions = (data?.accounts ?? []).map((acc) => ({
    label: acc.name,
    value: acc.id,
  }));

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => setPromise(null);

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(selectValue.current);
      handleClose();
    }
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(undefined);
      handleClose();
    }
  };

  const ChooseAccountDialog = () => (
    <Dialog open={!!promise}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Select account to be associated with these transactions
          </DialogDescription>
        </DialogHeader>
        <ReactSelectComponent
          placeholder="Select or Create Account"
          onChange={(val) => (selectValue.current = val)}
          onCreate={(name: string) => createAccount({ name })}
          disabled={loadingAccounts || creatingAccount}
          options={accountOptions}
        />
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ChooseAccountDialog, confirm];
};
