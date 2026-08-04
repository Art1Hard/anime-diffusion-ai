import { IModelPreset } from "@/types/model-presets";
import extractVaeName from "@/utils/extract-vae-name";

const buildAdetailerConfig = (modelPreset: IModelPreset) => ({
	ADetailer: {
		args: [
			true,
			{
				ad_model: "face_yolov9c.pt",
				ad_confidence: 0.3,
				ad_mask_blur: 24,
				ad_denoising_strength: 0.25,
				ad_inpaint_only_masked: true,
				ad_inpaint_only_masked_padding: 64,

				ad_use_sampler: true,
				ad_sampler: modelPreset.params.samplerName,

				ad_use_steps: true,
				ad_steps: modelPreset.params.steps,

				ad_use_cfg_scale: true,
				ad_cfg_scale: modelPreset.params.cfgScale,

				ad_use_checkpoint: true,
				ad_checkpoint: modelPreset.params.overrideSettings?.sdModelCheckpoint,

				ad_use_vae: true,
				ad_vae: extractVaeName(modelPreset),
			},
		],
	},
});

export default buildAdetailerConfig;
