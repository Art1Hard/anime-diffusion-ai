import ScreenContainer from "@/components/ui/ScreenContainer";
import {
	GenerationButtons,
	GenerationFields,
	GenerationOutput,
} from "./components";
import useGeneration from "./hooks/useGeneration";

const GenerationScreen = () => {
	const { image, isLoading, generate } = useGeneration();

	return (
		<ScreenContainer>
			<GenerationFields style={{ marginBottom: 15 }} />
			<GenerationOutput image={image} isLoading={isLoading} />
			<GenerationButtons
				generate={generate}
				image={image}
				isLoading={isLoading}
			/>
		</ScreenContainer>
	);
};

export default GenerationScreen;
