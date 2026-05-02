import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { ITxt2ImgPayload } from "@/types/model-presets";
import { create } from "zustand";

type GenerationStore = {
	prompt: string;
	negativePrompt: string;
	image: string | null;
	lastImageParams: ITxt2ImgPayload | null;
	selectedModelPath: string;

	setPrompt: (v: string) => void;
	setNegativePrompt: (v: string) => void;
	setImage: (v: string) => void;
	setLastImageParams: (v: ITxt2ImgPayload) => void;
	setSelectedModelPath: (model: string) => void;
};

export const useGenerationStore = create<GenerationStore>((set) => ({
	prompt: "",
	negativePrompt: "",
	image: null,
	lastImageParams: null,
	selectedModelPath: MODEL_DEFAULT_PRESETS[0].path,

	setPrompt: (prompt) => set({ prompt }),
	setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
	setImage: (image) => set({ image }),
	setLastImageParams: (params) => set({ lastImageParams: params }),
	setSelectedModelPath: (path) => set({ selectedModelPath: path }),
}));
