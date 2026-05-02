import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { useGenerationStore } from "@/store/generation";
import { useMemo } from "react";

const useGenerationFields = () => {
	const prompt = useGenerationStore((gs) => gs.prompt);
	const negativePrompt = useGenerationStore((gs) => gs.negativePrompt);
	const selectedModelPath = useGenerationStore((gs) => gs.selectedModelPath);

	const setPrompt = useGenerationStore((gs) => gs.setPrompt);
	const setNegativePrompt = useGenerationStore((gs) => gs.setNegativePrompt);

	const selectedModelName = useMemo(() => {
		const preset = MODEL_DEFAULT_PRESETS.find(
			(p) => p.path === selectedModelPath,
		);
		return preset?.name || "No Models";
	}, [selectedModelPath]);

	return {
		prompt,
		negativePrompt,
		setPrompt,
		setNegativePrompt,
		selectedModelName,
	};
};

export default useGenerationFields;
