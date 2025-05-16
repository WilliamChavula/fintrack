import { createInsertSchema } from "drizzle-zod";
import { accounts } from "../db/models";

export const insertAccountSchema = createInsertSchema(accounts).pick({
  name: true,
});
