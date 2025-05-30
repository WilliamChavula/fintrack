import { defineConfig } from "drizzle-kit";
import environment from "@/config/environment";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/models",
  out: "./drizzle",
  dbCredentials: {
    url: environment.DATABASE_URL,
  },
});
