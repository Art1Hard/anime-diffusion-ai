import { LoraChipList } from "@/components/lora/lora-chip";
import { LoraPickerButton } from "@/components/lora/lora-picker";
import { StyleSheet, View } from "react-native";

const GenerationLoraArea = () => {
	return (
		<View style={styles.root}>
			<LoraChipList />
			<LoraPickerButton />
		</View>
	);
};

export default GenerationLoraArea;

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		marginBottom: 10,
	},
});
