import { eq } from "drizzle-orm";

import { accounts } from "@/server/db/models";
import { protectedProcedure, router } from "@/server/trpc";
import { insertAccountSchema } from "@/server/schema";

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
});
