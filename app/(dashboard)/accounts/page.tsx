"use client";

import { Loader, PlusSquare } from "lucide-react";

import { useStore } from "@/features/store";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { columns, GetAccountResponse } from "./columns";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";
import { Row } from "@tanstack/react-table";

function Accounts() {
  const open = useStore((state) => state.openCreatePanel);
  const { data, isLoading } = useGetAccounts();
  const { deleteAccounts, isPending } = useBulkDeleteAccounts();

  const isDisabled = isPending || isLoading;

  const handleDelete = (rows: Row<GetAccountResponse>[]) => {
    const selectedRows = rows.map((row) => row.original.id);
    deleteAccounts({ ids: selectedRows });
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
              Manage your Accounts
            </CardTitle>
            <Button size="sm" onClick={() => open({ accountOpen: true })}>
              <PlusSquare className="mr-2 size-4" />
              Add Account
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              filterKey="name"
              columns={columns}
              data={data?.accounts || []}
              disabled={isDisabled}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Accounts;
