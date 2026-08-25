import { IModelPreset } from "@/types/model-presets";

function createPreset(preset: IModelPreset): IModelPreset {
	return {
		...preset,
		params: {
			...preset.params,
			overrideSettings: {
				...preset.params.overrideSettings,
				sdModelCheckpoint: preset.path,
			},
		},
	};
}

export const MODEL_DEFAULT_PRESETS: IModelPreset[] = [
	createPreset({
		name: "WAI Illustrious XL v16.0",
		type: "XL",
		description:
			"Универсальная аниме-модель на базе SDXL. Даёт чистый стиль, стабильное качество и хорошо работает с персонажами, пейзажами и иллюстрациями.",
		path: "waiIllustriousSDXL_v16",
		hash: "a5f58eb1c3",
		params: {
			basePrompt: "masterpiece,best quality,amazing quality,",
			baseNegativePrompt:
				"bad quality,worst quality,worst detail,sketch,censor, easynegative",
			steps: 24,
			cfgScale: 6,
			distilledCfgScale: null,
			clipSkip: 2,
			width: 896,
			height: 1152,
			samplerName: "Euler a",
			scheduler: "Automatic",
			hrUpscaler: "4x-AnimeSharp",
			hrScale: 1.7,
			hrDistilledCfg: null,
			hrSecondPassSteps: 12,
			hrCfg: 5,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\crystalVAESDXL_vaeV3.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "WAI Illustrious XL v17.0",
		type: "XL",
		description:
			"Обновлённая версия WAI Illustrious. Улучшенная детализация, повышенное базовое разрешение (1024×1344), более выразительный результат.",
		path: "waiIllustriousSDXL_v170",
		hash: "f116b0c78f",
		params: {
			basePrompt: "masterpiece,best quality,amazing quality,",
			baseNegativePrompt:
				"bad quality,worst quality,worst detail,sketch,censor,",
			steps: 30,
			cfgScale: 7,
			clipSkip: 2,
			width: 1024,
			height: 1344,
			samplerName: "Euler a",
			hrUpscaler: "4x-AnimeSharp",
			hrScale: 1.7,
			hrSecondPassSteps: 12,
			hrCfg: 7,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\crystalVAESDXL_vaeV3.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "JANIMA v1.0",
		type: "ANIMA",
		description:
			"Сбалансированная аниме-модель семейства ANIMA. Хорошая детализация, стабильная анатомия, подходит для разнообразных сцен.",
		path: "JANIMA_v10",
		hash: "38694ed21a",
		params: {
			basePrompt:
				"masterpiece, highres, absurdres, newest, best quality, score_7",
			baseNegativePrompt:
				"worst quality, low quality, lowres, score_1, score_2, score_3, blurry, jpeg artifacts, , long fingers, sepia, bad anatomy, missing fingers, watermark, artist name",
			steps: 24,
			cfgScale: 5,
			width: 832,
			height: 1216,
			samplerName: "ER SDE",
			scheduler: "Simple",
			hrUpscaler: "RealESRGAN_x4plus_anime_6B",
			hrScale: 1.5,
			hrSecondPassSteps: 16,
			hrCfg: 5,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\qwen_image_vae.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\anima_baseV10_txt.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "WAI ANIMA v1.0",
		type: "ANIMA",
		description:
			"Первая версия в линейке аниме-моделей на базе Base 1.0. Даёт чистый аниме-стиль с хорошей детализацией персонажей и стабильной композицией. Работает с score-тегами качества.",
		path: "waiANIMA_v10Base10",
		hash: "9d5a1e1393",
		params: {
			basePrompt: "masterpiece, best quality,score_7,",
			baseNegativePrompt:
				"worst quality, low quality, score_1, score_2, score_3, artist name,blurry, jpeg artifacts, lowres,censor",
			steps: 24,
			cfgScale: 5,
			width: 832,
			height: 1216,
			samplerName: "Euler a",
			scheduler: "Normal",
			hrUpscaler: "RealESRGAN_x4plus_anime_6B",
			hrScale: 1.5,
			hrSecondPassSteps: 16,
			denoisingStrength: 0.35,
			hrCfg: 5,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\qwen_image_vae.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\anima_baseV10_txt.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "Kreamania v4.0",
		type: "ZIT",
		description:
			"Фотореалистичная модель с нейтральной естественной цветовой палитрой. Ориентирована на реалистичные портреты, естественную кожу и мягкое освещение. Версия 4 заточена под фотореализм.",
		path: "kreamania_variant4",
		hash: "312f5ab87e",
		params: {
			basePrompt: "",
			baseNegativePrompt: "",
			steps: 8,
			cfgScale: 1,
			width: 1008,
			height: 1352,
			samplerName: "ER SDE",
			scheduler: "Simple",
			hrUpscaler: "None",
			hrScale: 1.5,
			hrSecondPassSteps: 4,
			hrCfg: 1,
			denoisingStrength: 0.2,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\qwen_image_vae.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\qwen3vl_4b_fp8_scaled.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "Hoseki LustrousMix",
		type: "ANIMA",
		description:
			"Яркая аниме-модель с акцентом на насыщенность цветов и блики. Использует LoRA для цветофикса и детализации фона.",
		path: "hosekiLustrousmixAnima_animaV10",
		hash: "19147601cf",
		params: {
			basePrompt:
				"<lora:anima-rl-v0.1:1> <lora:Anima_colorfix_v1_by_Volnovik:1> <lora:background_detailer_v1:0.5> masterpiece, best quality",
			baseNegativePrompt:
				"worst quality, low quality, bad anatomy, jpeg artifacts, signature, sepia, fewer digits, extra digits, bad hands, bad anatomy, watermark, censored, score_1, score_2, score_3",
			steps: 28,
			cfgScale: 5,
			width: 832,
			height: 1216,
			samplerName: "Euler a",
			scheduler: "Beta",
			hrUpscaler: "RealESRGAN_x4plus_anime_6B",
			hrScale: 1.5,
			hrSecondPassSteps: 14,
			hrCfg: 5,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\qwen_image_vae.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\anima_baseV10_txt.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "Anima Turbo v1.0",
		type: "ANIMA",
		description:
			"Ультрабыстрая аниме-модель — всего 10 шагов. Сохраняет приемлемое качество при минимальном времени рендера.",
		path: "anima_turboV10",
		hash: "c0b9050345",
		params: {
			basePrompt: "masterpiece, best quality, score_7",
			baseNegativePrompt:
				"worst quality, low quality, score_1, score_2, score_3, artist name, blurry, jpeg artifacts, chromatic aberration",
			steps: 10,
			cfgScale: 1,
			width: 832,
			height: 1216,
			samplerName: "ER SDE",
			scheduler: "Simple",
			hrUpscaler: "4x-AnimeSharp",
			hrScale: 1.5,
			hrSecondPassSteps: 8,
			hrCfg: 1,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\qwen_image_vae.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\anima_baseV10_txt.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "Anima Turbo v1.1",
		type: "ANIMA",
		description:
			"Ультрабыстрая аниме-модель — всего 10 шагов. Сохраняет приемлемое качество при минимальном времени рендера.",
		path: "anima_turboV11",
		hash: "fba1195327",
		params: {
			basePrompt: "masterpiece, best quality",
			baseNegativePrompt:
				"worst quality, low quality, artist name, blurry, jpeg artifacts, chromatic aberration",
			steps: 10,
			cfgScale: 1,
			width: 832,
			height: 1216,
			samplerName: "Euler",
			scheduler: "Simple",
			hrUpscaler: "RealESRGAN_x4plus_anime_6B",
			hrScale: 1.5,
			hrSecondPassSteps: 8,
			hrCfg: 1,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\qwen_image_vae.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\anima_baseV10_txt.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "RedCraft ZIT INT8",
		type: "ZIT",
		description:
			"Компактная ZIT-модель в INT8-квантовании. Очень быстрая генерация, минимальное потребление VRAM, подходит для слабых систем.",
		path: "redcraft22INT8Convrot_redzit15AIO",
		hash: "a84e746874",
		params: {
			basePrompt: "",
			baseNegativePrompt: "",
			steps: 8,
			cfgScale: 1,
			width: 1024,
			height: 1344,
			samplerName: "Euler",
			scheduler: "Simple",
			hrUpscaler: "4x-UltraSharp",
			hrScale: 1.5,
			hrSecondPassSteps: 6,
			hrCfg: 1,
			denoisingStrength: 0.3,
			overrideSettings: {
				forgeAdditionalModules: [
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\VAE\\flux1AE_v10.safetensors",
					"N:\\SDForgeNeo\\sd-webui-forge-neo\\models\\text_encoder\\qwen3_4b.safetensors",
				],
			},
		},
	}),

	createPreset({
		name: "CyberRealistic Pony v1.80 Coreshift",
		type: "XL",
		description:
			"Фотореалистичная модель на базе Pony Diffusion. Coreshift-версия оптимизирована для стабильности, чистой анатомии и высокой детализации портретов.",
		path: "cyberrealisticPony_v180Coreshift",
		hash: "1d580c1c3f",
		params: {
			basePrompt: "score_9, score_8_up, score_7_up,",
			baseNegativePrompt:
				"score_6, score_5, score_4, (worst quality:1.2), (low quality:1.2), (normal quality:1.2), lowres, bad anatomy, bad hands, signature, watermarks, ugly, imperfect eyes, skewed eyes, unnatural face, unnatural body, error, extra limb, missing limbs",
			steps: 30,
			cfgScale: 5,
			clipSkip: 2,
			width: 832,
			height: 1216,
			samplerName: "DPM++ SDE Karras",
			hrUpscaler: "4x_NickelbackFS_72000_G",
			hrScale: 1.5,
			hrCfg: 5,
			hrSecondPassSteps: 15,
			denoisingStrength: 0.4,
		},
	}),

	createPreset({
		name: "Perfect Deliberate v8.0",
		type: "XL",
		description: "Testim model",
		path: "perfectdeliberate_v8",
		hash: "b3b2975c69",
		params: {
			basePrompt: "masterpiece, best quality, very aesthetic, 8K",
			baseNegativePrompt:
				"lowres, worst quality, bad quality:1.2, signature, username, logo, watermark, jpeg artifacts, bad hands, cropped, missing fingers, extra digits, fewer digits, error, bad anatomy, ugly, disfigured",
			clipSkip: 2,
			steps: 30,
			cfgScale: 7,
			samplerName: "DPM++ 2M Karras",
			width: 1024,
			height: 1536,
			hrUpscaler: "4x-AnimeSharp",
			hrScale: 1.5,
			hrSecondPassSteps: 14,
			hrCfg: 6.5,
			denoisingStrength: 0.35,
			overrideSettings: {
				forgeAdditionalModules: [],
			},
		},
	}),

	createPreset({
		name: "Deliberate v6.0",
		type: "SD",
		description:
			"Лёгкая SD 1.5 модель для быстрых тестов и простых генераций. Нетребовательна к ресурсам, универсальна в применении.",
		path: "Deliberate_v6",
		hash: "bcce73a08e",
		params: {
			basePrompt: "masterpiece, best quality, ultra-detailed",
			baseNegativePrompt:
				"worst quality, low quality, blurry, bad anatomy, bad hands, extra fingers, missing fingers, deformed, mutation, watermark, signature, text",
			clipSkip: 1,
			steps: 28,
			cfgScale: 8,
			samplerName: "DPM++ 2M Karras",
			width: 512,
			height: 768,
			hrUpscaler: "4x-UltraSharp",
			hrScale: 2.0,
			hrSecondPassSteps: 14,
			hrCfg: 7,
			denoisingStrength: 0.3,
			overrideSettings: {
				forgeAdditionalModules: [],
			},
		},
	}),
];
