"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader, PlusSquare } from "lucide-react";

import { useStore } from "@/features/store";
import { columns, TransactionType } from "./columns";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Row } from "@tanstack/react-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import UploadButton from "./components/upload-button";
import ImportCard from "./components/import-card";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server/routers";
import { useChooseAccountDialog } from "@/hooks/use-select-account";
import { useBulkCreateNewTransaction } from "@/features/transactions/api/use-bulk-create-new-transaction";

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
  const { data, isLoading } = useGetTransactions();
  const { deleteTransactions, isPending } = useBulkDeleteTransactions();
  const [ChooseAccountDialog, confirm] = useChooseAccountDialog();
  const { addManyTransactions } = useBulkCreateNewTransaction();

  const isDisabled = isPending || isLoading;

  const handleDelete = (rows: Row<TransactionType>[]) => {
    const selectedRows = rows.map((row) => row.original.id);
    deleteTransactions({ ids: selectedRows });
  };

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

  if (isLoading) {
    return (
      <main>
        <section className="mx-auto -mt-16 w-full max-w-screen-2xl pb-6">
          <Card className="border-none drop-shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] w-full items-center justify-center">
                <Loader className="text-muted-foreground size-5 animate-spin" />
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

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
            <DataTable
              filterKey="payee"
              columns={columns}
              data={data || []}
              disabled={isDisabled}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Transactions;
