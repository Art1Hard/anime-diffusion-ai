import ScreenContainer from "@/components/ui/ScreenContainer";
import {
	GenerationButtons,
	GenerationFields,
	GenerationOutput,
} from "./components";
import { useGenerationStore } from "@/store";

const GenerationScreen = () => {
	const image = useGenerationStore((gs) => gs.image);
	const isLoading = useGenerationStore((gs) => gs.isLoading);

	return (
		<ScreenContainer>
			<GenerationFields style={{ marginBottom: 15 }} />
			<GenerationOutput image={image} isLoading={isLoading} />
			<GenerationButtons image={image} isLoading={isLoading} />
		</ScreenContainer>
	);
};

export default GenerationScreen;
