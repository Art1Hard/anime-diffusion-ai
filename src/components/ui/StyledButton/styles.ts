import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
	root: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		padding: 12,
		flexDirection: "row",
		gap: 10,
	},
	default: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.border,
	},
	success: {
		backgroundColor: COLORS.success,
		borderColor: COLORS.border,
	},
	text: {
		textTransform: "uppercase",
	},
	disabled: {
		backgroundColor: COLORS.surface,
		opacity: 0.5,
	},
});

export default styles;
