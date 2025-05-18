import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { accounts } from "../db/models";

export const insertAccountSchema = createInsertSchema(accounts).pick({
  name: true,
});

export const bulkDeleteAccountSchema = z.object({
  ids: z.array(z.string()),
});
