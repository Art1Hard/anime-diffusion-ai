import StyledButton from "@/components/ui/StyledButton";
import { View, ViewProps } from "react-native";
import styles from "./styles";
import { saveImageToGallery } from "@/utils/image-process";
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
	const { isInterrupting, onGenerate } = useGenerationButtons({ isLoading });

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
				title="Save"
				variant="success"
				onPress={() => saveImageToGallery(image)}
				style={styles.saveBtn}
				icon={{ name: "images", size: 20 }}
				disabled={!image || isLoading}
			/>
		</View>
	);
};

export default GenerationButtons;
