import CurrencyInput from "react-currency-input-field";

import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TransactionAmountInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

function TransactionAmountInput({
  disabled,
  placeholder,
  onChange,
  value,
}: TransactionAmountInputProps) {
  const parsedValue = parseFloat(value);

  const isExpense = parsedValue < 0;
  const isIncome = parsedValue > 0;

  const expenseIncomeSwitcher = () =>
    value ? onChange((parseFloat(value) * -1).toString()) : undefined;

  const handleChange = (value: string | undefined) => {
    if (value) {
      onChange(value);
    } else {
      onChange(undefined);
    }
  };
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={expenseIncomeSwitcher}
              className={cn(
                "absolute top-2.5 left-1.5 flex size-5 items-center justify-center rounded-md border-slate-400 transition hover:border-slate-500",
              )}
            >
              {!parsedValue && <Info className="size-4 text-slate-500" />}
              {isIncome && <PlusCircle className="size-4 text-slate-500" />}
              {isExpense && <MinusCircle className="size-4 text-slate-500" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+/-] to switch between income and expense
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="$"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onValueChange={handleChange}
        decimalScale={2}
        decimalsLimit={2}
        allowNegativeValue={true}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pl-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isExpense && "text-red-500",
          isIncome && "text-green-500",
        )}
      />
      <p className="text-muted-foreground text-xs">
        {isExpense && "This will be marked as an expense"}
        {isIncome && "This will be marked as an income"}
      </p>
    </div>
  );
}

export default TransactionAmountInput;
