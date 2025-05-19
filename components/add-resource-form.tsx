import { useForm } from "react-hook-form";
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
import { ZodSchema } from "zod";

interface AddResourceFormProps {
  resourceType: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  schemaValidator: ZodSchema;
  defaultValues?: { name: string };
  onSubmit: (data: { name: string }) => void;
  onDelete?: () => void;
}

export function AddResourceForm({
  id,
  resourceType,
  placeholder,
  defaultValues,
  disabled,
  onSubmit,
  onDelete,
  schemaValidator,
}: AddResourceFormProps) {
  const form = useForm<{ name: string }>({
    resolver: zodResolver(schemaValidator),
    defaultValues: {
      name: defaultValues?.name || "",
    },
  });
  const onFormSubmit = (data: { name: string }) => {
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
                  placeholder={placeholder || ""}
                  disabled={disabled}
                  {...field}
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
