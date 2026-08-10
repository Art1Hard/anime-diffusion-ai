import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	paramCard: {
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	paramHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	paramLabel: {
		fontSize: 15,
		fontWeight: "600",
		color: COLORS.textPrimary,
	},
	paramValue: {
		fontSize: 15,
		fontWeight: "700",
		color: COLORS.primary,
	},
	input: {},
	paramHint: {
		fontSize: 12,
		color: COLORS.textMuted,
		marginTop: 8,
	},
	resetBtn: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		justifyContent: "center",
		paddingHorizontal: 15,
	},
	cardContainer: {
		display: "flex",
		gap: 10,
	},
});

export default styles;
