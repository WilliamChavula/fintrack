import { z } from "zod";

export const isValidUuid = (id: unknown): id is string =>
  z.string().uuid().safeParse(id).success;
