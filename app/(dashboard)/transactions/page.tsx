"use client";

import { Suspense, useState } from "react";
import { toast } from "sonner";
import { PlusSquare } from "lucide-react";

import { useStore } from "@/features/store";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadButton from "./components/upload-button";
import ImportCard from "./components/import-card";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server/routers";
import { useChooseAccountDialog } from "@/hooks/use-select-account";
import { useBulkCreateNewTransaction } from "@/features/transactions/api/use-bulk-create-new-transaction";
import TransactionsDisplay, {
  DataLoader,
} from "./components/transactions-display";

type TTransactionsInput = inferProcedureOutput<
  AppRouter["addTransaction"]
>["transaction"];

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

function Transactions() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [results, setResults] = useState(INITIAL_IMPORT_RESULTS);

  const open = useStore((state) => state.openCreatePanel);
  const [ChooseAccountDialog, confirm] = useChooseAccountDialog();
  const { addManyTransactions } = useBulkCreateNewTransaction();

  const handleFileUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
    setResults(results);
  };

  const onCancelFileUpload = () => {
    setResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const handleOnCsvImportSubmit = async (values: TTransactionsInput[]) => {
    const accId = await confirm();

    if (!accId) {
      return toast.error("Please select an account to continue");
    }

    const data = values.map((d) => ({
      ...d,
      account: accId as string,
    }));

    addManyTransactions(
      { transactions: data },
      {
        onSuccess: () => {
          onCancelFileUpload();
        },
      },
    );
  };

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ChooseAccountDialog />
        <ImportCard
          data={results.data}
          onCancel={onCancelFileUpload}
          onSubmit={handleOnCsvImportSubmit}
        />
      </>
    );
  }
  return (
    <main>
      <section className="mx-auto -mt-16 w-full max-w-screen-2xl pb-6">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:text-center">
            <CardTitle className="line-clamp-1 text-xl">
              Transactions History
            </CardTitle>
            <div className="flex items-center gap-x-2">
              <Button size="sm" onClick={() => open({ transactionOpen: true })}>
                <PlusSquare className="mr-2 size-4" />
                Add Transaction
              </Button>
              <UploadButton onUpload={handleFileUpload} />
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<DataLoader />}>
              <TransactionsDisplay />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Transactions;
