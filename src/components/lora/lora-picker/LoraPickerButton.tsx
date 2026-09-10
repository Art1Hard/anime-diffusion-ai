import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import LoraPickerModal from "./LoraPickerModal";
import StyledText from "../../ui/StyledText";
import COLORS from "@/constants/colors";

const LoraPickerButton = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Pressable style={styles.btn} onPress={() => setVisible(true)}>
				<StyledText variant="micro" style={{ color: COLORS.primary }}>
					+ LoRA
				</StyledText>
			</Pressable>

			<LoraPickerModal visible={visible} onClose={() => setVisible(false)} />
		</>
	);
};

export default LoraPickerButton;

const styles = StyleSheet.create({
	btn: {
		backgroundColor: COLORS.surface,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
});
