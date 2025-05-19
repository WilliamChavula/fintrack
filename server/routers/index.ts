import { mergeRouters } from "@/server/trpc";
import { accountsRouter } from "./accounts";
import { categoriesRouter } from "./categories";

export const appRouter = mergeRouters(accountsRouter, categoriesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
