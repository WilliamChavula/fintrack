import { trpc } from "@/providers/tanstack-provider";

export const useGetCategories = () => {
  const { data, isLoading, status, error } = trpc.getCategories.useQuery();

  if (status === "error") {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories");
  }

  return { data, isLoading };
};
