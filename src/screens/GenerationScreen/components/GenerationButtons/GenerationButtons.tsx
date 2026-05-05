import StyledButton from "@/components/ui/StyledButton";
import { View, ViewProps } from "react-native";
import styles from "./styles";
import useGenerationButtons from "@/screens/GenerationScreen/hooks/useGenerationButtons";

interface GenerationButtonsProps extends ViewProps {
	isLoading: boolean;
	generate: () => Promise<void>;
	image: string | null;
}

const GenerationButtons = ({
	generate,
	isLoading,
	image,
	style,
	...props
}: GenerationButtonsProps) => {
	const { saveImageHandler } = useGenerationButtons();

	return (
		<View style={[styles.root, style]} {...props}>
			<StyledButton
				title="Generate"
				onPress={generate}
				style={styles.generateBtn}
				icon={{ name: "color-wand", size: 20 }}
				disabled={isLoading}
			/>
			<StyledButton
				title="Save"
				variant="success"
				onPress={() => saveImageHandler(image)}
				style={styles.saveBtn}
				icon={{ name: "images", size: 20 }}
				disabled={!image || isLoading}
			/>
		</View>
	);
};

export default GenerationButtons;
