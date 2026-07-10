import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	root: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100000,
	},
	container: {
		backgroundColor: COLORS.overlayOpacity,
		height: 160,
	},
	scroll: { padding: 15 },
});

export default styles;
