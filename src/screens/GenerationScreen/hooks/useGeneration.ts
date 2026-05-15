import { useGenerationStore } from "@/store";

const useGeneration = () => {
	const generate = useGenerationStore((gs) => gs.generate);
	const image = useGenerationStore((gs) => gs.image);
	const isLoading = useGenerationStore((gs) => gs.isLoading);

	return { image, isLoading, generate };
};

export default useGeneration;
