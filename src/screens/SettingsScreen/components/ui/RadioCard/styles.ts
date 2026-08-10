import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
		borderWidth: 2,
		borderColor: "transparent",
	},
	cardActive: {
		backgroundColor: COLORS.surfaceLight,
		borderColor: COLORS.primary,
		shadowColor: COLORS.glow,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 12,
		elevation: 8,
	},
	cardInfo: {
		flex: 1,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.textPrimary,
		marginBottom: 4,
	},
	cardDesc: {
		fontSize: 13,
		color: COLORS.textSecondary,
	},
	radio: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: COLORS.border,
		alignItems: "center",
		justifyContent: "center",
	},
	radioActive: {
		borderColor: COLORS.primary,
	},
	radioDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: COLORS.primary,
	},
});

export default styles;
