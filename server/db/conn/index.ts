import { drizzle } from "drizzle-orm/neon-http";
import environment from "@/config/environment";
import * as schema from "../schema";

export const db = drizzle(environment.DATABASE_URL, { schema });
