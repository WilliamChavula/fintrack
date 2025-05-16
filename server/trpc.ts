import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import { Context } from "./context";
import { formatZodError } from "./utils/zod-error-formatter";

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { error } = opts;
    switch (error.code) {
      case "INTERNAL_SERVER_ERROR":
        return {
          message: "Something went wrong",
        };
      case "UNAUTHORIZED":
        return {
          message: "You must be logged in to perform this action",
        };
      case "BAD_REQUEST":
        if (error.cause instanceof ZodError) {
          return {
            message: "Validation error",
            issues: formatZodError(error.cause),
          };
        }
        return {
          message: error.message,
        };
      default:
        return {
          message: error.message,
        };
    }
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const mergeRouters = t.mergeRouters;
