import { and, eq, inArray } from "drizzle-orm";

import { accounts } from "@/server/db/models";
import { protectedProcedure, router } from "@/server/trpc";
import {
  bulkDeleteAccountSchema,
  insertAccountSchema,
  pathParamsSchema,
  updateAccountSchema,
} from "@/server/schema";
import { TRPCError } from "@trpc/server";

export const accountsRouter = router({
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    const { db, auth } = ctx;
    const records = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return { accounts: records };
  }),

  getAccount: protectedProcedure
    .input(pathParamsSchema)
    .query(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const [record] = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(
          and(eq(accounts.userId, auth.userId), eq(accounts.id, input.id)),
        );

      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Account with id ${input.id} not found`,
        });
      }

      return { account: record };
    }),

  addAccount: protectedProcedure
    .input(insertAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const [record] = await db
        .insert(accounts)
        .values({
          userId: auth.userId,
          ...input,
        })
        .returning();

      return { account: record };
    }),

  updateAccount: protectedProcedure
    .input(pathParamsSchema)
    .input(updateAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { id, name } = input;
      const [record] = await db
        .update(accounts)
        .set({ name })
        .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
        .returning({
          id: accounts.id,
          name: accounts.name,
        });

      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Account with id ${id} not found`,
        });
      }
      return { account: record };
    }),

  bulkDeleteAccount: protectedProcedure
    .input(bulkDeleteAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { ids } = input;

      const records = await db
        .delete(accounts)
        .where(and(eq(accounts.userId, auth.userId), inArray(accounts.id, ids)))
        .returning({ id: accounts.id });

      return { accounts: records };
    }),
});
