import { generateImage } from "@/api/generate";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { useGenerationStore } from "@/store/generation";
import { ITxt2ImgPayload } from "@/types/model-presets";
import { convertBase64ToFile } from "@/utils/image-process";
import { useState } from "react";
import { useSdProgress } from "./useSdProgress";

const useGeneration = () => {
	const setProgress = useGenerationStore((gs) => gs.setProgress);
	const setPreviewImage = useGenerationStore((gs) => gs.setPreviewImage);

	const { start: startPolling, stop: stopPolling } = useSdProgress({
		onProgress: setProgress,
		onPreview: setPreviewImage,
	});

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

			startPolling();

			const data = await generateImage(body);

			stopPolling();

			const path = await convertBase64ToFile(data.images[0]);
			setImage(path);
			setLastImageParams(data.parameters);
		} catch (e) {
			console.log(e);
			stopPolling();
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
