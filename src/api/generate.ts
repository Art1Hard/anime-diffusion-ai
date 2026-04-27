import { MODEL_PRESETS } from "@/shared/data/model-presets";
import { IModelPreset } from "@/shared/types/model-presets";

interface IGenerateImageBody {
	prompt: string;
	negative: string;
	modelPath: string;
}

export const generateImage = async ({
	prompt,
	negative,
	modelPath,
}: IGenerateImageBody) => {
	const modelPreset = MODEL_PRESETS.find((mp) => mp.path === modelPath);
	if (!modelPreset) return;

	const modelParams = modelPreset.params;

	const res = await fetch("http://192.168.0.19:7860/sdapi/v1/txt2img", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			override_settings: { sd_model_checkpoint: modelPreset.path },
			prompt: modelParams.basePrompt + prompt,
			steps: modelParams.steps,
			width: modelParams.width,
			height: modelParams.height,
			hr_scale: modelParams.hrScale,
			cfg_scale: modelParams.cfgScale,
			clip_skip: modelParams.clipSkip,
			hr_upscaler: modelParams.hrUpscaler,
			sampler_name: modelParams.samplerName,
			negative_prompt: negative + modelParams.baseNegativePrompt,
			denoising_strength: modelParams.denoisingStrength,
			hr_second_pass_steps: modelParams.hrSecondPassSteps,
		}),
	});

	const data = await res.json();
	return data;
};
