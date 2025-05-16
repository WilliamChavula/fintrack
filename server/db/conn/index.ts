import { drizzle } from "drizzle-orm/neon-http";
import environment from "@/config/environment";

const db = drizzle(environment.DATABASE_URL);

const result = await db.execute("select 1");
