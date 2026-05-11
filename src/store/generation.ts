import { generateImage } from "@/api/generate";
import sdApi from "@/api/interceptors";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import {
	IImageInfo,
	IProgressResponse,
	ITxt2ImgPayload,
} from "@/types/model-presets";
import { convertBase64ToFile } from "@/utils/image-process";
import { create } from "zustand";

type GenerationStore = {
	prompt: string;
	negativePrompt: string;
	image: string | null;
	lastImageParams: ITxt2ImgPayload | null;
	lastImageInfo: IImageInfo | null;

	selectedModelPath: string;

	previewImage: string | null;
	progress: number;

	isLoading: boolean;
	isPolling: boolean;

	intervalId: ReturnType<typeof setInterval> | null;

	setPrompt: (v: string) => void;
	setNegativePrompt: (v: string) => void;
	setImage: (v: string) => void;
	setLastImageParams: (v: ITxt2ImgPayload) => void;
	setLastImageInfo: (v: IImageInfo) => void;

	setSelectedModelPath: (model: string) => void;

	setPreviewImage: (v: string | null) => void;
	setProgress: (v: number) => void;

	startPolling: () => void;
	stopPolling: () => void;

	generate: (isHires?: boolean) => Promise<void>;
};

export const useGenerationStore = create<GenerationStore>((set, get) => ({
	prompt: "",
	negativePrompt: "",
	image: null,
	lastImageParams: null,
	lastImageInfo: null,
	selectedModelPath: MODEL_DEFAULT_PRESETS[0].path,

	isLoading: false,
	isPolling: false,

	intervalId: null,

	previewImage: null,
	progress: 0,

	setPrompt: (prompt) => set({ prompt }),
	setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
	setImage: (image) => set({ image }),
	setLastImageParams: (params) => set({ lastImageParams: params }),
	setLastImageInfo: (info) => set({ lastImageInfo: info }),
	setSelectedModelPath: (path) => set({ selectedModelPath: path }),

	setPreviewImage: (previewImage) => set({ previewImage }),
	setProgress: (progress) => set({ progress }),

	startPolling: () => {
		const { intervalId } = get();

		if (intervalId) clearInterval(intervalId);

		set({ isPolling: true, progress: 0, previewImage: null });

		let last = 0;
		let lastPreview: string | null = null;

		const id = setInterval(async () => {
			try {
				const res = await sdApi.get<IProgressResponse>("/progress");
				const data = res.data;

				last = Math.max(last, data.progress);

				console.log(data.currentImage ? true : false);

				if (data.currentImage) lastPreview = data.currentImage;

				set({
					progress: last,
					previewImage: lastPreview,
				});

				if (data.state?.jobCount === 0) {
					get().stopPolling();
				}
			} catch {
				get().stopPolling();
			}
		}, 700);

		set({ intervalId: id });
	},
	stopPolling: () => {
		const { intervalId } = get();

		if (intervalId) {
			clearInterval(intervalId);
		}

		set({
			intervalId: null,
			isPolling: false,
		});
	},

	generate: async (isHires = false) => {
		const {
			prompt,
			negativePrompt,
			selectedModelPath,
			lastImageParams,
			lastImageInfo,
			setImage,
			setLastImageParams,
			setLastImageInfo,
			startPolling,
			stopPolling,
		} = get();

		const modelPreset = MODEL_DEFAULT_PRESETS.find(
			(mp) => mp.path === selectedModelPath,
		);

		if (!modelPreset) return;

		let body: ITxt2ImgPayload = {
			prompt: modelPreset.params.basePrompt + prompt,
			negativePrompt: negativePrompt + modelPreset.params.baseNegativePrompt,
			overrideSettings: {
				sdModelCheckpoint: modelPreset.path,
			},
			...modelPreset.params,
		};

		if (isHires && lastImageParams && lastImageInfo) {
			body = {
				...lastImageParams,
				enableHr: isHires,
				hrAdditionalModules: [],
				seed: lastImageInfo.seed,
			};
		}

		set({ isLoading: true });

		startPolling();

		try {
			const data = await generateImage(body);

			stopPolling();

			const path = await convertBase64ToFile(data.images[0]);

			setImage(path);

			setLastImageInfo(JSON.parse(data.info));

			setLastImageParams(data.parameters);
		} catch (e) {
			console.log(e);
			stopPolling();
		} finally {
			set({ isLoading: false });
		}
	},
}));
