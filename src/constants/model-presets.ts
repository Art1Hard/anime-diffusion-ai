import { IModelPreset } from "@/types/model-presets";

export const MODEL_DEFAULT_PRESETS: IModelPreset[] = [
	{
		name: "WAI illustrious SDXL v16",
		description:
			"Сбалансированная аниме SDXL модель. Универсальная, даёт чистый\u00A0стиль и\u00A0стабильное качество.",
		path: "waiIllustriousSDXL_v16",
		hash: "a5f58eb1c3",
		params: {
			basePrompt: "masterpiece,best quality,amazing quality,",
			baseNegativePrompt:
				"bad quality,worst quality,worst detail,sketch,censor, easynegative",
			steps: 24,
			cfgScale: 6,
			clipSkip: 2,
			width: 896,
			height: 1152,
			samplerName: "Euler a",
			hrUpscaler: "4x-AnimeSharp",
			hrScale: 1.7,
			hrSecondPassSteps: 12,
			denoisingStrength: 0.35,
		},
	},
	{
		name: "CyberRealistic Pony v1.80 Coreshift",
		description:
			"Сбалансированная и универсальная SDXL-модель на базе Pony. Новая версия Coreshift оптимизирована под стабильное качество, чистую аниме-стилистику и высокую детализацию.",
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
			hrSecondPassSteps: 15,
			denoisingStrength: 0.4,
		},
	},
	{
		name: "WAI illustrious SDXL v17",
		description:
			"Сбалансированная аниме SDXL модель. Универсальная, даёт чистый\u00A0стиль и\u00A0стабильное качество (НОВАЯ ВЕРСИЯ).",
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
			hrUpscaler: "R-ESRGAN 4x+ Anime6B",
			hrScale: 1.5,
			hrSecondPassSteps: 20,
			denoisingStrength: 0.5,
		},
	},
	{
		name: "Animagine XL v3.1",
		description:
			"Аниме-модель с\u00A0упором на\u00A0детализацию и\u00A0эстетику. Хорошо подходит для\u00A0персонажей и\u00A0концепт-арта.",
		path: "animagineXLV31_v31",
		hash: "e3c47aedb0",
		params: {
			basePrompt: "masterpiece, best quality, very aesthetic, absurdres,",
			baseNegativePrompt:
				"bad quality, worst quality, worst detail, sketch, censor, lowres, text, jpeg artifacts, low quality, watermark, unfinished, displeasing, signature, artistic error, username, scan, easynegative",
			steps: 28,
			cfgScale: 7,
			clipSkip: 2,
			width: 896,
			height: 1152,
			samplerName: "Euler a",
			hrUpscaler: "4x-AnimeSharp",
			hrScale: 1.7,
			hrSecondPassSteps: 14,
			denoisingStrength: 0.35,
		},
	},
	// {
	// 	name: "realvisxlV5",
	// 	description:
	// 		"Фотореалистичная модель для\u00A0людей и\u00A0портретов. Требует точных промптов, иначе появляются артефакты.",
	// 	path: "realvisxlV5",
	// 	params: {
	// 		basePrompt: "",
	// 		baseNegativePrompt:
	// 			"(octane render, render, drawing, anime, bad photo, bad photography:1.3), (worst quality, low quality, blurry:1.2), (bad teeth, deformed teeth, deformed lips), (bad anatomy, bad proportions:1.1), (deformed iris, deformed pupils), (deformed eyes, bad eyes), (deformed face, ugly face, bad face), (deformed hands, bad hands, fused fingers), morbid, mutilated, mutation, disfigured",
	// 		steps: 5,
	// 		cfgScale: 1.5,
	// 		clipSkip: 1,
	// 		width: 896,
	// 		height: 1152,
	// 		samplerName: "DPM++ SDE",
	// 		hrUpscaler: "4x_NMKD-Superscale-SP_178000_G",
	// 		hrScale: 1.5,
	// 		hrSecondPassSteps: 3,
	// 		denoisingStrength: 0.5,
	// 	},
	// },
	// {
	// 	name: "novaRealityXL_v9",
	// 	description:
	// 		"Художественная модель для\u00A0атмосферных и\u00A0кино сцен. Хороша для\u00A0концепт-арта.",
	// 	path: "novaRealityXL_v9",
	// 	params: {
	// 		basePrompt: "",
	// 		baseNegativePrompt: "",
	// 		steps: 30,
	// 		cfgScale: 4.5,
	// 		clipSkip: 2,
	// 		width: 768,
	// 		height: 1344,
	// 		samplerName: "Euler a",
	// 		hrUpscaler: "Latent",
	// 		hrScale: 1.8,
	// 		hrSecondPassSteps: 50,
	// 		denoisingStrength: 0.4,
	// 	},
	// },
	{
		name: "Deliberate_v6",
		description:
			"Лёгкая универсальная модель для\u00A0быстрых тестов и\u00A0простых генераций без\u00A0долгого рендера.",
		path: "Deliberate_v6",
		hash: "bcce73a08e",
		params: {
			basePrompt: "",
			baseNegativePrompt: "",
			steps: 22,
			cfgScale: 5,
			samplerName: "Euler a",
			width: 512,
			height: 512,
			hrUpscaler: "Latent",
			hrScale: 1.8,
			hrSecondPassSteps: 20,
			denoisingStrength: 0.7,
		},
	},
];
