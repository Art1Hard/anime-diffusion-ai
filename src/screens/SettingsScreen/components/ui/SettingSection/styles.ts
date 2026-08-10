import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		gap: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: COLORS.textPrimary,
	},
});

export default styles;
