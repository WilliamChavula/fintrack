import { and, eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { protectedProcedure, router } from "@/server/trpc";
import { categories } from "@/server/db/models";
import {
  bulkDeleteAccountSchema,
  insertCategoriesSchema,
  pathParamsSchema,
} from "@/server/schema";

export const categoriesRouter = router({
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const { db, auth } = ctx;

    const records = await db.query.categories.findMany({
      where: eq(categories.userId, auth.userId),
      columns: {
        id: true,
        name: true,
      },
    });

    return { categories: records };
  }),

  getCategory: protectedProcedure
    .input(pathParamsSchema)
    .query(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const record = await db.query.categories.findFirst({
        where: and(
          eq(categories.userId, auth.userId),
          eq(categories.id, input.id),
        ),
        columns: {
          id: true,
          name: true,
        },
      });
      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Category with id ${input.id} not found`,
        });
      }
      return { category: record };
    }),

  addCategory: protectedProcedure
    .input(insertCategoriesSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const [record] = await db
        .insert(categories)
        .values({
          userId: auth.userId,
          ...input,
        })
        .returning({
          id: categories.id,
          name: categories.name,
        });

      return { category: record };
    }),

  updateCategory: protectedProcedure
    .input(pathParamsSchema)
    .input(insertCategoriesSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const [record] = await db
        .update(categories)
        .set({
          name: input.name,
        })
        .where(
          and(eq(categories.userId, auth.userId), eq(categories.id, input.id)),
        )
        .returning({
          id: categories.id,
          name: categories.name,
        });

      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Category with id ${input.id} not found`,
        });
      }
      return { category: record };
    }),

  deleteCategory: protectedProcedure
    .input(pathParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;

      const record = await db
        .delete(categories)
        .where(
          and(eq(categories.userId, auth.userId), eq(categories.id, input.id)),
        )
        .returning({
          id: categories.id,
        });

      if (!record) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Category with id ${input.id} not found`,
        });
      }
      return { category: record };
    }),

  bulkDeleteAccount: protectedProcedure
    .input(bulkDeleteAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { ids } = input;

      const records = await db
        .delete(categories)
        .where(
          and(eq(categories.userId, auth.userId), inArray(categories.id, ids)),
        )
        .returning({ id: categories.id });

      return { categories: records };
    }),
});
