import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";
import { FONT_SIZES } from "@/constants/sizes";

const styles = StyleSheet.create({
	root: {
		paddingVertical: 15,
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
		top: "-25%",
		left: "-34%",
		width: 45,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
	},
	settingsBtn: {
		position: "absolute",
		top: "-25%",
		right: "-23%", // Прижимаем к правому краю хедера
		width: 45,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
