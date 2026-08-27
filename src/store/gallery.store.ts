// galleryStore.ts
import { create } from "zustand";
import { db } from "@/database";
import { images as imagesTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import * as FileSystem from "expo-file-system";
import { IImageItem } from "@/types/model-presets";
import requestLibraryPermissionAsync from "@/utils/request-library-permission";
import { Alert } from "react-native";
import { saveImageToGallery } from "@/utils/image-process";

type GalleryStore = {
	images: IImageItem[];
	isLoaded: boolean;

	selectedImageIds: Set<number>;
	enabledSelectionMode: boolean;

	scrollToTopTrigger: number;

	loadImages: () => Promise<void>;
	addImage: (item: {
		uri: string;
		prompt?: string;
		negativePrompt?: string;
		seed?: number;
	}) => Promise<void>;
	removeImage: (id: number) => Promise<void>;
	removeImages: (ids: Set<number>) => Promise<void>;
	clearGallery: () => Promise<void>;

	toggleSelectedStateImage: (id: number) => void;
	enableSelectionMode: () => void;
	disableSelectionMode: () => void;

	saveImages: (ids: Set<number>) => Promise<void>;

	triggerScrollToTop: () => void;
};

export const useGalleryStore = create<GalleryStore>((set, get) => ({
	images: [],
	isLoaded: false,

	selectedImageIds: new Set(),
	enabledSelectionMode: false,

	scrollToTopTrigger: 0,

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

	removeImages: async (ids) => {
		const targetImages = get().images.filter((img) => ids.has(img.id));

		await Promise.all(
			targetImages.map(async (image) => {
				await FileSystem.deleteAsync(image.uri, { idempotent: true });
				await db.delete(imagesTable).where(eq(imagesTable.id, image.id));
			}),
		);

		set((state) => ({
			images: state.images.filter((img) => !ids.has(img.id)),
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

	toggleSelectedStateImage: (id) => {
		const { enabledSelectionMode, enableSelectionMode, disableSelectionMode } =
			get();
		const next = new Set(get().selectedImageIds);
		if (next.has(id)) next.delete(id);
		else next.add(id);

		if (next.size <= 0) disableSelectionMode();
		else {
			if (!enabledSelectionMode) enableSelectionMode();
		}

		set({ selectedImageIds: next });
	},
	enableSelectionMode: () => set({ enabledSelectionMode: true }),
	disableSelectionMode: () =>
		set({ enabledSelectionMode: false, selectedImageIds: new Set() }),

	saveImages: async (ids) => {
		console.log(ids.size);
		const hasPermission = await requestLibraryPermissionAsync();
		if (!hasPermission) {
			return;
		}

		const selectedImages = get().images.filter((img) => ids.has(img.id));
		console.log(selectedImages.length);

		if (selectedImages.length === 0) return;

		let saved = 0;
		let failed = 0;

		// Сохраняем последовательно (параллельно может глючить на iOS)
		for (const image of selectedImages) {
			const success = await saveImageToGallery(image.uri);
			if (success) saved++;
			else failed++;
		}

		// Результат
		if (failed === 0) {
			Alert.alert("Готово", `Сохранено ${saved} изображений`);
		} else {
			Alert.alert("Частично сохранено", `Успешно: ${saved}, Ошибок: ${failed}`);
		}

		get().disableSelectionMode();
	},

	triggerScrollToTop: () =>
		set((s) => ({ scrollToTopTrigger: s.scrollToTopTrigger + 1 })),
}));
