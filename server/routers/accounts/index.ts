import { eq } from "drizzle-orm";

import { accounts } from "@/server/db/schema";
import { protectedProcedure, router } from "@/server/trpc";

export const accountsRouter = router({
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const records = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, ctx.auth.userId));
    return { accounts: records };
  }),
});
