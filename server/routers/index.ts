import { mergeRouters } from "@/server/trpc";
import { accountsRouter } from "./accounts";

export const appRouter = mergeRouters(accountsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
