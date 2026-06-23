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
import { useGenerationSettingsStore } from "@/store/generation-settings.store";
import { getRatingPrompts } from "@/utils/rating";
import { buildPrompt } from "@/utils/prompt";

type GenerationStore = {
	image: string | null;
	lastImageParams: ITxt2ImgPayload | null;
	lastImageInfo: IImageInfo | null;

	previewImage: string | null;
	progress: number;

	isLoading: boolean;
	isPolling: boolean;

	intervalId: ReturnType<typeof setInterval> | null;

	startPolling: () => void;
	stopPolling: () => void;

	generate: (isHires?: boolean) => Promise<void>;
	interrupt: () => Promise<void>;
};

export const useGenerationStore = create<GenerationStore>((set, get) => ({
	image: null,
	lastImageParams: null,
	lastImageInfo: null,

	isLoading: false,
	isPolling: false,

	intervalId: null,

	previewImage: null,
	progress: 0,

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
		const settings = useGenerationSettingsStore.getState();

		const {
			prompt,
			negativePrompt,
			selectedModelPath,
			rating,
			seed,
			isDetailedFace,
		} = settings;

		const { lastImageParams, lastImageInfo, startPolling, stopPolling } = get();

		const modelPreset = MODEL_DEFAULT_PRESETS.find(
			(mp) => mp.path === selectedModelPath,
		);

		if (!modelPreset) return;

		const rp = getRatingPrompts(rating);

		let body: ITxt2ImgPayload = {
			prompt: buildPrompt({
				ratingPrompt: rp.positive,
				prompt,
				basePrompt: modelPreset.params.basePrompt,
			}),
			negativePrompt: buildPrompt({
				ratingPrompt: rp.negative,
				prompt: negativePrompt,
				basePrompt: modelPreset.params.baseNegativePrompt,
			}),
			seed,
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

		if (isDetailedFace) {
			const adetailer = {
				alwaysonScripts: {
					ADetailer: {
						args: [
							true,
							{
								ad_model: "face_yolov8s.pt",
								ad_prompt: "",
								ad_negative_prompt: "",
								ad_confidence: 0.3,
								ad_denoising_strength: 0.4,
								ad_inpaint_only_masked: true,
								ad_inpaint_only_masked_padding: 32,
							},
						],
					},
				},
			};
			body = {
				...body,
				...adetailer,
			};
		} else {
			delete body.alwaysonScripts;
		}

		set({ isLoading: true });

		startPolling();

		try {
			const data = await generateImage(body);

			stopPolling();

			const path = await convertBase64ToFile(data.images[0]);

			set({
				image: path,
				lastImageInfo: JSON.parse(data.info),
				lastImageParams: data.parameters,
			});
		} catch (e) {
			console.log(e);
			stopPolling();
		} finally {
			set({ isLoading: false });
		}
	},

	interrupt: async () => {
		try {
			await sdApi.post("/interrupt");
		} finally {
		}
	},
}));
