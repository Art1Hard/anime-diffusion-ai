import {
	useGenerationSettingsStore,
	useGenerationStore,
	useLoraStore,
} from "@/store";
import importFromImage from "@/utils/image-process/importFromImage";
import { useEffect, useState } from "react";

const useGenerationButtons = ({ isLoading }: { isLoading: boolean }) => {
	const setPrompt = useGenerationSettingsStore((gs) => gs.setPrompt);
	const setNegativePrompt = useGenerationSettingsStore(
		(gs) => gs.setNegativePrompt,
	);
	const setSeed = useGenerationSettingsStore((gs) => gs.setSeed);
	const setSelectedModelPath = useGenerationSettingsStore(
		(gs) => gs.setSelectedModelPath,
	);

	const loras = useLoraStore((s) => s.loras);
	const activeLoras = useLoraStore((s) => s.activeLoras);
	const clearActiveLoras = useLoraStore((s) => s.clearActiveLoras);
	const fetchLoras = useLoraStore((s) => s.fetchLoras);
	const findLoraByAlias = useLoraStore((s) => s.findLoraByAlias);
	const addLora = useLoraStore((s) => s.addLora);

	const generate = useGenerationStore((gs) => gs.generate);
	const interrupt = useGenerationStore((gs) => gs.interrupt);
	const [isInterrupting, setIsInterrupting] = useState(false);

	const startInterrupting = () => setIsInterrupting(true);
	const stopInterrupting = () => setIsInterrupting(false);

	useEffect(() => {
		if (!isLoading) {
			stopInterrupting();
		}
	}, [isLoading]);

	const onGenerate = () => {
		if (isLoading) {
			startInterrupting();
			interrupt();
			return;
		}
		generate();
	};

	const onImport = async () => {
		const result = await importFromImage();
		if (result) {
			if (activeLoras.length) clearActiveLoras();
			setPrompt(result.prompt);
			setNegativePrompt(result.negativePrompt);
			setSeed(result.seed);
			if (result.model) setSelectedModelPath(result.model.path);

			if (!result.loras.length) return;

			if (!loras.length) await fetchLoras();

			result.loras.forEach(({ alias, weight }) => {
				const lora = findLoraByAlias(alias);

				if (lora) {
					addLora(lora, {
						enableTriggerWords: false,
						weight,
					});
				}
			});
		}
	};

	return { isInterrupting, onGenerate, onImport };
};

export default useGenerationButtons;
