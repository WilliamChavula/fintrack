"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { format, subDays } from "date-fns";
import { formatDateRange } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";

const DateFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const accountId = params.get("accountId");
  const to = params.get("to") || "";
  const from = params.get("from") || "";

  const fallbackTo = new Date();
  const fallbackFrom = subDays(fallbackTo, 10);

  const paramState = {
    from: from ? new Date(from) : fallbackFrom,
    to: to ? new Date(to) : fallbackTo,
  };
  const [date, setDate] = useState<DateRange | undefined>(paramState);
  const { isLoading: summaryLoading } = useGetSummary();

  const applySelected = (range: DateRange | undefined) => {
    const q = {
      from: format(range?.from || fallbackFrom, "yyyy-MM-dd"),
      to: format(range?.to || fallbackTo, "yyyy-MM-dd"),
      accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: q,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  };

  const reset = () => {
    setDate(undefined);
    applySelected(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white transition outline-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
          size="sm"
          variant={"outline"}
          disabled={false}
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0 lg:w-auto">
        <Calendar
          disabled={summaryLoading}
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          initialFocus
        />
        <div className="flex w-full items-center gap-x-2 p-4">
          <PopoverClose asChild>
            <Button
              className="flex-1"
              disabled={!date?.from || !date?.to}
              onClick={reset}
              variant="outline"
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              className="flex-1"
              disabled={!date?.from || !date?.to}
              onClick={() => applySelected(date)}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
