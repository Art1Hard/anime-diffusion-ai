import { create } from "zustand";

type GenerationStore = {
	image: string | null;

	setImage: (v: string) => void;
};

export const useGenerationStore = create<GenerationStore>((set) => ({
	image: null,

	setImage: (image) => set({ image }),
}));
