import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { Rating } from "@/utils/rating";
import { create } from "zustand";

import { insertLoraIntoPrompt } from "@/utils/prompt";
import { IParsedLora } from "@/types/lora";

type GenerationSettingsStore = {
	prompt: string;
	negativePrompt: string;
	selectedModelPath: string;
	isDetailedFace: boolean;
	isHires: boolean;

	rating: Rating;

	seed: number;

	setPrompt: (v: string) => void;
	setNegativePrompt: (v: string) => void;
	setSelectedModelPath: (v: string) => void;
	toggleDetailedFace: () => void;
	toggleHires: () => void;
	setRating: (v: Rating) => void;
	setSeed: (v: number) => void;

	addLoraToPrompt: (lora: IParsedLora, weight?: number) => void;
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

		addLoraToPrompt: (lora, weight = 1) => {
			const currentPrompt = get().prompt;
			set({ prompt: insertLoraIntoPrompt(currentPrompt, lora, weight) });
		},
	}),
);
