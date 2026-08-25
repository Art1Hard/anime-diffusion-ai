import { StyleSheet } from "react-native";

import COLORS from "@/constants/colors";
import { FONT_SIZES } from "@/constants/sizes";

const styles = StyleSheet.create({
	actionBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		backgroundColor: "rgba(0,0,0,0.8)",
		paddingHorizontal: 12,
		marginHorizontal: 22,
		borderRadius: 30,
		marginTop: 8,
	},
	actionText: {
		color: COLORS.textPrimary,
		fontSize: FONT_SIZES.small,
	},
	counter: {
		color: COLORS.textPrimary,
		fontSize: 16,
		fontWeight: "600",
	},
});

export default styles;
