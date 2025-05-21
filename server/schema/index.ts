import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { accounts, categories, transactions } from "../db/models";

export const insertAccountSchema = createInsertSchema(accounts).pick({
  name: true,
});

export const insertCategoriesSchema = createInsertSchema(categories).pick({
  name: true,
});

export const updateAccountSchema = createUpdateSchema(accounts).pick({
  name: true,
});

export const bulkDeleteResourceSchema = z.object({
  ids: z.array(z.string()),
});

export const pathParamsSchema = z.object({
  id: z.string({ message: "Account Id is required" }),
});

export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
}).omit({
  id: true,
});

export const insertManyTransactionsSchema = z.object({
  transactions: z.array(insertTransactionSchema),
});

export const updateTransactionSchema = createUpdateSchema(transactions, {
  date: z.coerce.date().optional(),
}).omit({
  id: true,
});

export const transactionsQueryParamsSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  accountId: z.string().optional(),
});
