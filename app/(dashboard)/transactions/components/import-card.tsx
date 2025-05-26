/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CSVPreviewTable from "./csv-preview-table";
import { convertAmountToMilliUnits } from "@/lib/utils";
import { format, parse } from "date-fns";

const inputDateFormat = "yyyy-MM-dd HH:mm:ss";
const outputDateFormat = "yyyy-MM-dd";

const requiredColumns = ["payee", "amount", "date"];

function checkRequiredSelections(
  requiredValues: string[],
  userSelections: string[],
) {
  const allSelected = requiredValues.every((val) => {
    return userSelections.includes(val);
  });
  const selected = requiredValues.filter((value) =>
    userSelections.includes(value),
  );
  const missing = requiredValues.filter(
    (value) => !userSelections.includes(value),
  );

  return {
    totalRequired: requiredValues.length,
    selectedCount: selected.length,
    missingCount: missing.length,
    allSelected,
  };
}

interface SelectedColumnState {
  [key: `column_${number}`]: string | null;
}

interface ImportCardProps {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

function ImportCard({ data, onCancel, onSubmit }: ImportCardProps) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {},
  );

  const headers = data[0];
  const body = data.slice(1);

  const { selectedCount, totalRequired, allSelected } = checkRequiredSelections(
    requiredColumns,
    Object.values(selectedColumns),
  );

  const onContinueImport = () => {
    const getColumnIndex = (column: `column_${number}`) => column.split("_")[1];
    const makeKey = (index: number) => `column_${index}` as const;

    const recordData = {
      headers: headers.map((_, index) => {
        const columnIndex = getColumnIndex(makeKey(index));
        return selectedColumns[makeKey(+columnIndex)] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, idx) => {
            const columnIndex = getColumnIndex(makeKey(idx));
            return selectedColumns[makeKey(+columnIndex)] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length),
    };

    const payloadData = recordData.body
      .map((row) => {
        return row.reduce((acc: Record<string, string | null>, cell, index) => {
          const header = recordData.headers[index];
          if (header !== null) {
            acc[header] = cell;
          }

          return acc;
        }, {});
      })
      .map((data) => ({
        ...data,
        amount:
          data.amount && convertAmountToMilliUnits(parseFloat(data.amount)),
        date:
          data.date &&
          format(
            parse(data.date, inputDateFormat, new Date()),
            outputDateFormat,
          ),
      }));

    onSubmit(payloadData);
  };

  const onTableHeadSelectChanged = (index: number, value: string | null) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key as `column_${number}`] === value) {
          newSelectedColumns[key as `column_${number}`] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${index}`] = value;
      return newSelectedColumns;
    });
  };
  return (
    <section className="mx-auto -mt-16 w-full max-w-screen-2xl pb-6">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="items-center justify-between gap-y-2 lg:flex-row">
          <CardTitle className="text-lg">Import Transactions</CardTitle>
          <div className="flex items-center gap-x-2">
            <Button onClick={onCancel} size="sm">
              Cancel
            </Button>
            <Button
              disabled={!allSelected}
              onClick={onContinueImport}
              size="sm"
            >
              Continue ({selectedCount} / {totalRequired})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CSVPreviewTable
            body={body}
            headers={headers}
            selectedColumns={selectedColumns}
            onSelectColumnChanged={onTableHeadSelectChanged}
          />
        </CardContent>
      </Card>
    </section>
  );
}

export default ImportCard;
