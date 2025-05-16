import { z } from "zod";

export const addAccountFormSchema = z.object({
  name: z.string().min(5, {
    message: "Name is required",
  }),
});

export type AddAccountFormValues = z.infer<typeof addAccountFormSchema>;
