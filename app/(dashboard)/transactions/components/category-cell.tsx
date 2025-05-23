import { useStore } from "@/features/store";
import { cn } from "@/lib/utils";
import { AlertTriangle, Pencil } from "lucide-react";

interface CategoryCellProps {
  id: string;
  categoryId: string | null;
  categoryName: string | null;
}

export const CategoryCell = ({
  id,
  categoryId,
  categoryName,
}: CategoryCellProps) => {
  const open = useStore((state) => state.openEditPanel);

  const handleEditCategory = () => {
    if (categoryId) {
      open(categoryId, { categoryOpen: true });
    } else {
      open(id, { transactionOpen: true });
    }
  };

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center gap-2",
        !categoryName && "text-amber-500",
      )}
      onClick={handleEditCategory}
    >
      <span className="inline-flex items-center gap-2">
        {!categoryName && <AlertTriangle className="size-4 shrink-0" />}

        {categoryName || "Uncategorized"}
      </span>
      <Pencil className="size-3 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};
