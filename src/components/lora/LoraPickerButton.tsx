import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import LoraPickerModal from "./LoraPickerModal";

const LoraPickerButton = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Pressable style={styles.btn} onPress={() => setVisible(true)}>
				<Text style={styles.btnText}>+ LoRA</Text>
			</Pressable>

			<LoraPickerModal visible={visible} onClose={() => setVisible(false)} />
		</>
	);
};

export default LoraPickerButton;

const styles = StyleSheet.create({
	btn: {
		alignSelf: "flex-start",
		backgroundColor: "#1c1c1e",
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 6,
		marginBottom: 10,
	},
	btnText: { color: "#5ea1ff", fontSize: 13, fontWeight: "600" },
});
