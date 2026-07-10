// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/database/schema.ts",
	out: "./src/drizzle",
	dialect: "sqlite",
} satisfies Config;
