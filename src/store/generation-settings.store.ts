import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { Rating } from "@/utils/rating";
import { create } from "zustand";

type GenerationSettingsStore = {
	prompt: string;
	negativePrompt: string;
	selectedModelPath: string;

	rating: Rating;

	seed: number;

	setPrompt: (v: string) => void;
	setNegativePrompt: (v: string) => void;
	setSelectedModelPath: (v: string) => void;
	setRating: (v: Rating) => void;
	setSeed: (v: number) => void;
};

export const useGenerationSettingsStore = create<GenerationSettingsStore>(
	(set) => ({
		prompt: "",
		negativePrompt: "",
		selectedModelPath: MODEL_DEFAULT_PRESETS[0].path,

		rating: "general",

		seed: -1,

		setPrompt: (prompt) => set({ prompt }),
		setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
		setSelectedModelPath: (selectedModelPath) => set({ selectedModelPath }),
		setRating: (rating) => set({ rating }),
		setSeed: (seed) => set({ seed }),
	}),
);
