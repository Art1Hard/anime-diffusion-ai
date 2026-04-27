import { MODEL_PRESETS } from "@/constants/model-presets";
import { create } from "zustand";

type GenerationSettingsStore = {
	selectedModel: string;
	setSelectedModel: (model: string) => void;
};

export const useGenerationSettingsStore = create<GenerationSettingsStore>(
	(set) => ({
		selectedModel: MODEL_PRESETS[0].path,
		setSelectedModel: (model) => set({ selectedModel: model }),
	}),
);
