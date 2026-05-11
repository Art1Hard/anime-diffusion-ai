import COLORS from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		padding: 15,
		width,
		backgroundColor: COLORS.overlayOpacity,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
	},
	hiresBtn: {
		flex: 1,
	},
	saveBtn: {
		flex: 1,
	},
});

export default styles;
