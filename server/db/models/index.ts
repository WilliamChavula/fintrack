import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const accounts = pgTable(
  "accounts",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull(),
    plaidId: text("plaid_id"),
    name: text().notNull(),
  },
  (t) => [index("accounts_user_id_index").on(t.userId)],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull(),
    plaidId: text("plaid_id"),
    name: text().notNull(),
  },
  (t) => [index("categories_user_id_index").on(t.userId)],
);

export const transactions = pgTable(
  "transactions",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date", { mode: "date" }).notNull(),
    account: uuid("account")
      .references(() => accounts.id, { onDelete: "cascade" })
      .notNull(),
    category: uuid("category").references(() => categories.id, {
      onDelete: "set null",
    }),
  },
  (t) => [
    index("transactions_account_index").on(t.account),
    index("transactions_category_index").on(t.category),
  ],
);

// Relationships

export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions, {
    relationName: "account_transactions",
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  transaction: many(transactions, {
    relationName: "transaction_category",
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    relationName: "account_transactions",
    fields: [transactions.account],
    references: [accounts.id],
  }),
  category: one(categories, {
    relationName: "transaction_category",
    fields: [transactions.category],
    references: [categories.id],
  }),
}));
