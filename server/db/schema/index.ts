import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: uuid().primaryKey(),
  userId: uuid("user_id").notNull(),
  plaidId: text("plaid_id"),
  name: text().notNull(),
});
