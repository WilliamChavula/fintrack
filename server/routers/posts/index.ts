import { router, publicProcedure } from "../../trpc";

export const postsRouter = router({
  hello: publicProcedure.query(({ ctx }) => {
    const { userId } = ctx.auth;

    if (!userId) {
      return {
        greeting: "Hello! You are not signed in.",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      greeting: `Hello ${userId}!`,
    };
  }),
});
