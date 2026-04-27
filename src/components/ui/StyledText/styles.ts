import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";
import { FONT_SIZES } from "@/constants/sizes";

const styles = StyleSheet.create({
	root: {
		fontSize: FONT_SIZES.base,
		color: COLORS.textPrimary,
	},
	micro: {
		fontSize: FONT_SIZES.micro,
		color: COLORS.textPrimary,
	},
	small: {
		fontSize: FONT_SIZES.small,
		color: COLORS.textPrimary,
	},
	title: {
		fontSize: FONT_SIZES.title,
		fontWeight: 700,
		color: COLORS.textSecondary,
	},
	subtitle: {
		fontSize: FONT_SIZES.subtitle,
		fontWeight: 600,
		color: COLORS.textPrimary,
	},
	button: {
		fontSize: FONT_SIZES.small,
		color: COLORS.textPrimary,
		fontWeight: 500,
	},
});

export default styles;
