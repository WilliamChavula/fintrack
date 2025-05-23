import { useForm, SubmitHandler, DefaultValues, Path } from "react-hook-form";
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

interface AddResourceFormProps<
  TFormData extends Record<string, string | number>,
> {
  resourceType: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  schemaValidator: ZodSchema;
  defaultValues?: DefaultValues<TFormData>;
  onSubmit: SubmitHandler<TFormData>;
  onDelete?: () => void;
}

export function AddResourceForm<
  TFormData extends Record<string, string | number>,
>({
  id,
  resourceType,
  placeholder,
  defaultValues,
  disabled,
  onSubmit,
  onDelete,
  schemaValidator,
}: AddResourceFormProps<TFormData>) {
  const form = useForm<TFormData>({
    resolver: zodResolver(schemaValidator),
    defaultValues,
  });
  const onFormSubmit = (data: TFormData) => {
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
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-2">
        {Object.keys(defaultValues || {}).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<TFormData>}
            render={({ field: { onChange, value, ...attrs } }) => (
              <FormItem>
                <FormLabel>{key}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    disabled={disabled}
                    value={
                      value instanceof Date
                        ? value.toISOString().split("T")[0]
                        : value
                    }
                    onChange={(e) => {
                      if (!Date.parse(e.target.value)) {
                        onChange(e);
                      } else {
                        onChange(new Date(e.target.value));
                      }
                    }}
                    {...attrs}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
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
