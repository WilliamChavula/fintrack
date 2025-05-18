"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateAccountStore } from "@/features/accounts/hooks/use-create-account-store";
import { PlusSquare } from "lucide-react";

function Accounts() {
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
        </Card>
      </section>
    </main>
  );
}

export default Accounts;
