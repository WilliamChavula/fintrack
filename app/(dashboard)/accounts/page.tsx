"use client";

import { Loader, PlusSquare } from "lucide-react";

import { useCreateAccountStore } from "@/features/accounts/hooks/use-create-account-store";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { columns } from "./columns";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Accounts() {
  const { open } = useCreateAccountStore();
  const { data, isLoading } = useGetAccounts();

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
            <Button size="sm" onClick={open}>
              <PlusSquare className="mr-2 size-4" />
              Add Account
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data?.accounts || []} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Accounts;
