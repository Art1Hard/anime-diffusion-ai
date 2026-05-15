import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { useGenerationSettingsStore } from "@/store";
import { useMemo } from "react";

const useGenerationFields = () => {
	const prompt = useGenerationSettingsStore((gs) => gs.prompt);
	const negativePrompt = useGenerationSettingsStore((gs) => gs.negativePrompt);
	const selectedModelPath = useGenerationSettingsStore(
		(gs) => gs.selectedModelPath,
	);

	const setPrompt = useGenerationSettingsStore((gs) => gs.setPrompt);
	const setNegativePrompt = useGenerationSettingsStore(
		(gs) => gs.setNegativePrompt,
	);

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
