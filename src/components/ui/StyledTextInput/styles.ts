import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
	root: {
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 5,
		padding: 10,
		color: COLORS.textPrimary,
	},
});

export default styles;
