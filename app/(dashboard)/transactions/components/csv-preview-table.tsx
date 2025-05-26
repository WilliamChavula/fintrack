import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableHeaderSelect from "./table-header-select";

interface CSVPreviewTableProps {
  headers: string[];
  body: string[][];
  selectedColumns: Record<`column_${number}`, string | null>;
  onSelectColumnChanged: (columnIndex: number, value: string | null) => void;
}

const CSVPreviewTable = ({
  headers,
  body,
  selectedColumns,
  onSelectColumnChanged,
}: CSVPreviewTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_, index) => (
              <TableHead key={index}>
                <TableHeaderSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onSelectColumnChanged={onSelectColumnChanged}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index: number) => (
            <TableRow key={index}>
              {row.map((entry, index) => (
                <TableCell key={index}>{entry}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CSVPreviewTable;
