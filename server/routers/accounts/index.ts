import { accounts } from "@/server/db/schema";
import { publicProcedure, router } from "@/server/trpc";

export const accountsRouter = router({
  getAccounts: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const records = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);
    return { accounts: records };
  }),
});
