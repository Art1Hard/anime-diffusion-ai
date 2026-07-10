// schema.ts
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const images = sqliteTable("images", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uri: text("uri").notNull(),
	prompt: text("prompt"),
	negativePrompt: text("negative_prompt"),
	seed: integer("seed"),
	createdAt: integer("created_at").notNull(),
});
