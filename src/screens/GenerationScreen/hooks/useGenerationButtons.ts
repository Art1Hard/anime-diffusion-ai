import { useGenerationStore } from "@/store";
import { useEffect, useState } from "react";

const useGenerationButtons = ({ isLoading }: { isLoading: boolean }) => {
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

	return { isInterrupting, onGenerate };
};

export default useGenerationButtons;
