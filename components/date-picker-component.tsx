import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

interface DatePickerComponentProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}

function DatePickerComponent({
  value,
  onChange,
  disabled,
}: DatePickerComponentProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pointer-events-auto">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePickerComponent;
