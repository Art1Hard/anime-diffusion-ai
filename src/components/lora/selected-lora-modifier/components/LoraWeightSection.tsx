import StyledButton from "@/components/ui/StyledButton";
import COLORS from "@/constants/colors";
import { IActiveLora } from "@/types/lora";
import { StyleSheet, TextInput } from "react-native";
import useLoraWeight from "../hooks/useLoraWeight";
import LoraModifierSection from "./LoraModifierSection";

interface LoraWeightSectionProps {
	lora: IActiveLora;
}

const LoraWeightSection = ({ lora }: LoraWeightSectionProps) => {
	const { inputValue, handleWeightChange, increaseWeight, decreaseWeight } =
		useLoraWeight(lora);

	return (
		<LoraModifierSection contentStyle={styles.controls} label="Weight">
			<StyledButton
				onPress={decreaseWeight}
				variant="mutedRounded"
				icon={{ name: "remove", color: COLORS.textSecondary, size: 18 }}
			/>

			<TextInput
				value={inputValue}
				onChangeText={handleWeightChange}
				keyboardType="decimal-pad"
				selectTextOnFocus
				style={styles.input}
			/>

			<StyledButton
				onPress={increaseWeight}
				variant="mutedRounded"
				icon={{ name: "add", color: COLORS.textSecondary, size: 18 }}
			/>
		</LoraModifierSection>
	);
};

export default LoraWeightSection;

const styles = StyleSheet.create({
	controls: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},

	input: {
		color: COLORS.textPrimary,
		fontSize: 24,
		fontWeight: "700",
		minWidth: 60,
		textAlign: "center",
		paddingVertical: 4,
	},
});
