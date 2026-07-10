// src/database/migrate.ts
import * as SQLite from "expo-sqlite";

const MIGRATIONS: string[] = [
	// версия 1
	`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uri TEXT NOT NULL,
    prompt TEXT,
    negative_prompt TEXT,
    seed INTEGER,
    created_at INTEGER NOT NULL
  );`,
	// версия 2 — пример на будущее, когда решишь добавить hiresFix
	// `ALTER TABLE images ADD COLUMN hires_fix INTEGER DEFAULT 0;`,
];

export async function runMigrations(db: SQLite.SQLiteDatabase) {
	const result = await db.getFirstAsync<{ user_version: number }>(
		"PRAGMA user_version;",
	);
	let currentVersion = result?.user_version ?? 0;

	for (let i = currentVersion; i < MIGRATIONS.length; i++) {
		await db.execAsync(MIGRATIONS[i]);
		currentVersion = i + 1;
		await db.execAsync(`PRAGMA user_version = ${currentVersion};`);
	}
}
