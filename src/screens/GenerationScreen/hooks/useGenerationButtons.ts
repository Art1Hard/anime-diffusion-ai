import { useGenerationSettingsStore, useGenerationStore } from "@/store";
import importFromImage from "@/utils/image-process/importFromImage";
import { useEffect, useState } from "react";

const useGenerationButtons = ({ isLoading }: { isLoading: boolean }) => {
	const setPrompt = useGenerationSettingsStore((gs) => gs.setPrompt);
	const setNegativePrompt = useGenerationSettingsStore(
		(gs) => gs.setNegativePrompt,
	);
	const setSeed = useGenerationSettingsStore((gs) => gs.setSeed);

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
			setPrompt(result.prompt);
			setNegativePrompt(result.negativePrompt);
			setSeed(result.seed);
		}
	};

	return { isInterrupting, onGenerate, onImport };
};

export default useGenerationButtons;
