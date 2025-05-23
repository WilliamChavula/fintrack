"use client";

import { Row } from "@tanstack/react-table";
import { Loader, PlusSquare } from "lucide-react";

import { columns, GetCategoryResponse } from "./columns";
import { useStore } from "@/features/store";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

function Categories() {
  const open = useStore((state) => state.openCreatePanel);
  const { data, isLoading } = useGetCategories();
  const { deleteCategories, isPending } = useBulkDeleteCategories();

  const isDisabled = isPending || isLoading;

  const handleDelete = (rows: Row<GetCategoryResponse>[]) => {
    const selectedRows = rows.map((row) => row.original.id);
    deleteCategories({ ids: selectedRows });
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
              Manage your Categories
            </CardTitle>
            <Button size="sm" onClick={() => open({ categoryOpen: true })}>
              <PlusSquare className="mr-2 size-4" />
              Add New
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              filterKey="name"
              columns={columns}
              data={data?.categories || []}
              disabled={isDisabled}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Categories;
