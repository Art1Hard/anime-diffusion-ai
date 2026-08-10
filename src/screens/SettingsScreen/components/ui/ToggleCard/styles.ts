import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	toggleCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
	},
	toggleInfo: {
		flex: 1,
	},
	toggleLabel: {
		fontSize: 15,
		fontWeight: "600",
		color: COLORS.textPrimary,
		marginBottom: 4,
	},
	toggleDesc: {
		fontSize: 13,
		color: COLORS.textSecondary,
	},
});

export default styles;
