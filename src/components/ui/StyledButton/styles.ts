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
		borderColor: COLORS.border,
	},
	default: {
		backgroundColor: COLORS.primary,
	},
	success: {
		backgroundColor: COLORS.success,
	},
	warning: {
		backgroundColor: COLORS.warning,
	},
	error: {
		backgroundColor: COLORS.error,
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
