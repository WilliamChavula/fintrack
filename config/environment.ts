import { z } from "zod";
import "dotenv/config";

const environmentSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
});

const environment = environmentSchema.parse(process.env);

export default environment;
