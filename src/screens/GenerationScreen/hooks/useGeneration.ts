import { generateImage } from "@/api/generate";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { useGenerationStore } from "@/store/generation";
import { ITxt2ImgPayload } from "@/types/model-presets";
import { convertBase64ToFile } from "@/utils/image-process";
import { useState } from "react";

const useGeneration = () => {
	const prompt = useGenerationStore((gs) => gs.prompt);
	const negativePrompt = useGenerationStore((gs) => gs.negativePrompt);
	const [loading, setLoading] = useState(false);

	const selectedModelPath = useGenerationStore((gs) => gs.selectedModelPath);
	const image = useGenerationStore((gs) => gs.image);
	const setImage = useGenerationStore((gs) => gs.setImage);

	const setLastImageParams = useGenerationStore((gs) => gs.setLastImageParams);

	const generate = async () => {
		setLoading(true);
		try {
			const modelPreset = MODEL_DEFAULT_PRESETS.find(
				(mp) => mp.path === selectedModelPath,
			);
			if (!modelPreset) return;

			const body: ITxt2ImgPayload = {
				prompt: modelPreset.params.basePrompt + prompt,
				negativePrompt: negativePrompt + modelPreset.params.baseNegativePrompt,
				overrideSettings: { sdModelCheckpoint: modelPreset.path },
				...modelPreset.params,
			};

			const data = await generateImage(body);

			console.log(data.parameters);

			const path = await convertBase64ToFile(data.images[0]);
			setImage(path);
			setLastImageParams(data.parameters);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		image,
		selectedModelPath,
		generate,
	};
};

export default useGeneration;
