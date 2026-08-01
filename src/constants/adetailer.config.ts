export default {
	ADetailer: {
		args: [
			true,

			// Лицо
			{
				ad_model: "face_yolov9c.pt",
				ad_prompt: "",
				ad_negative_prompt: "",
				ad_confidence: 0.3,
				ad_denoising_strength: 0.25,
				ad_inpaint_only_masked: true,
				ad_inpaint_only_masked_padding: 32,
			},

			// Руки
			// {
			// 	ad_model: "hand_yolov8n.pt",
			// 	ad_prompt: "",
			// 	ad_negative_prompt: "",
			// 	ad_confidence: 0.25,
			// 	ad_denoising_strength: 0.35,
			// 	ad_inpaint_only_masked: true,
			// 	ad_inpaint_only_masked_padding: 96,
			// },
		],
	},
};
