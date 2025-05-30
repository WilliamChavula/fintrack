import { Loader } from "lucide-react";

import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { columns, TransactionType } from "../columns";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { Row } from "@tanstack/react-table";

const TransactionsDisplay = () => {
  const { data, isLoading } = useGetTransactions();

  const { deleteTransactions, isPending } = useBulkDeleteTransactions();
  const isDisabled = isPending || isLoading;

  const handleDelete = (rows: Row<TransactionType>[]) => {
    const selectedRows = rows.map((row) => row.original.id);
    deleteTransactions({ ids: selectedRows });
  };

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <DataTable
      filterKey="payee"
      columns={columns}
      data={data || []}
      disabled={isDisabled}
      onDelete={handleDelete}
    />
  );
};

export default TransactionsDisplay;

export function DataLoader() {
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
