import COLORS from "@/constants/colors";
import { GALLERY_SIZES } from "@/constants/sizes";
import { StyleSheet } from "react-native";

const itemSize = GALLERY_SIZES.getItemSize();

const styles = StyleSheet.create({
	image: {
		width: itemSize,
		height: itemSize,
		borderRadius: 10,
		margin: GALLERY_SIZES.listGap,
	},
	imageSelected: {
		opacity: 0.6,
	},
	checkCircle: {
		position: "absolute",
		top: 12,
		right: 12,
		width: 22,
		height: 22,
		borderRadius: 11,
		borderWidth: 1.5,
		borderColor: COLORS.textPrimary,
		backgroundColor: "rgba(0,0,0,0.25)",
		alignItems: "center",
		justifyContent: "center",
	},
	checkCircleActive: {
		backgroundColor: COLORS.primaryHover,
		borderColor: "transparent",
	},
});

export default styles;
