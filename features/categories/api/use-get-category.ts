import { trpc } from "@/providers/tanstack-provider";

import { isValidUuid } from "@/features/validators/get-resource-validator";

export const useGetCategory = (id: string) => {
  const { data, isLoading, status, error } = trpc.getCategory.useQuery(
    { id },
    {
      enabled: isValidUuid(id),
    },
  );

  if (status === "error") {
    console.error("Error fetching category:", JSON.stringify(error));
    throw new Error(`Failed to fetch category with id ${id}`);
  }

  return { data, isLoading };
};
