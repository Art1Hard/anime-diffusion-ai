// galleryStore.ts
import { create } from "zustand";
import { db } from "@/database";
import { images as imagesTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import * as FileSystem from "expo-file-system";
import { IImageItem } from "@/types/model-presets";

type GalleryStore = {
	images: IImageItem[];
	isLoaded: boolean;
	loadImages: () => Promise<void>;
	addImage: (item: {
		uri: string;
		prompt?: string;
		negativePrompt?: string;
		seed?: number;
	}) => Promise<void>;
	removeImage: (id: number) => Promise<void>;
	clearGallery: () => Promise<void>;
};

export const useGalleryStore = create<GalleryStore>((set, get) => ({
	images: [],
	isLoaded: false,

	loadImages: async () => {
		const rows = await db
			.select()
			.from(imagesTable)
			.orderBy(desc(imagesTable.createdAt));
		set({ images: rows, isLoaded: true });
	},

	addImage: async ({ uri, prompt, negativePrompt, seed }) => {
		const [inserted] = await db
			.insert(imagesTable)
			.values({
				uri,
				prompt: prompt ?? "",
				negativePrompt: negativePrompt ?? "",
				seed: seed ?? null,
				createdAt: Date.now(),
			})
			.returning();

		set((state) => ({
			images: [inserted, ...state.images],
		}));
	},

	removeImage: async (id) => {
		const target = get().images.find((img) => img.id === id);
		if (target) {
			await FileSystem.deleteAsync(target.uri, { idempotent: true });
		}
		await db.delete(imagesTable).where(eq(imagesTable.id, id));

		set((state) => ({
			images: state.images.filter((img) => img.id !== id),
		}));
	},

	clearGallery: async () => {
		const all = get().images;
		await Promise.all(
			all.map((img) => FileSystem.deleteAsync(img.uri, { idempotent: true })),
		);
		await db.delete(imagesTable);
		set({ images: [] });
	},
}));
