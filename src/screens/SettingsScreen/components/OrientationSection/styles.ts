import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
	orientationGrid: {
		flexDirection: "row",
		gap: 12,
	},
	orientationBtn: {
		flex: 1,
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		paddingVertical: 20,
		paddingHorizontal: 12,
		alignItems: "center",
		gap: 8,
		borderWidth: 2,
		borderColor: "transparent",
	},
	orientationBtnActive: {
		backgroundColor: COLORS.surfaceLight,
		borderColor: COLORS.primary,
		shadowColor: COLORS.glow,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 12,
		elevation: 8,
	},
	orientationText: {
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.textPrimary,
	},
	orientationTextActive: {
		color: COLORS.primary,
	},
});

export default styles;
