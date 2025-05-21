import { z } from "zod";

export const addTransactionFormSchema = z.object({
  account: z.string().min(1, "Account is required"),
  category: z.string().min(1, "Category is required").optional(),
  amount: z.number({ message: "Amount is required" }),
  payee: z.string().min(2, "Payee is required"),
  notes: z.string().optional(),
  date: z.coerce.date(),
});

export type AddTransactionFormValues = z.infer<typeof addTransactionFormSchema>;
