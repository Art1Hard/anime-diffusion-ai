import { generateImage } from "@/api/generate";
import { useGenerationStore } from "@/store/generation";
import { useGenerationSettingsStore } from "@/store/generationSettings";
import { useState } from "react";

const useGeneration = () => {
	const [prompts, setPrompts] = useState({ positive: "", negative: "" });
	const [loading, setLoading] = useState(false);

	const selectedModel = useGenerationSettingsStore((gss) => gss.selectedModel);
	const image = useGenerationStore((gs) => gs.image);
	const setImage = useGenerationStore((gs) => gs.setImage);

	const generate = async () => {
		setLoading(true);
		try {
			const data = await generateImage({
				prompt: prompts.positive,
				negative: prompts.negative,
				modelPath: selectedModel,
			});
			const base64 = data.images[0];
			setImage(base64);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return {
		prompts,
		setPrompts,
		loading,
		image,
		selectedModel,
		generate,
	};
};

export default useGeneration;
