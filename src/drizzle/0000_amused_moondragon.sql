CREATE TABLE `images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uri` text NOT NULL,
	`prompt` text,
	`negative_prompt` text,
	`seed` integer,
	`created_at` integer NOT NULL
);
