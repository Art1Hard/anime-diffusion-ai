import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { Rating } from "@/utils/rating";
import { create } from "zustand";

type GenerationSettingsStore = {
	prompt: string;
	setPrompt: (v: string) => void;

	negativePrompt: string;
	setNegativePrompt: (v: string) => void;

	selectedModelPath: string;
	setSelectedModelPath: (v: string) => void;

	isDetailedFace: boolean;
	toggleDetailedFace: () => void;

	isHires: boolean;
	toggleHires: () => void;

	rating: Rating;
	setRating: (v: Rating) => void;

	seed: number;
	setSeed: (v: number) => void;

	orientation: "portrait" | "landscape" | "square";
	setOrientation: (o: "portrait" | "landscape" | "square") => void;
};

export const useGenerationSettingsStore = create<GenerationSettingsStore>(
	(set, get) => ({
		prompt: "",
		negativePrompt: "",
		selectedModelPath: MODEL_DEFAULT_PRESETS[0].path,
		isDetailedFace: false,
		isHires: false,

		rating: "explicit",

		seed: -1,

		orientation: "portrait",

		setPrompt: (prompt) => set({ prompt }),
		setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
		setSelectedModelPath: (selectedModelPath) => set({ selectedModelPath }),
		toggleDetailedFace: () => {
			const { isDetailedFace } = get();
			set({ isDetailedFace: !isDetailedFace });
		},
		toggleHires: () => {
			const { isHires } = get();
			set({ isHires: !isHires });
		},
		setRating: (rating) => set({ rating }),
		setSeed: (seed) => set({ seed }),
		setOrientation: (o) => set({ orientation: o }),
	}),
);
