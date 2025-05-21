import { and, desc, eq, gte, inArray, lte } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { parse, subDays } from "date-fns";

import { protectedProcedure, router } from "@/server/trpc";
import { accounts, categories, transactions } from "@/server/db/models";
import {
  bulkDeleteResourceSchema,
  insertTransactionSchema,
  pathParamsSchema,
  transactionsQueryParamsSchema,
  updateTransactionSchema,
} from "@/server/schema";

export const transactionsRouter = router({
  getTransactions: protectedProcedure
    .input(transactionsQueryParamsSchema)
    .query(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { from, to, accountId } = input;

      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);
      const startDate = from
        ? parse(from, "yyyy-MM-dd", new Date())
        : defaultFrom;

      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const records = await db
        .select({
          id: transactions.id,
          amount: transactions.amount,
          payee: transactions.payee,
          notes: transactions.notes,
          date: transactions.date,
          accountId: transactions.account,
          account: accounts.name,
          categoryId: transactions.category,
          category: categories.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.account, accounts.id))
        .leftJoin(categories, eq(transactions.category, categories.id))
        .where(
          and(
            accountId ? eq(transactions.account, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate),
          ),
        )
        .orderBy(desc(transactions.date));

      return { transactions: records };
    }),

  getTransaction: protectedProcedure
    .input(pathParamsSchema)
    .query(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const record = await db.query.transactions.findFirst({
        columns: {
          id: true,
          amount: true,
          payee: true,
          notes: true,
          date: true,
          account: true,
          category: true,
        },
        where: and(
          eq(transactions.id, input.id),
          eq(accounts.userId, auth.userId),
        ),
      });
      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Transaction with id ${input.id} not found`,
        });
      }
      return { transaction: record };
    }),

  addTransaction: protectedProcedure
    .input(insertTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [record] = await db
        .insert(transactions)
        .values({
          ...input,
        })
        .returning({
          id: transactions.id,
          amount: transactions.amount,
          payee: transactions.payee,
          notes: transactions.notes,
          date: transactions.date,
          account: transactions.account,
          category: transactions.category,
        });

      return { category: record };
    }),

  updateTransaction: protectedProcedure
    .input(pathParamsSchema)
    .input(updateTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const [record] = await db
        .update(transactions)
        .set({ ...input })
        .where(eq(transactions.id, input.id))
        .from(accounts)
        .innerJoin(accounts, eq(transactions.account, accounts.id))
        .where(eq(accounts.userId, auth.userId))
        .returning();

      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Transaction with id ${input.id} not found`,
        });
      }
      return { transaction: record };
    }),

  deleteTransaction: protectedProcedure
    .input(pathParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const record = await db
        .delete(transactions)
        .where(
          and(
            eq(transactions.id, input.id),
            inArray(
              transactions.account,
              db
                .select({ id: accounts.id })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId)),
            ),
          ),
        )
        .returning({ id: transactions.id });

      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Transaction with id ${input.id} not found`,
        });
      }
      return { transaction: record };
    }),

  bulkDeleteCategories: protectedProcedure
    .input(bulkDeleteResourceSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { ids } = input;

      const matchingRecords = db.$with("matchingRecords").as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.account, accounts.id))
          .where(
            and(
              eq(accounts.userId, auth.userId),
              inArray(transactions.id, ids),
            ),
          ),
      );

      const records = await db
        .with(matchingRecords)
        .delete(transactions)
        .where(
          inArray(
            transactions.id,
            db.select({ id: matchingRecords.id }).from(matchingRecords),
          ),
        )
        .returning({ id: transactions.id });

      return { transactions: records };
    }),
});
