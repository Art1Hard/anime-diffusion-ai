import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { ITxt2ImgPayload } from "@/types/model-presets";
import { create } from "zustand";

type GenerationStore = {
	prompt: string;
	negativePrompt: string;
	image: string | null;
	lastImageParams: ITxt2ImgPayload | null;
	selectedModelPath: string;

	previewImage: string | null;
	progress: number;

	setPrompt: (v: string) => void;
	setNegativePrompt: (v: string) => void;
	setImage: (v: string) => void;
	setLastImageParams: (v: ITxt2ImgPayload) => void;
	setSelectedModelPath: (model: string) => void;

	setPreviewImage: (v: string | null) => void;
	setProgress: (v: number) => void;
};

export const useGenerationStore = create<GenerationStore>((set) => ({
	prompt: "",
	negativePrompt: "",
	image: null,
	lastImageParams: null,
	selectedModelPath: MODEL_DEFAULT_PRESETS[0].path,

	previewImage: null,
	progress: 0,

	setPrompt: (prompt) => set({ prompt }),
	setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
	setImage: (image) => set({ image }),
	setLastImageParams: (params) => set({ lastImageParams: params }),
	setSelectedModelPath: (path) => set({ selectedModelPath: path }),

	setPreviewImage: (previewImage) => set({ previewImage }),
	setProgress: (progress) => set({ progress }),
}));
