import { create } from "zustand";

type ImageItem = {
	id: string;
	uri: string;
	createdAt: number;
};

type GalleryStore = {
	images: ImageItem[];

	addImage: (uri: string) => void;
	removeImage: (id: string) => void;
	clearGallery: () => void;
};

export const useGalleryStore = create<GalleryStore>((set) => ({
	images: [],

	addImage: (uri) =>
		set((state) => ({
			images: [
				{
					id: Date.now().toString(),
					uri,
					createdAt: Date.now(),
				},
				...state.images,
			],
		})),

	removeImage: (id) =>
		set((state) => ({
			images: state.images.filter((img) => img.id !== id),
		})),

	clearGallery: () => set({ images: [] }),
}));
