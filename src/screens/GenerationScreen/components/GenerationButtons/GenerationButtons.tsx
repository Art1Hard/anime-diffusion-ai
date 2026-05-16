import StyledButton from "@/components/ui/StyledButton";
import { View, ViewProps } from "react-native";
import styles from "./styles";
import useGenerationButtons from "../../hooks/useGenerationButtons";

interface GenerationButtonsProps extends ViewProps {
	isLoading: boolean;
	image: string | null;
}

const GenerationButtons = ({
	isLoading,
	image,
	style,
	...props
}: GenerationButtonsProps) => {
	const { isInterrupting, onGenerate, onImport } = useGenerationButtons({
		isLoading,
	});

	return (
		<View style={[styles.root, style]} {...props}>
			<StyledButton
				title={
					!isLoading
						? "Generate"
						: isInterrupting
							? "Interrupting..."
							: "Interrupt"
				}
				variant={!isLoading ? "default" : "error"}
				onPress={onGenerate}
				style={styles.generateBtn}
				icon={{
					name: !isLoading ? "color-wand" : "stop-circle-outline",
					size: 20,
				}}
				disabled={isInterrupting}
			/>
			<StyledButton
				title="Import"
				variant="success"
				onPress={onImport}
				style={styles.saveBtn}
				icon={{ name: "arrow-down-circle-outline", size: 20 }}
				// disabled={isLoading}
			/>
		</View>
	);
};

export default GenerationButtons;
