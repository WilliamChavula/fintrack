import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db/conn";

export const createContext = async () => {
  return { auth: await auth(), db };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
