import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addAccountFormSchema,
  AddAccountFormValues,
} from "../validators/add-account-form";

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
import { TrashIcon } from "lucide-react";

interface AddAccountFormProps {
  id?: string;
  onSubmit: (data: AddAccountFormValues) => void;
  onDelete?: () => void;
  defaultValues?: Partial<AddAccountFormValues>;
  disabled?: boolean;
}

export function AddAccountForm({
  id,
  defaultValues,
  disabled,
  onSubmit,
  onDelete,
}: AddAccountFormProps) {
  console.log({ defaultValues });
  const form = useForm<AddAccountFormValues>({
    resolver: zodResolver(addAccountFormSchema),
    defaultValues: {
      name: defaultValues?.name || "",
    },
  });
  const onFormSubmit = (data: AddAccountFormValues) => {
    onSubmit(data);
    form.reset();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={id}>Name</FormLabel>
              <FormControl>
                <Input
                  id={id}
                  placeholder="e.g. Checking, Savings, Credit Card"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled} type="submit">
          {id ? "Save Changes" : "Create Account"}
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
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
}
