import { mergeRouters } from "@/server/trpc";
import { accountsRouter } from "./accounts";
import { categoriesRouter } from "./categories";
import { transactionsRouter } from "./transactions";
import { SummaryRouter } from "./summary";

export const appRouter = mergeRouters(
  accountsRouter,
  categoriesRouter,
  transactionsRouter,
  SummaryRouter,
);

// export type definition of API
export type AppRouter = typeof appRouter;
