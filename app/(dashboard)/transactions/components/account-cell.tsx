import { useStore } from "@/features/store";
import { Pencil } from "lucide-react";

interface AccountCellProps {
  accountId: string;
  accountName: string;
}

export const AccountCell = ({ accountId, accountName }: AccountCellProps) => {
  const open = useStore((state) => state.openEditPanel);

  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      onClick={() => open(accountId, { accountOpen: true })}
    >
      <span className="inline-block">{accountName}</span>
      <Pencil className="size-3 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};
