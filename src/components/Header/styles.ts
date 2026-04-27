import { StyleSheet } from "react-native";
import COLORS from "@/shared/styles/colors";
import { FONT_SIZES } from "@/shared/styles/sizes";

const styles = StyleSheet.create({
	root: {
		paddingVertical: 20,
		alignItems: "center",
		backgroundColor: COLORS.surface,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	wrapper: {
		position: "relative",
	},
	title: {
		letterSpacing: 0.5,
	},
	aiBadge: {
		position: "absolute",
		top: -6,
		right: -18,
		fontSize: FONT_SIZES.micro,
		fontWeight: "900",
		color: COLORS.primary,
	},
	backBtn: {
		position: "absolute",
		left: -138,
		boxSizing: "content-box",
		width: 25,
		height: 25,
		padding: 20,
		top: "50%",
		transform: [{ translateY: "-50%" }],
		justifyContent: "center",
	},
	settingsBtn: {
		position: "absolute",
		right: -98,
		boxSizing: "content-box",
		width: 25,
		height: 25,
		padding: 20,
		top: "50%",
		transform: [{ translateY: "-50%" }],
		justifyContent: "center",
	},
});

export default styles;
