import { ZodSchema } from "zod";
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddTransactionFormValues } from "@/features/validators/add-transaction-form";
import ReactSelectComponent from "@/components/react-select-component";
import DatePickerComponent from "@/components/date-picker-component";
import { Textarea } from "@/components/ui/textarea";
import TransactionAmountInput from "./transaction-amount-input";
import { convertAmountToMilliUnits } from "@/lib/utils";

interface AddTransactionFormProps {
  resourceType: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  schemaValidator: ZodSchema;
  defaultValues: DefaultValues<AddTransactionFormValues>;
  onSubmit: SubmitHandler<AddTransactionFormValues>;
  onDelete?: () => void;
  accountOptions: {
    id: string;
    label: string;
  }[];
  categoryOptions: {
    id: string;
    label: string;
  }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
}

export function AddTransactionForm({
  id,
  resourceType,
  disabled,
  defaultValues,
  onSubmit,
  onDelete,
  schemaValidator,
  accountOptions,
  onCreateAccount,
  categoryOptions,
  onCreateCategory,
}: AddTransactionFormProps) {
  const form = useForm<AddTransactionFormValues>({
    resolver: zodResolver(schemaValidator),
    defaultValues,
  });
  const onFormSubmit = (data: AddTransactionFormValues) => {
    const milliAmount = convertAmountToMilliUnits(data.amount);

    onSubmit({
      ...data,
      amount: milliAmount,
    });

    form.reset();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <ReactSelectComponent
                  placeholder="Select account"
                  disabled={disabled}
                  value={field.value}
                  onChange={field.onChange}
                  options={accountOptions.map((option) => ({
                    value: option.id,
                    label: option.label,
                  }))}
                  onCreate={onCreateAccount}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <ReactSelectComponent
                  placeholder="Select category"
                  disabled={disabled}
                  value={field.value}
                  onChange={field.onChange}
                  options={categoryOptions.map((option) => ({
                    value: option.id,
                    label: option.label,
                  }))}
                  onCreate={onCreateCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pick a Date</FormLabel>
              <FormControl>
                <DatePickerComponent
                  disabled={disabled}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input placeholder="Add Payee" disabled={disabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <TransactionAmountInput
                  {...field}
                  placeholder="0.00"
                  disabled={disabled}
                  value={field.value?.toString() ?? ""}
                  onChange={(value) => {
                    if (value) {
                      field.onChange(parseFloat(value));
                    } else {
                      field.onChange(undefined);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={disabled}
                  placeholder="Add a note about this transaction"
                  rows={3}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled} type="submit">
          {id ? "Save Changes" : `Create ${resourceType}`}
        </Button>
        {id && (
          <Button
            className="w-full"
            disabled={disabled}
            variant="outline"
            type="button"
            onClick={handleDelete}
          >
            <TrashIcon className="mr-2 size-4" />
            Delete {resourceType}
          </Button>
        )}
      </form>
    </Form>
  );
}
