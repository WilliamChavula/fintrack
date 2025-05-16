import { mergeRouters } from "@/server/trpc";
import { accountsRouter } from "./accounts";
import { postsRouter } from "./posts";

export const appRouter = mergeRouters(postsRouter, accountsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
