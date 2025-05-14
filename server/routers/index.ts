import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.query(({ ctx }) => {
    const { userId } = ctx.auth;

    if (!userId) {
      return {
        greeting: "Hello! You are not signed in.",
      };
    }

    return {
      greeting: `Hello ${userId}!`,
    };
  }),
});

export type exampleRouter = typeof exampleRouter;
