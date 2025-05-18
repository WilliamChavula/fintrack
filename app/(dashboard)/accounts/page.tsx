"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateAccountStore } from "@/features/accounts/hooks/use-create-account-store";
import { PlusSquare } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/data-table";

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

function Accounts() {
  const data = getData();
  const { open } = useCreateAccountStore();
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
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Accounts;
