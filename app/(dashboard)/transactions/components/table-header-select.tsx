import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";

interface TableHeaderSelectProps {
  columnIndex: number;
  selectedColumns: Record<`column_${number}`, string | null>;
  onSelectColumnChanged: (columnIndex: number, value: string | null) => void;
}

const headerOptions = ["payee", "amount", "date", "notes"];

const TableHeaderSelect = ({
  columnIndex,
  selectedColumns,
  onSelectColumnChanged,
}: TableHeaderSelectProps) => {
  const currentSelectedColumn = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelectedColumn || ""}
      onValueChange={(val) => onSelectColumnChanged(columnIndex, val)}
    >
      <SelectTrigger
        className={cn(
          "border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0",
          currentSelectedColumn && "text-blue-500",
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Skip">Skip</SelectItem>
        {headerOptions.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${index}`] !== option;

          return (
            <SelectItem
              key={index}
              value={option}
              className="capitalize"
              disabled={disabled}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TableHeaderSelect;
