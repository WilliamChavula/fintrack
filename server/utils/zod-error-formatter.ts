import { ZodError } from "zod";

export const formatZodError = (
  error: ZodError,
): { field: string; message: string }[] => {
  return error.errors.map((err) => ({
    field: err.path.join(".") || "unknown",
    message: err.message,
  }));
};
