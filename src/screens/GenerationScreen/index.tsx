import ScreenContainer from "@/components/ui/ScreenContainer";
import useGeneration from "./hooks/useGeneration";
import {
	GenerationButtons,
	GenerationFields,
	GenerationOutput,
} from "./components";

const GenerationScreen = () => {
	const { loading, image, generate } = useGeneration();

	return (
		<ScreenContainer extendedBottom>
			<GenerationFields style={{ marginBottom: 15 }} />
			<GenerationOutput image={image} isLoading={loading} />
			<GenerationButtons
				generate={generate}
				image={image}
				isLoading={loading}
			/>
		</ScreenContainer>
	);
};

export default GenerationScreen;
