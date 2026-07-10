// src/database/index.ts
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "./schema";
import { runMigrations } from "./migrate";

const sqlite = SQLite.openDatabaseSync("gallery.db");
export const db = drizzle(sqlite, { schema });

export async function initDatabase() {
	await runMigrations(sqlite);
}
