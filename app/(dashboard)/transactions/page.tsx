"use client";

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

function Transactions() {
  const open = useStore((state) => state.openCreatePanel);
  const { data, isLoading } = useGetTransactions();
  const { deleteTransactions, isPending } = useBulkDeleteTransactions();

  const isDisabled = isPending || isLoading;

  const handleDelete = (rows: Row<TransactionType>[]) => {
    const selectedRows = rows.map((row) => row.original.id);
    deleteTransactions({ ids: selectedRows });
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
  return (
    <main>
      <section className="mx-auto -mt-16 w-full max-w-screen-2xl pb-6">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:text-center">
            <CardTitle className="line-clamp-1 text-xl">
              Transactions History
            </CardTitle>
            <Button size="sm" onClick={() => open({ transactionOpen: true })}>
              <PlusSquare className="mr-2 size-4" />
              Add Transaction
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              filterKey="date"
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
